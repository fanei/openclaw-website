# OpenClaw 官方网站

这是 OpenClaw AI 助手的官方介绍网站，使用 Next.js + TypeScript + Tailwind CSS 构建。

## ✨ 功能特点

- 🤖 AI 助手介绍
- 🌐 多平台集成说明
- ⚡ 自动化功能展示
- 📖 详细的安装和快速开始指南
- 🎨 现代简洁的响应式设计
- 🌓 支持深色模式

## 🚀 本地开发

### 前置要求

- Node.js 18+ （推荐使用 Node.js 20 或更高版本）
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm start
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel CLI

1. 安装 Vercel CLI：

```bash
npm install -g vercel
```

2. 在项目根目录运行：

```bash
vercel
```

3. 按照提示完成部署配置

### 方式二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com/new)
3. 导入你的 GitHub 仓库
4. Vercel 会自动检测 Next.js 配置并开始部署

### 环境变量（可选）

本项目无需额外环境变量即可正常运行。如需自定义，可以在 Vercel 项目设置中添加：

- `NEXT_PUBLIC_SITE_URL`：网站 URL（用于 SEO 和链接）
- `NODE_VERSION`：Node.js 版本（已配置为 18）

## 📝 项目结构

```
openclaw-website/
├── app/
│   ├── favicon.ico      # 网站图标
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页
├── public/              # 静态资源
├── vercel.json          # Vercel 部署配置
├── next.config.ts       # Next.js 配置
├── tailwind.config.ts   # Tailwind CSS 配置
├── tsconfig.json        # TypeScript 配置
└── README.md           # 项目说明
```

## 🎨 自定义主题

你可以通过修改 `app/globals.css` 中的 CSS 变来自定义颜色主题：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Discord 社区](https://discord.gg/clawd)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
