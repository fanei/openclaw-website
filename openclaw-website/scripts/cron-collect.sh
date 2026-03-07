#!/bin/bash
# OpenClaw 实践案例定时收集脚本
# 每天凌晨05:00执行

# 设置环境变量
export GITHUB_TOKEN="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"

# 切换到项目目录
cd ~/.openclaw/workspace-coding/openclaw-website

# 执行收集脚本
echo "🚀 Starting OpenClaw practices collection at $(date)" >> /tmp/openclaw-cron.log
npm run collect:practices >> /tmp/openclaw-cron.log 2>&1

# 检查是否有更改
if git diff --quiet public/practices/data.json; then
    echo "✅ No changes to practices data" >> /tmp/openclaw-cron.log
else
    echo "📝 Changes detected, committing..." >> /tmp/openclaw-cron.log
    git add .
    git commit -m "Auto: update practices $(date '+%Y-%m-%d')" >> /tmp/openclaw-cron.log 2>&1
    git push >> /tmp/openclaw-cron.log 2>&1
    echo "✅ Committed and pushed to GitHub" >> /tmp/openclaw-cron.log
fi

echo "✨ Collection complete at $(date)" >> /tmp/openclaw-cron.log
echo "---" >> /tmp/openclaw-cron.log
