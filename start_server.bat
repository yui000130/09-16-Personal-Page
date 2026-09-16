@echo off
chcp 65001 >nul
title 個人主頁伺服器 (Personal Website Server)
echo ========================================================
echo   🌟 正在為您啟動個人主頁伺服器 (Local Web Server)
echo   🌐 本機網址: http://localhost:8000
echo ========================================================
echo.
echo 正在為您自動開啟瀏覽器...
timeout /t 1 >nul
start http://localhost:8000

echo.
echo 伺服器運行中（關閉此視窗即可停止網站）...
python -m http.server 8000 2>nul || npx -y serve -l 8000 .
pause
