#!/usr/bin/env python3
import os
from pathlib import Path

desktop = Path.home() / 'Desktop'

folders = [
    'Documents',
    'Documents/PDFs',
    'Documents/Office',
    'Documents/Text',
    'Images',
    'Images/Screenshots',
    'Images/Photos',
    'Images/Design',
    'Videos',
    'Audio',
    'Archives',
    'Code',
    'Projects',
    'Downloads',
    'Quick Access',
    'Temp',
]

for folder in folders:
    folder_path = desktop / folder
    folder_path.mkdir(parents=True, exist_ok=True)
    print(f'创建: {folder}')

print('\n分类文件夹创建完成！')
