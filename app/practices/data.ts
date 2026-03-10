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
  descriptionTranslated?: string; // 翻译后的描述
}

// 检测字符串是否包含中文字符
function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

// 简单的英文到中文翻译映射（实际项目中应使用翻译API）
const translationMap: Record<string, string> = {
  "real-time": "实时",
  "AI assistant": "AI助手",
  "smart glasses": "智能眼镜",
  "voice": "语音",
  "vision": "视觉",
  "agentic": "智能代理",
  "personal": "个人",
  "messaging platforms": "消息平台",
  "WhatsApp": "WhatsApp",
  "Telegram": "Telegram",
  "Signal": "Signal",
  "iMessage": "iMessage",
  "responses": "响应",
  "tool access": "工具访问",
  "memory": "记忆",
  "reminders": "提醒",
  "integrations": "集成",
  "apps": "应用",
  "Desktop Assistant": "桌面助手",
  "Electron-based": "基于Electron",
  "voice assistant": "语音助手",
  "Live2D character": "Live2D角色",
  "animations": "动画",
  "speech recognition": "语音识别",
  "text-to-speech": "文本转语音",
  "visual management panel": "可视化管理面板",
  "Built-in": "内置",
  "tool calling": "工具调用",
  "image recognition": "图像识别",
  "one-click installation": "一键安装",
  "configuration": "配置",
  "cross-platform": "跨平台",
  "desktop application": "桌面应用"
};

// 简单的翻译函数（实际项目中应使用专业的翻译API）
function translateText(text: string): string {
  let result = text;

  // 替换常见的英文短语
  Object.entries(translationMap).forEach(([en, zh]) => {
    const regex = new RegExp(en, 'gi');
    result = result.replace(regex, zh);
  });

  // 简单的规则翻译
  result = result
    .replace(/--/g, ' — ')
    .replace(/\bvia\b/gi, '通过')
    .replace(/\band\b/gi, '和')
    .replace(/\bwith\b/gi, '包含')
    .replace(/\bfor\b/gi, '为')
    .replace(/\+ /g, ' + ');

  return result;
}

// 翻译案例描述（如果需要）
export function translateDescription(practice: PracticeCase): PracticeCase {
  // 如果已经有翻译结果或原文包含中文，直接返回
  if (practice.descriptionTranslated || containsChinese(practice.description)) {
    return practice;
  }

  // 翻译英文描述
  return {
    ...practice,
    descriptionTranslated: translateText(practice.description)
  };
}

// 批量翻译案例描述
export function translatePractices(practices: PracticeCase[]): PracticeCase[] {
  return practices.map(translateDescription);
}

// 按日期分组案例
export function groupPracticesByDate(practices: PracticeCase[]): Record<string, PracticeCase[]> {
  const grouped: Record<string, PracticeCase[]> = {};

  practices.forEach(practice => {
    const date = practice.collectedAt.split('T')[0]; // 提取日期部分
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(practice);
  });

  return grouped;
}

// 格式化日期显示（今天、昨天或具体日期）
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 清除时分秒进行比较
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return '今天';
  } else if (date.getTime() === yesterday.getTime()) {
    return '昨天';
  } else {
    return dateStr;
  }
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
