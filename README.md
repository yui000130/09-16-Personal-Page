# 09-16-Personal-Page • 個人專屬主頁與即時時鐘

> 🌟 專為 **Yui ([@yui000130](https://github.com/yui000130))** 打造的現代化個人網站與即時系統儀表板。

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?logo=github)](https://yui000130.github.io/09-16-Personal-Page/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-live-success.svg)]()

---

## 🌐 線上展示網址 (Live Website URL)

- **GitHub Pages 公開網址**：[https://yui000130.github.io/09-16-Personal-Page/](https://yui000130.github.io/09-16-Personal-Page/)
- **GitHub 專案原始碼**：[https://github.com/yui000130/09-16-Personal-Page](https://github.com/yui000130/09-16-Personal-Page)

---

## ✨ 核心特色與功能 (Key Features)

1. **⏱️ 高精度即時系統時鐘 (Live Real-Time Clock)**：
   - 毫秒級即時更新時、分、秒（包含動態跳動冒號）。
   - 當天完整日期與星期格式化。
   - 動態秒數平滑進度條 (Seconds Progress Bar)。
   - 今日時間進度百分比 (Day Progress)。
   - 支援 12H / 24H 制即時切換。
   - 自動時區識別（例如 `Asia/Taipei (UTC+8)`）。

2. **🎨 經典雙態導覽列 (Dual-Mode Sticky Header)**：
   - 頂部懸浮時呈現玻璃擬態半透明質感 (`.alt`)。
   - 頁面向下滾動時平滑切換為深色磨砂固態導覽列。
   - 導覽列整合即時時鐘膠囊標籤。

3. **✍️ 畫面即時編輯姓名與頭銜 (Inline Editing & Persistence)**：
   - 點擊首頁大標題即可在頁面上直接修改姓名或座右銘。
   - 資料自動儲存至瀏覽器本地快取 (`localStorage`)，下次開啟依然保留。

4. **🏷️ 專業技能標籤雲 (Skills & Tags Cloud)**：
   - 整合現代全端開發技術棧、工具與核心能力徽章。

5. **📱 極致響應式體驗 (Mobile Responsive)**：
   - 完美適配手機、平板、筆電與超寬螢幕。

---

## 🚀 如何開啟 GitHub Pages 取得公開網址

1. 將本專案檔案推送至 GitHub：
   ```bash
   git init
   git config user.name "yui000130"
   git config user.email "yui000130@users.noreply.github.com"
   git add .
   git commit -m "feat: complete personal page with real-time clock and GitHub integration"
   git branch -M main
   git remote add origin https://github.com/yui000130/09-16-Personal-Page.git
   git push -u origin main --force
   ```
2. 開啟您的 GitHub 儲存庫：[https://github.com/yui000130/09-16-Personal-Page](https://github.com/yui000130/09-16-Personal-Page)
3. 點擊頂部的 **Settings** ⚙️。
4. 在左側選單點擊 **Pages**。
5. 在 **Build and deployment** 下方的 **Branch** 選擇：
   - 分支：`main`
   - 資料夾：`/ (root)`
   - 點擊 **Save**。
6. 等待 30 秒至 1 分鐘，您的網站就會在下方網址正式發布：
   👉 **https://yui000130.github.io/09-16-Personal-Page/**
