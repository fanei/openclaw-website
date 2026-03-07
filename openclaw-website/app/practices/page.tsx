import { loadPractices } from './data';
import type { PracticeCase } from './data';

export default async function PracticesPage() {
  const practices = await loadPractices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black">
      {/* Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span className="mr-2">←</span>
            返回首页
          </a>
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
          OpenClaw 实践案例
        </h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300">
          发现和探索基于 OpenClaw 构建的精彩项目，学习最佳实践和实现技巧。
        </p>
      </section>

      {/* Practices Grid */}
      <section className="container mx-auto px-4 pb-24">
        {practices.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              暂无实践案例，正在收集中...
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice) => (
              <PracticeCard key={practice.id} practice={practice} />
            ))}
          </div>
        )}

        {/* Collection Info */}
        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            <span>📅</span>
            <span>自动收集更新</span>
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            每天凌晨 5:00 自动从 GitHub 收集最新的 OpenClaw 实践案例。
            案例包括基于 OpenClaw 开发的应用、插件、自动化脚本等。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center dark:border-zinc-800">
        <p className="text-zinc-600 dark:text-zinc-400">
          Made with ❤️ by the OpenClaw community
        </p>
      </footer>
    </div>
  );
}

function PracticeCard({ practice }: { practice: PracticeCase }) {
  return (
    <article className="flex flex-col rounded-lg border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex-1 p-6">
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {practice.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          {practice.description}
        </p>

        {/* Use Case */}
        <div className="mb-4">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {practice.useCase}
          </span>
        </div>

        {/* Key Features */}
        <ul className="mb-4 space-y-2">
          {practice.keyFeatures.slice(0, 3).map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600"></span>
              <span>{feature}</span>
            </li>
          ))}
          {practice.keyFeatures.length > 3 && (
            <li className="text-xs text-zinc-500 dark:text-zinc-500">
              +{practice.keyFeatures.length - 3} 更多特性
            </li>
          )}
        </ul>

        {/* Code Snippet */}
        {practice.codeSnippet && (
          <div className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-3">
            <pre className="text-xs font-mono text-green-400">
              <code>{practice.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <span>⭐</span>
            {formatStars(practice.stars)}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <span>👤</span>
            {practice.author}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <span>💻</span>
            {practice.language}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <a
          href={practice.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <span>查看项目</span>
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return stars.toString();
}
