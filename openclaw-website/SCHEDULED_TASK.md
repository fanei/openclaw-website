# OpenClaw 实践案例定时任务配置完成

## ✅ 定时任务已配置

**执行时间**: 每天凌晨 05:00
**配置方式**: macOS LaunchAgent (系统级定时任务)
**状态**: 已加载并运行中

## 📋 配置详情

**Plist文件**: `~/Library/LaunchAgents/com.openclaw.practices-collector.plist`

**执行脚本**: `~/.openclaw/workspace-coding/openclaw-website/scripts/cron-collect-manually.sh`

**日志文件**:
- 标准输出: `/tmp/openclaw-practices-collector.log`
- 错误输出: `/tmp/openclaw-practices-collector-error.log`

## 🔍 查看定时任务状态

### 检查任务是否加载
```bash
launchctl list | grep openclaw
```

预期输出:
```
9091	-15	ai.openclaw.gateway
-	0	com.openclaw.practices-collector
```
- Exit code 为 `0` 表示任务正常运行
- Exit code 为 `-15` 表示任务已停止

### 查看日志
```bash
# 查看执行日志
cat /tmp/openclaw-practices-collector.log

# 查看错误日志
cat /tmp/openclaw-practices-collector-error.log
```

### 手动触发任务（测试）
```bash
launchctl start com.openclaw.practices-collector
```

### 停止任务
```bash
launchctl stop com.openclaw.practices-collector
```

### 卸载任务
```bash
launchctl unload -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
```

### 重新加载任务
```bash
launchctl unload -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
launchctl load -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
```

## 📅 工作流程

每天凌晨05:00，系统会自动执行以下步骤：

1. **运行收集脚本**
   - 从GitHub搜索OpenClaw相关项目
   - 提取README中的关键信息
   - 去重、排序、筛选最佳实践

2. **更新数据文件**
   - 保存到 `public/practices/data.json`

3. **提交到GitHub**
   - 自动commit更改
   - 推送到远程仓库
   - 触发Vercel自动部署

4. **记录日志**
   - 执行状态记录到日志文件
   - 错误信息单独记录

## 🛠️ 故障排除

### 任务没有执行

1. 检查任务是否加载:
   ```bash
   launchctl list | grep openclaw
   ```

2. 查看错误日志:
   ```bash
   cat /tmp/openclaw-practices-collector-error.log
   ```

3. 手动测试脚本:
   ```bash
   cd ~/.openclaw/workspace-coding/openclaw-website
   ./scripts/cron-collect-manually.sh
   ```

4. 重新加载任务:
   ```bash
   launchctl unload -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
   launchctl load -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
   ```

### GitHub API速率限制

脚本会在速率限制接近时显示警告，如果遇到：

- **错误**: `GitHub API error: 403 Forbidden`
- **解决**: 等待速率限制重置（通常每小时重置）
- **查看**: 重置时间会在警告信息中显示

### Git推送失败

- 检查GitHub Token是否有效
- 检查网络连接
- 查看错误日志了解具体原因

## 🔄 修改执行时间

如果需要修改执行时间，编辑plist文件:

```bash
open -e ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
```

找到 `<StartCalendarInterval>` 部分，修改小时和分钟:

```xml
<key>StartCalendarInterval</key>
<dict>
  <key>Hour</key>
  <integer>5</integer>      <!-- 修改这里（0-23） -->
  <key>Minute</key>
  <integer>0</integer>     <!-- 修改这里（0-59） -->
</dict>
```

保存后重新加载任务:
```bash
launchctl unload -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
launchctl load -w ~/Library/LaunchAgents/com.openclaw.practices-collector.plist
```

## 📊 监控和提醒

建议定期检查日志文件，确保任务正常运行:

```bash
# 每周检查一次
tail -50 /tmp/openclaw-practices-collector.log

# 检查最近的提交
cd ~/.openclaw/workspace-coding/openclaw-website
git log --oneline -5
```

## 🎯 完成检查清单

- [x] 创建LaunchAgent plist文件
- [x] 加载到launchctl
- [x] 配置每天05:00执行
- [x] 设置环境变量（GitHub Token）
- [x] 配置日志文件路径
- [x] 测试脚本执行成功
- [x] 验证GitHub Token有效
- [x] 代码已推送到GitHub
- [x] Vercel自动部署已配置

---

**🎉 定时任务配置完成！**

从明天开始，每天凌晨05:00会自动收集最新的OpenClaw实践案例并更新到网站。
