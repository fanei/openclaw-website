#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

desktop = Path.home() / 'Desktop'

# 定义分类
categories = {
    'Documents': ['.pdf', '.doc', '.docx', '.txt', '.md', '.pages', '.rtf'],
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic'],
    'Videos': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    'Audio': ['.mp3', '.wav', '.flac', '.m4a'],
    'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz', '.dmg'],
    'Code': ['.py', '.js', '.ts', '.html', '.css', '.json', '.yaml', '.yml'],
    'Spreadsheets': ['.xls', '.xlsx', '.csv'],
    'Presentations': ['.ppt', '.pptx', '.key'],
}

# 创建分类文件夹
for category in categories:
    (desktop / category).mkdir(exist_ok=True)

# 创建其他文件夹
other_folders = ['Quick Access', 'Projects', 'Temp']
for folder in other_folders:
    (desktop / folder).mkdir(exist_ok=True)

# 扫描并整理文件
moved = 0
skipped = 0

for item in desktop.iterdir():
    if item.is_file():
        ext = item.suffix.lower()
        moved_to = None

        # 查找分类
        for category, extensions in categories.items():
            if ext in extensions:
                moved_to = category
                break

        # 移动文件
        if moved_to:
            dest = desktop / moved_to / item.name
            if not dest.exists():
                shutil.move(str(item), str(dest))
                moved += 1
                print(f'移动: {item.name} -> {moved_to}/')
            else:
                skipped += 1
                print(f'跳过: {item.name} (已存在)')

print(f'\n完成! 移动了 {moved} 个文件，跳过 {skipped} 个文件')
