#!/usr/bin/env python3
import os
import shutil
import random
from pathlib import Path

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

print('正在扫描桌面...')

try:
    items = os.listdir(str(desktop))
    random.shuffle(items)

    moved = 0
    skipped = 0

    print(f'找到 {len(items)} 个项目，开始随机整理10个文件...\n')

    for item_name in items:
        if moved >= 10:
            break

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
                    print(f'✓ [{moved}/10] {item_name[:40]}... -> {moved_to}')
                else:
                    skipped += 1
                    print(f'○ [{moved+1}/10] {item_name[:40]}... 跳过')

    print(f'\n✅ 完成! 移动 {moved} 个文件，跳过 {skipped} 个文件')

except Exception as e:
    print(f'错误: {e}')
    import traceback
    traceback.print_exc()
