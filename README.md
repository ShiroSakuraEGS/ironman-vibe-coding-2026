# 🚀 學生身份 Vibe Coding 跨領域創新專案 · 科幻圖文檔案庫

> **2026 iThome 鐵人賽系列（Series #9607）專屬視覺檔案庫**  
> 《學生身份如何每天透過Vibe Coding每天做跨領域的創新項目》  
> 風格定位：**科幻未來簡約極簡風（Sci-Fi Futuristic Minimalist）**

---

## 🌌 專案概述

本專案將鐵人賽 28 天的跨領域實作探險（包含中文系轉型、AI 虛擬伴侶、桌面桌寵、micro:bit 硬體、3D 文學宇宙 RAG、歐盟 3D 商標智財分析、Suno 音樂、自動化文章管線到賽博時空護照），打造為兼具**懸案偵查線索板**與**全系列圖文檔案庫**的極簡科幻未來 Web 應用。

本專案採用純靜態架構（Vanilla HTML5 / CSS3 / JavaScript），所有資料與圖片均已處理完畢，**可直接推送至 GitHub 免費啟用 GitHub Pages 部署**，亦可直接雙擊 `index.html` 本地離線開啟！

---

## ⚡ 兩大核心分頁特色

### ◈ 分頁一：案件線索板 (Cybernetic Clue Board)
- **故事化 6 大案件卷宗 (Case Dossiers)**：
  - 卷宗 I：【初心破壁與多重身份】(Day 01-05)
  - 卷宗 II：【實體穿透與賽博桌面】(Day 06-09)
  - 卷宗 III：【高維向量與文學宇宙】(Day 10-14)
  - 卷宗 IV：【智財法規與多模態創作】(Day 15-19)
  - 卷宗 V：【自律工廠與心智模型】(Day 20-24)
  - 卷宗 VI：【終極共識與時間哲學】(Day 25-28)
- **28 天核心 AI 概念圖解碼**：以偵探拍立得/證物夾風格展示每日 AI 概念圖，自動解析其在文章中的象徵意義（例如：*Day 28：我們要多溝通才不是這種啦！！！！！！*）。
- **神經雷射連線**：SVG 動態繪製 28 天案件時間拓撲連線。
- **深層證物檢驗器 (Inspector Modal)**：點擊線索開啟彈窗，檢視大圖、破局故事筆記與官方文章直達傳送門。

### ▤ 分頁二：鐵人賽圖文檔案庫 (Article & Visual Codex)
- **144 張展示配圖完整收錄**：全系列 28 篇（含番外）文章內的所有插圖、架構圖、終端截圖一網打盡。
- **純淨用意解析**：徹底過濾清除所有 `(Midjourney 示意圖)` 字樣，僅呈現真實圖說寓意。
- **即時全域檢索**：支援依據文章篇名、配圖說明文字、Day 編號即時搜尋過濾。
- **全螢幕高解析度燈箱 (Lightbox)**：點擊任何圖片即可全螢幕放大檢視，支援 ESC 鍵關閉。

---

## 🛠️ GitHub Pages 部署手把手指南

本專案已完全優化為 GitHub Pages 就緒狀態，只需以下簡單步驟即可在全網上線：

### 步驟 1：建立 GitHub 新倉庫
1. 前往 [GitHub](https://github.com/) 登入您的帳號。
2. 點擊右上角的 **「+」** ➔ **「New repository」**。
3. 倉庫名稱（Repository name）建議填寫：`ironman-vibe-coding-codex`（或您喜歡的名稱）。
4. 設定為 **Public**（公開），其餘選項保持預設，點擊 **「Create repository」**。

### 步驟 2：推播代碼到 GitHub
在本地終端機（PowerShell 或 Git Bash）進入本專案資料夾：

```bash
cd "C:\Users\Anubis.Chan\Downloads\鐵人賽\實驗場所\鐵人賽網頁"

# 初始化 Git 倉庫
git init

# 加入所有檔案並提交
git add .
git commit -m "feat: 初次發布鐵人賽科幻圖文檔案庫與案件線索板"

# 重新命名主分支為 main
git branch -M main

# 關聯至您的 GitHub 倉庫 (請將 USERNAME 與 REPO 替換為您的實際網址)
git remote add origin https://github.com/<您的GitHub帳號>/<您的倉庫名稱>.git

# 推送代碼至 GitHub
git push -u origin main
```

### 步驟 3：啟用 GitHub Pages
1. 進入您剛建立的 GitHub 倉庫頁面。
2. 點擊頂部的 **「Settings」**（設定）標籤。
3. 在左側選單中找到並點擊 **「Pages」**。
4. 在 **「Build and deployment」** 區塊：
   - **Source** 選擇：`Deploy from a branch`。
   - **Branch** 選擇：`main`，資料夾選擇 `/ (root)`。
   - 點擊 **「Save」**（儲存）。
5. 等待 1~2 分鐘，頁面頂部會出現您的專屬網址：  
   `https://<您的GitHub帳號>.github.io/<您的倉庫名稱>/`

大功告成！您現在可以將網址分享給所有人！

---

## 💻 本地直接運行方式

- 本專案已將數據封裝為 `data.js`，完全免除瀏覽器本地 `file://` 協議開啟時的 CORS 安全限制。
- 直接在檔案總管中雙擊 [`index.html`](file:///c:/Users/Anubis.Chan/Downloads/鐵人賽/實驗場所/鐵人賽網頁/index.html) 即可於 Chrome / Edge / Firefox 瀏覽器秒開體驗！

---

## 📁 專案檔案結構清單

```
鐵人賽網頁/
├── index.html            # 主頁面 (雙分頁科幻 HUD 介面架構)
├── style.css             # 科幻未來極簡風樣式表 (CSS Tokens, RWD, 玻璃擬態)
├── app.js                # 核心互動邏輯 (分頁切換、線索篩選、燈箱、量子微粒)
├── data.js               # 28 篇圖文數據庫 (避免 CORS，支援 GitHub Pages)
├── ironman_data.json     # 完整萃取之 JSON 原生數據
├── extract_data.py       # RSS 數據萃取與圖說過濾自動化腳本
├── build_data_js.py      # data.js 構建腳本
├── assets/
│   └── ai-images/        # 28 天專屬 AI 概念圖本地備份 (day1.png ~ day 28.png)
└── README.md             # 專案詳細說明與 GitHub Pages 部署指南
```
