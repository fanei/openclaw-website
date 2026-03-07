// OpenClaw 实践案例数据

export interface PracticeCase {
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

// 初始示例数据
export const initialPractices: PracticeCase[] = [
  {
    id: "example-1",
    title: "OpenClaw Personal Assistant",
    description: "基于OpenClaw的个人信息助手，可以管理日程、提醒事项和自动化日常任务。",
    url: "https://github.com/openclaw/openclaw",
    stars: 1250,
    author: "openclaw",
    language: "TypeScript",
    topics: ["automation", "assistant", "productivity"],
    useCase: "个人生产力助手",
    keyFeatures: [
      "多平台消息同步",
      "智能日程管理",
      "自动任务提醒",
      "自定义工作流"
    ],
    codeSnippet: `// 示例：配置自动化任务
{
  "schedule": "0 9 * * *",
  "action": "daily-summary",
  "params": {
    "includeCalendar": true,
    "includeWeather": true
  }
}`,
    collectedAt: new Date().toISOString()
  }
];

// 从本地JSON文件加载实践案例
export async function loadPractices(): Promise<PracticeCase[]> {
  try {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'public', 'practices', 'data.json');

    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading practices:', error);
  }

  return initialPractices;
}

// 保存实践案例到本地JSON文件
export async function savePractices(practices: PracticeCase[]): Promise<void> {
  const fs = require('fs');
  const path = require('path');
  const dataPath = path.join(process.cwd(), 'public', 'practices');

  // 确保目录存在
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
  }

  const filePath = path.join(dataPath, 'data.json');
  fs.writeFileSync(filePath, JSON.stringify(practices, null, 2), 'utf-8');
}
