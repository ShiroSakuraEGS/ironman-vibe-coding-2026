# -*- coding: utf-8 -*-
"""
將 ironman_data.json 轉換為可直接於瀏覽器 script 標籤載入的 data.js
避免 GitHub Pages 或本地 file:// 協議開啟時遇到 CORS 限制
"""

import json
import os

CURRENT_DIR = r"c:\Users\Anubis.Chan\Downloads\鐵人賽\實驗場所\鐵人賽網頁"
JSON_PATH = os.path.join(CURRENT_DIR, "ironman_data.json")
JS_PATH = os.path.join(CURRENT_DIR, "data.js")

with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

json_str = json.dumps(data, ensure_ascii=False, indent=2)

with open(JS_PATH, "w", encoding="utf-8") as f:
    f.write(f"// 鐵人賽系列圖文數據庫 (Series 9607)\nwindow.IRONMAN_DATA = {json_str};\n")

print(f"成功生成 {JS_PATH} (大小: {os.path.getsize(JS_PATH)} bytes)")
