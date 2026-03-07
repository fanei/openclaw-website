#!/usr/bin/env node
/**
 * OpenClaw 实践案例收集脚本
 * 每天05:00从GitHub收集OpenClaw相关项目
 */

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  owner: {
    login: string;
  };
  created_at: string;
  updated_at: string;
}

interface PracticeCase {
  id: string;
  title: string;
  description: string;
  url: string;
  stars: number;
  author: string;
  language: string;
  topics: string[];
  useCase: string;
  keyFeatures: string[];
  codeSnippet?: string;
  collectedAt: string;
}

// GitHub API 配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_API_URL = 'https://api.github.com';

// 搜索关键词（OpenClaw相关）
const SEARCH_KEYWORDS = [
  'openclaw',
  'open-claw',
  'claw assistant',
  'claw automation',
];

// 每次收集的数量
const REPOS_PER_KEYWORD = 1;

/**
 * 调用GitHub API
 */
async function fetchFromGitHub(endpoint: string): Promise<any> {
  const url = `${GITHUB_API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // 检查速率限制
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');
    if (remaining && parseInt(remaining) < 10) {
      const resetTime = new Date(parseInt(reset!) * 1000).toLocaleString();
      console.warn(`⚠️  GitHub API rate limit low: ${remaining} remaining. Resets at ${resetTime}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from GitHub: ${error}`);
    throw error;
  }
}

/**
 * 搜索GitHub仓库
 */
async function searchRepos(query: string): Promise<GitHubRepo[]> {
  console.log(`🔍 Searching for: "${query}"`);

  // 构建搜索查询：搜索仓库名和描述，按stars排序
  const searchQuery = `${query} in:name,description`;

  try {
    const data = await fetchFromGitHub(
      `/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=${REPOS_PER_KEYWORD}`
    );

    if (data.items && data.items.length > 0) {
      console.log(`   Found ${data.items.length} repositories`);
      return data.items;
    }

    console.log(`   No repositories found`);
    return [];
  } catch (error) {
    console.error(`   Error searching repositories: ${error}`);
    return [];
  }
}

/**
 * 获取仓库的README内容
 */
async function getReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const data = await fetchFromGitHub(`/repos/${owner}/${repo}/readme`);

    if (data.content) {
      // Base64 decode
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return content;
    }

    return null;
  } catch (error) {
    console.warn(`   Warning: Could not fetch README for ${owner}/${repo}`);
    return null;
  }
}

/**
 * 从README中提取关键信息
 */
function extractFromReadme(readme: string): {
  useCase: string;
  keyFeatures: string[];
  codeSnippet: string | undefined;
} {
  const useCasePatterns = [
    /(?:Use Case|使用场景|应用场景)[:：]\s*([^\n]+)/i,
    /(?:Purpose|用途)[:：]\s*([^\n]+)/i,
  ];

  const featurePatterns = [
    /(?:Features?|功能特性)[:：]\s*([^\n]+)/i,
    /(?:Key Features?|关键特性)[:：]\s*([^\n]+)/i,
  ];

  let useCase = '通用AI助手项目';
  let keyFeatures: string[] = ['基于OpenClaw构建', '多平台集成', '自动化任务'];
  let codeSnippet: string | undefined;

  // 提取使用场景
  for (const pattern of useCasePatterns) {
    const match = readme.match(pattern);
    if (match && match[1]) {
      useCase = match[1].trim();
      break;
    }
  }

  // 提取特性
  for (const pattern of featurePatterns) {
    const match = readme.match(pattern);
    if (match && match[1]) {
      keyFeatures = match[1]
        .split(/[,，;；、]/)
        .map(f => f.trim())
        .filter(f => f.length > 0)
        .slice(0, 5);
      break;
    }
  }

  // 提取代码片段（取第一个代码块）
  // 匹配 TypeScript/JavaScript 或 Bash 代码块
  const codePattern = /```(?:ts|js|typescript|javascript|bash|sh)[\s\S]*?```/g;
  const codeMatches = readme.matchAll(codePattern);
  const firstCode = codeMatches.next();
  if (!firstCode.done && firstCode.value) {
    codeSnippet = firstCode.value[0]
      .replace(/```(?:ts|js|typescript|javascript|bash|sh)/g, '')
      .trim()
      .substring(0, 300); // 限制长度
    if (codeSnippet.length > 0) {
      codeSnippet += '\n...';
    }
  }

  return { useCase, keyFeatures, codeSnippet };
}

/**
 * 转换GitHub仓库为实践案例
 */
async function convertToPractice(repo: GitHubRepo): Promise<PracticeCase> {
  let useCase = 'AI助手项目';
  let keyFeatures: string[] = ['基于OpenClaw构建', '自动化任务'];
  let codeSnippet: string | undefined;

  // 尝试获取README并提取信息
  const readme = await getReadme(repo.owner.login, repo.name);
  if (readme) {
    const extracted = extractFromReadme(readme);
    useCase = extracted.useCase;
    if (extracted.keyFeatures.length > 0) {
      keyFeatures = extracted.keyFeatures;
    }
    codeSnippet = extracted.codeSnippet;
  }

  return {
    id: `${repo.id}`,
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || '基于OpenClaw构建的AI助手项目',
    url: repo.html_url,
    stars: repo.stargazers_count,
    author: repo.owner.login,
    language: repo.language || 'Unknown',
    topics: repo.topics.slice(0, 5),
    useCase,
    keyFeatures,
    codeSnippet,
    collectedAt: new Date().toISOString(),
  };
}

/**
 * 去重实践案例（基于URL）
 */
function deduplicatePractices(practices: PracticeCase[]): PracticeCase[] {
  const seen = new Set<string>();
  return practices.filter(p => {
    if (seen.has(p.url)) {
      return false;
    }
    seen.add(p.url);
    return true;
  });
}

/**
 * 按stars排序并取前N个
 */
function sortAndLimitPractices(practices: PracticeCase[], limit: number): PracticeCase[] {
  return practices
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 Starting OpenClaw practices collection...\n');

  const allRepos: GitHubRepo[] = [];

  // 搜索所有关键词
  for (const keyword of SEARCH_KEYWORDS) {
    const repos = await searchRepos(keyword);
    allRepos.push(...repos);
  }

  if (allRepos.length === 0) {
    console.log('❌ No repositories found. Exiting.');
    process.exit(0);
  }

  console.log(`\n📊 Total repositories found: ${allRepos.length}\n`);

  // 转换为实践案例
  const practices: PracticeCase[] = [];
  for (const repo of allRepos) {
    console.log(`⏳ Processing: ${repo.full_name}`);
    try {
      const practice = await convertToPractice(repo);
      practices.push(practice);
      console.log(`   ✅ Added: ${practice.title}\n`);
    } catch (error) {
      console.error(`   ❌ Error processing ${repo.full_name}: ${error}\n`);
    }
  }

  // 去重和排序
  const uniquePractices = deduplicatePractices(practices);
  const finalPractices = sortAndLimitPractices(uniquePractices, 5);

  console.log(`\n✨ Final practices: ${finalPractices.length}`);

  // 保存到文件
  const fs = require('fs');
  const path = require('path');
  const dataPath = path.join(process.cwd(), 'public', 'practices');

  // 确保目录存在
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }

  const filePath = path.join(dataPath, 'data.json');
  fs.writeFileSync(filePath, JSON.stringify(finalPractices, null, 2), 'utf-8');

  console.log(`\n💾 Saved to: ${filePath}`);
  console.log(`\n🎉 Collection complete!`);
}

// 运行
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
