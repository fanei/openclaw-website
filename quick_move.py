#!/usr/bin/env python3
import os
import shutil
import signal
import sys
from pathlib import Path

# 设置超时（30秒）
def timeout_handler(signum, frame):
    print('\n超时，但文件正在移动...')
    sys.exit(0)

signal.signal(signal.SIGALRM, timeout_handler)
signal.alarm(30)

desktop = Path.home() / 'Desktop'

# 文件分类
file_rules = {
    'Documents/PDFs': ['.pdf'],
    'Documents/Office': ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pages', '.key', '.numbers'],
    'Documents/Text': ['.txt', '.md', '.rtf'],
    'Images/Screenshots': ['screenshot', '截屏', '截图'],
    'Images/Photos': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic', '.heif'],
    'Images/Design': ['.psd', '.ai', '.sketch', '.fig'],
    'Videos': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    'Audio': ['.mp3', '.wav', '.flac', '.m4a', '.aac'],
    'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz', '.dmg'],
    'Code': ['.py', '.js', '.ts', '.html', '.css', '.json', '.yaml', '.yml', '.xml'],
}

moved = 0
skipped = 0

try:
    # 使用os.listdir（更轻量）
    items = os.listdir(str(desktop))[:50]

    for item_name in items:
        item = desktop / item_name

        if item.is_file() and not item_name.startswith('.'):
            ext = item.suffix.lower()
            name_lower = item_name.lower()

            moved_to = None

            for folder, patterns in file_rules.items():
                if ext in patterns or any(p in name_lower for p in patterns):
                    moved_to = folder
                    break

            if moved_to:
                dest = desktop / moved_to / item_name
                if not dest.exists():
                    shutil.move(str(item), str(dest))
                    moved += 1
                    print(f'✓ {item_name}')
                else:
                    skipped += 1
                    print(f'○ {item_name} 跳过')

    print(f'\n✅ 完成! 移动 {moved} 个文件，跳过 {skipped} 个文件')
    signal.alarm(0)

except Exception as e:
    print(f'错误: {e}')
    signal.alarm(0)
