# OpenClaw 网站部署指南

## 项目位置
项目已创建在：`/Users/fanchaowei/.openclaw/workspace-coding/openclaw-website/`

## 快速部署到 Vercel

### 方法一：使用 Vercel CLI

1. 全局安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 进入项目目录：
```bash
cd /Users/fanchaowei/.openclaw/workspace-coding/openclaw-website
```

3. 安装依赖（如果还没有）：
```bash
npm install
```

4. 部署到 Vercel：
```bash
vercel
```

按照提示操作即可完成部署。

### 方法二：通过 GitHub 部署

1. 将项目推送到 GitHub：
```bash
cd /Users/fanchaowei/.openclaw/workspace-coding/openclaw-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <你的GitHub仓库地址>
git push -u origin main
```

2. 访问 [https://vercel.com/new](https://vercel.com/new)

3. 导入你的 GitHub 仓库

4. Vercel 会自动检测 Next.js 配置并开始部署

### 方法三：使用 Vercel Dashboard

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)

2. 点击 "Add New Project"

3. 导入项目（可以从 GitHub 导入）

4. 配置项目设置（大部分配置都已预设在 `vercel.json` 中）

5. 点击 "Deploy" 开始部署

## 项目特性

✅ Next.js 16.1.6 + TypeScript
✅ Tailwind CSS 样式
✅ 响应式设计（移动端友好）
✅ 深色模式支持
✅ 现代简洁的 UI
✅ Vercel 优化配置
✅ 预设部署到香港区域（hkg1）以优化中国访问速度

## 网站内容

- **Hero 区域**：引人注目的标题和描述
- **功能介绍**：AI 助手、多平台集成、自动化任务
- **安装指南**：详细的 4 步安装流程
- **快速开始**：使用场景和示例
- **页脚**：链接到文档、GitHub 和 Discord

## 本地运行

```bash
cd /Users/fanchaowei/.openclaw/workspace-coding/openclaw-website
npm install
npm run dev
```

然后访问 [http://localhost:3000](http://localhost:3000)

## 自定义

你可以编辑以下文件来自定义网站：

- `app/page.tsx` - 主页内容和布局
- `app/globals.css` - 全局样式和主题
- `app/layout.tsx` - HTML 结构和元数据
- `public/` - 静态资源（图标、图片等）

## 常见问题

### Q: npm install 失败或很慢？
A: 尝试使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### Q: 构建时遇到 Node.js 版本问题？
A: Vercel 配置已设置为 Node.js 18，确保本地环境使用兼容版本。

### Q: 如何修改网站标题？
A: 编辑 `app/layout.tsx` 中的 `<title>` 标签和 metadata。

### Q: 如何添加新页面？
A: 在 `app/` 目录下创建新的文件夹和 `page.tsx` 文件。

## 联系支持

- OpenClaw 文档：https://docs.openclaw.ai
- GitHub Issues：https://github.com/openclaw/openclaw/issues
- Discord 社区：https://discord.gg/clawd
