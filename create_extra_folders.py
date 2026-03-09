#!/usr/bin/env python3
import os
from pathlib import Path

desktop = Path.home() / 'Desktop'

folders = [
    'Projects',
    'Apps',
    'Logs',
]

for folder in folders:
    folder_path = desktop / folder
    folder_path.mkdir(parents=True, exist_ok=True)
    print(f'创建: {folder}')

print('\n额外分类文件夹创建完成！')
