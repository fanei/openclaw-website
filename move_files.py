#!/usr/bin/env python3
import os
import shutil
from pathlib import Path
import time

desktop = Path.home() / 'Desktop'

# 文件分类规则
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
    'Downloads': [],
}

moved = 0
skipped = 0

try:
    # 获取Desktop内容（限制100个文件）
    items = list(desktop.iterdir())[:100]

    for item in items:
        if item.is_file() and not item.name.startswith('.'):
            ext = item.suffix.lower()
            name_lower = item.name.lower()

            moved_to = None

            # 查找匹配的分类
            for folder, patterns in file_rules.items():
                if ext in patterns or any(p in name_lower for p in patterns):
                    moved_to = folder
                    break

            # 移动文件
            if moved_to:
                dest = desktop / moved_to / item.name
                if not dest.exists():
                    try:
                        shutil.move(str(item), str(dest))
                        moved += 1
                        print(f'✓ {item.name} -> {moved_to}')
                    except Exception as e:
                        print(f'✗ {item.name} 错误: {e}')
                else:
                    skipped += 1
                    print(f'○ {item.name} 已存在，跳过')

    print(f'\n✅ 完成! 移动 {moved} 个文件，跳过 {skipped} 个文件')

except Exception as e:
    print(f'错误: {e}')
