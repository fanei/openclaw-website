export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
          OpenClaw
        </h1>
        <p className="mb-8 text-2xl text-zinc-700 dark:text-zinc-300">
          Your AI-Powered Life Assistant
        </p>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          OpenClaw 是一个强大的 AI 助手框架，支持多平台集成、智能对话、任务自动化和定时提醒。
          让 AI 成为你生活和工作的一部分。
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#install"
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            开始使用
          </a>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-8 py-3 font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            查看源码
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          核心功能
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon="🤖"
            title="AI 助手"
            description="强大的智能对话能力，支持自然语言理解，能够执行复杂任务、回答问题、提供建议。"
          />
          <FeatureCard
            icon="🌐"
            title="多平台集成"
            description="无缝集成 WhatsApp、Telegram、Discord、Signal、Slack 等主流通信平台，随时随地使用。"
          />
          <FeatureCard
            icon="⚡"
            title="自动化任务"
            description="任务自动化、定时提醒、工作流程编排，让 AI 帮你处理重复性工作，提升效率。"
          />
        </div>
      </section>

      {/* Practices Showcase */}
      <section className="container mx-auto px-4 py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <h2 className="mb-4 text-center text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          实践案例
        </h2>
        <p className="mb-8 text-center text-lg text-zinc-600 dark:text-zinc-400">
          探索社区构建的精彩项目，学习最佳实践
        </p>
        <div className="flex justify-center">
          <a
            href="/practices"
            className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
          >
            <span>查看所有案例</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          安装指南
        </h2>
        <div className="mx-auto max-w-3xl space-y-6">
          <InstallStep
            step="1"
            title="安装 Node.js"
            description="确保你的系统安装了 Node.js 18 或更高版本"
          />
          <InstallStep
            step="2"
            title="安装 OpenClaw"
            description="使用 npm 全局安装 OpenClaw CLI 工具"
            command="npm install -g openclaw"
          />
          <InstallStep
            step="3"
            title="初始化工作空间"
            description="创建并初始化你的 OpenClaw 工作空间"
            command="openclaw init ~/my-openclaw"
          />
          <InstallStep
            step="4"
            title="启动 Gateway"
            description="启动 OpenClaw Gateway 服务"
            command="cd ~/my-openclaw && openclaw gateway start"
          />
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          快速开始
        </h2>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-800">
            <p className="mb-4 text-lg text-zinc-700 dark:text-zinc-300">
              安装完成后，你可以通过 Web 界面或直接在支持的平台上与 OpenClaw 对话：
            </p>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                <span>在浏览器中访问 Web Chat 界面，开始与 AI 对话</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-600"></span>
                <span>连接你的 WhatsApp 或 Telegram 账号，随时随地使用</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-purple-600"></span>
                <span>添加到 Discord 服务器，与团队成员共享 AI 助手</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-600"></span>
                <span>配置定时任务和自动化工作流，让 AI 帮你处理日常任务</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center dark:border-zinc-800">
        <p className="text-zinc-600 dark:text-zinc-400">
          Made with ❤️ by the OpenClaw community
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            GitHub
          </a>{" "}
          ·{" "}
          <a
            href="https://docs.openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            文档
          </a>{" "}
          ·{" "}
          <a
            href="https://discord.gg/clawd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            Discord
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function InstallStep({
  step,
  title,
  description,
  command,
}: {
  step: string;
  title: string;
  description: string;
  command?: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
        {step}
      </div>
      <div className="flex-1">
        <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{description}</p>
        {command && (
          <div className="overflow-x-auto rounded-lg bg-zinc-900 p-4">
            <code className="text-sm font-mono text-green-400">{command}</code>
          </div>
        )}
      </div>
    </div>
  );
}
