#!/usr/bin/env tsx
/**
 * OpenClaw Practices Collection Script
 * Searches GitHub for OpenClaw-related repositories and updates practices data
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
}

interface PracticeItem {
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
  codeSnippet: string;
  collectedAt: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DATA_FILE = 'public/practices/data.json';
const SEARCH_QUERIES = [
  'OpenClaw+in:name,description',
  'openclaw+in:name,description',
  'OpenClaw+AI+assistant',
];

async function searchGitHub(query: string): Promise<GitHubRepo[]> {
  const url = new URL('https://api.github.com/search/repositories');
  url.searchParams.set('q', query);
  url.searchParams.set('sort', 'stars');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', '30');

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.mercy-preview+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}

function mapToPracticeItem(repo: GitHubRepo): PracticeItem {
  // Generate a use case based on description or language
  let useCase = '通用AI助手项目';
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();

  if (desc.includes('docker') || desc.includes('部署')) {
    useCase = 'Docker容器化部署';
  } else if (desc.includes('plugin') || desc.includes('extension')) {
    useCase = '插件/扩展开发';
  } else if (desc.includes('vision') || desc.includes('image')) {
    useCase = '视觉AI应用';
  } else if (desc.includes('automation') || desc.includes('workflow')) {
    useCase = '自动化工作流';
  } else if (desc.includes('money') || desc.includes('monetization')) {
    useCase = '商业化应用';
  }

  // Generate key features based on description and topics
  const keyFeatures: string[] = [];
  if (repo.topics.includes('openclaw')) {
    keyFeatures.push('基于OpenClaw构建');
  }
  if (repo.topics.length > 1) {
    keyFeatures.push('多平台集成');
  }
  if (repo.stargazers_count > 100) {
    keyFeatures.push('社区热门');
  }
  if (keyFeatures.length < 3) {
    keyFeatures.push('自动化任务');
  }

  // Generate simple code snippet
  let codeSnippet = `# Clone the repository\ngit clone ${repo.html_url}.git\ncd ${repo.name}\n`;

  if (repo.language === 'TypeScript' || repo.language === 'JavaScript') {
    codeSnippet += '\nnpm install\nnpm start';
  } else if (repo.language === 'Python') {
    codeSnippet += '\npip install -r requirements.txt\npython main.py';
  } else if (repo.language === 'Shell') {
    codeSnippet += '\nchmod +x setup.sh\n./setup.sh';
  }

  return {
    id: String(repo.id),
    title: repo.name,
    description: repo.description || 'No description available',
    url: repo.html_url,
    stars: repo.stargazers_count,
    author: repo.owner.login,
    language: repo.language || 'Unknown',
    topics: repo.topics,
    useCase,
    keyFeatures,
    codeSnippet,
    collectedAt: new Date().toISOString(),
  };
}

async function collectPractices(): Promise<void> {
  console.log('🦞 Starting OpenClaw practices collection...');

  const repoMap = new Map<string, GitHubRepo>();

  // Search all queries
  for (const query of SEARCH_QUERIES) {
    try {
      console.log(`🔍 Searching: ${query}`);
      const repos = await searchGitHub(query);
      console.log(`  Found ${repos.length} repositories`);

      for (const repo of repos) {
        repoMap.set(String(repo.id), repo);
      }
    } catch (error) {
      console.error(`  Error searching for "${query}":`, error);
    }
  }

  // Convert to practice items
  const practices = Array.from(repoMap.values())
    .map(mapToPracticeItem)
    .sort((a, b) => b.stars - a.stars);

  console.log(`✅ Total unique repositories: ${practices.length}`);

  // Write to file
  const fs = await import('fs/promises');
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(practices, null, 2),
    'utf-8'
  );

  console.log(`✅ Data written to ${DATA_FILE}`);
}

// Main execution
collectPractices()
  .then(() => {
    console.log('✨ Collection complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error during collection:', error);
    process.exit(1);
  });
