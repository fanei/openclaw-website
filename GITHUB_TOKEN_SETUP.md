# GitHub Token 设置说明

为了使实践案例收集脚本能够正常工作，需要设置 GitHub Personal Access Token。

## 创建 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选以下权限：
   - `public_repo` - 访问公开仓库
   - `read:org` - 读取组织信息（可选）
4. 设置过期时间（建议 90 天或更长）
5. 点击生成并复制 Token

## 设置环境变量

### 方法 1: 在系统环境变量中设置（推荐）

在你的 shell 配置文件中添加：

```bash
# 对于 macOS (zsh)
echo 'export GITHUB_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc

# 对于 macOS (bash)
echo 'export GITHUB_TOKEN="your_token_here"' >> ~/.bash_profile
source ~/.bash_profile
```

### 方法 2: 在 OpenClaw 环境变量中设置

在 OpenClaw 的配置文件或环境变量中添加 `GITHUB_TOKEN`。

## 验证 Token

运行收集脚本测试：

```bash
cd ~/.openclaw/workspace-coding/openclaw-website
npm run collect:practices
```

如果成功，你会看到类似这样的输出：

```
🚀 Starting OpenClaw practices collection...

🔍 Searching for: "openclaw"
   Found 1 repositories
...
✨ Final practices: 5
💾 Saved to: .../public/practices/data.json
🎉 Collection complete!
```

## 注意事项

- Token 不要提交到 Git 仓库
- 定期更新 Token
- GitHub API 有速率限制（未认证：60次/小时，已认证：5000次/小时）
- 如果遇到速率限制，脚本会显示剩余次数和重置时间

## 故障排除

### 错误: "GitHub API error: 403 Forbidden"
- Token 可能已过期或无效
- 检查 Token 权限设置

### 错误: "GitHub API error: 401 Unauthorized"
- Token 格式错误或未设置环境变量
- 运行 `echo $GITHUB_TOKEN` 检查是否设置成功

### 警告: "GitHub API rate limit low"
- 等待速率限制重置后再次运行
- 考虑增加 Token 的请求配额（GitHub Enterprise）
