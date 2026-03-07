# OpenClaw 实践案例自动化设置完成

## ✅ 已完成的工作

### 1. 创建了实践案例专栏页面
- **页面路径**: `/practices`
- **功能**: 展示从GitHub收集的OpenClaw相关项目
- **特点**:
  - 响应式卡片布局
  - 显示项目stars、作者、语言
  - 展示使用场景和关键特性
  - 代码片段预览
  - 自动更新提示

### 2. 创建了数据存储结构
- **数据文件**: `public/practices/data.json`
- **类型定义**: `app/practices/data.ts`
- **初始数据**: 包含3个示例实践案例

### 3. 创建了自动收集脚本
- **脚本路径**: `scripts/collect-practices.ts`
- **功能**:
  - 从GitHub API搜索OpenClaw相关项目
  - 提取项目README中的关键信息
  - 去重和排序
  - 自动保存到JSON文件

### 4. 更新了主页
- 在主页添加了"实践案例"入口链接
- 美观的展示卡片

### 5. 配置了package.json
- 添加了 `npm run collect:practices` 命令
- 添加了 `tsx` 依赖

## 📋 接下来需要完成的步骤

### 步骤 1: 设置 GitHub Token（必须）

参考 `GITHUB_TOKEN_SETUP.md` 文件：

1. 访问 https://github.com/settings/tokens
2. 创建新的 Personal Access Token
3. 勾选 `public_repo` 权限
4. 设置环境变量：

```bash
# macOS (zsh)
echo 'export GITHUB_TOKEN="你的token"' >> ~/.zshrc
source ~/.zshrc

# 验证
echo $GITHUB_TOKEN
```

### 步骤 2: 安装依赖（如果尚未完成）

```bash
cd ~/.openclaw/workspace-coding/openclaw-website
npm install
```

### 步骤 3: 测试收集脚本

```bash
npm run collect:practices
```

检查是否成功更新 `public/practices/data.json`

### 步骤 4: 本地测试网站

```bash
npm run dev
```

访问 http://localhost:3000/practices 查看实践案例页面

### 步骤 5: 配置定时任务（每天05:00自动收集）

使用 OpenClaw 的 cron 功能。在你的 OpenClaw 配置中添加：

```bash
# 编辑 HEARTBEAT.md 添加定时任务
# 或直接使用 openclaw cron 命令配置

# 每天凌晨05:00执行收集脚本
openclaw cron add --schedule "0 5 * * *" --command "cd ~/.openclaw/workspace-coding/openclaw-website && npm run collect:practices && git add . && git commit -m 'Auto: update practices' && git push"
```

**注意**:
- 如果没有配置GitHub推送认证，先配置GitHub SSH或Token
- 推送到GitHub后会自动触发Vercel部署

### 步骤 6: 提交代码到GitHub

```bash
cd ~/.openclaw/workspace-coding/openclaw-website
git add .
git commit -m "Add practices collection automation"
git push
```

推送后，Vercel会自动部署更新。

## 📂 项目结构

```
openclaw-website/
├── app/
│   ├── page.tsx                    # 主页（已更新，添加入口链接）
│   └── practices/
│       ├── page.tsx                # 实践案例列表页面
│       └── data.ts                 # 数据类型定义和加载函数
├── public/
│   └── practices/
│       └── data.json               # 实践案例数据文件
├── scripts/
│   └── collect-practices.ts        # 自动收集脚本
├── package.json                    # 已更新，添加收集命令
├── GITHUB_TOKEN_SETUP.md          # GitHub Token设置说明
└── PRACTICES_SETUP.md             # 本文件
```

## 🎯 工作流程

1. **每天05:00**: OpenClaw cron触发收集脚本
2. **收集**: 脚本从GitHub搜索OpenClaw相关项目
3. **提取**: 获取README，提取关键信息
4. **保存**: 更新 `public/practices/data.json`
5. **提交**: 自动commit并push到GitHub
6. **部署**: Vercel自动部署，网站更新

## 🔍 搜索关键词

脚本会搜索以下关键词：
- `openclaw`
- `open-claw`
- `claw assistant`
- `claw automation`

每次每个关键词搜索1个仓库，总计最多5个实践案例（去重后）。

## 📊 数据格式

每个实践案例包含：
- `id`: 唯一标识
- `title`: 项目标题
- `description`: 描述
- `url`: GitHub链接
- `stars`: Star数量
- `author`: 作者
- `language`: 主要编程语言
- `topics`: 主题标签
- `useCase`: 使用场景
- `keyFeatures`: 关键特性（最多5个）
- `codeSnippet`: 代码片段（从README提取）
- `collectedAt`: 收集时间

## 🐛 故障排除

### 收集脚本失败
- 检查 `GITHUB_TOKEN` 是否设置正确
- 检查网络连接
- 查看GitHub API速率限制

### 网站构建失败
- 确保 `npm install` 完成
- 检查 `public/practices/data.json` 格式是否正确

### 定时任务不执行
- 检查OpenClaw cron配置
- 查看OpenClaw日志

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误信息
2. 执行的命令
3. 相关日志

---

**恭喜！OpenClaw实践案例自动化系统已准备就绪！** 🎉
