@echo off
title Local Host Server ( Webkit )

echo.
echo ===================================================
echo              YOUR IPV4 ADDRESS:
echo ===================================================
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"Alamat IPv4"') do (
    set "ip=%%a"
    setlocal enabledelayedexpansion
    set "ip=!ip:~1!"
    echo !ip!
    endlocal
)

echo.
echo ===================================================
echo     SERVER IS RUNNING, DONT CLOSE THIS TAB!
echo ===================================================
echo.

cd /d "C:\Users\Gas\OneDrive\Dokumen\portofolio"

echo Server Log : 
echo.
echo.
python -m http.server 80
