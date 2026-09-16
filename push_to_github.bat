@echo off
chcp 65001 >nul
title 推送個人網站到 GitHub (yui000130/09-16-Personal-Page)
echo ================================================================
echo   🚀 正在為您將個人主頁同步至 GitHub：
echo   📦 https://github.com/yui000130/09-16-Personal-Page
echo ================================================================
echo.

git init
git config user.name "yui000130"
git config user.email "yui000130@gmail.com"
git add .
git commit -m "feat: complete personal page with real-time clock and GitHub integration"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/yui000130/09-16-Personal-Page.git

echo 正在推送至 GitHub main 分支...
git push -u origin main --force

echo.
if %ERRORLEVEL% equ 0 (
    echo ================================================================
    echo   🎉 推送成功！
    echo   🌐 GitHub 儲存庫: https://github.com/yui000130/09-16-Personal-Page
    echo   ✨ 請前往 GitHub Repo 的 Settings > Pages 開啟部署即可獲得公開網址！
    echo ================================================================
) else (
    echo 提示: 若推送時需要登入 GitHub，請依照彈出視窗登入您的帳號 (Sign in with your browser)。
)
pause
