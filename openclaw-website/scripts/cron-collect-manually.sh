#!/bin/bash
# 手动执行实践案例收集（替代方案）

echo "🚀 手动执行实践案例收集..."
echo "日期: $(date)"

# 设置环境变量
export GITHUB_TOKEN="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"

# 切换到项目目录
cd ~/.openclaw/workspace-coding/openclaw-website

# 执行收集脚本
npx tsx scripts/collect-practices.ts

# 检查是否有更改
if git diff --quiet public/practices/data.json; then
    echo "✅ 没有检测到数据更改"
else
    echo "📝 检测到更改，正在提交..."
    git add .
    git commit -m "Auto: update practices $(date '+%Y-%m-%d %H:%M:%S')"
    git push
    echo "✅ 已提交并推送到GitHub，Vercel将自动部署"
fi

echo "✨ 收集完成！"
