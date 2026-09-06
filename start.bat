@echo off
chcp 866 >nul
title Markus-Mart - zapusk...
color 0A

:: Perehodim v papku s etim .bat-fajlom
cd /d "%~dp0"

echo.
echo  ================================================
echo  =           MARKUS-MART  v1.0                  =
echo  =    Turisticheskie aksessuary                 =
echo  ================================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo  [OSIBKA] Python ne naiden!
    echo.
    echo  Ustanovi Python 3.11+ s https://python.org
    echo  OBYAZATELNO otmetj galochku "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%a in ('python --version 2^>^&1') do set PYVER=%%a
echo  [OK] Naiden: %PYVER%
echo.

:: Sozdaem venv esli net
if not exist "venv\Scripts\python.exe" (
    echo  [ZAGRUZKA] Sozdayu virtualnoe okruzhenie...
    python -m venv venv
    if errorlevel 1 (
        echo  [OSIBKA] Ne udalos sozdat venv
        pause
        exit /b 1
    )
    echo  [OK] Okruzhenie sozdano
) else (
    echo  [OK] Virtualnoe okruzhenie naideno
)
echo.

:: Obnovljaem pip v venv
echo  [ZAGRUZKA] Obnovljaju pip...
venv\Scripts\python.exe -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn --quiet

echo  [ZAGRUZKA] Ustanavlivaju zavisimosti...
echo.

:: Ustanavlivaem zavisimosti
venv\Scripts\python.exe -m pip install flask werkzeug python-dotenv -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn
if errorlevel 1 (
    echo.
    echo  [ZAGRUZKA] Zerkalo 1 ne srabotalo, probuju zerkalo 2...
    venv\Scripts\python.exe -m pip install flask werkzeug python-dotenv -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
    if errorlevel 1 (
        echo.
        echo  [ZAGRUZKA] Probuyu originalniy PyPI...
        venv\Scripts\python.exe -m pip install flask werkzeug python-dotenv --trusted-host pypi.org --trusted-host files.pythonhosted.org
        if errorlevel 1 (
            echo.
            echo  [OSIBKA] Ne udalos ustanovit zavisimosti
            echo.
            echo  Poprobuj v ruchnom rezhime:
            echo    venv\Scripts\python.exe -m pip install flask werkzeug python-dotenv
            echo.
            pause
            exit /b 1
        )
    )
)

:: PROVERKA: dotenv ustanovlen?
venv\Scripts\python.exe -c "import dotenv" >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [OSIBKA] Paket python-dotenv ne ustanovilsja!
    echo  Poprobuju eshe raz...
    venv\Scripts\python.exe -m pip install python-dotenv --force-reinstall --no-cache-dir -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn
    venv\Scripts\python.exe -c "import dotenv" >nul 2>&1
    if errorlevel 1 (
        echo  [OSIBKA] Vse ravno ne rabotaet. Ustanovi ruchkom:
        echo    venv\Scripts\python.exe -m pip install python-dotenv
        pause
        exit /b 1
    )
)

echo  [OK] Vse zavisimosti ustanovleny i provereny
echo.

:: .env
if not exist ".env" (
    echo  [ZAGRUZKA] Sozdayu .env...
    (
        echo # Markus-Mart - konfiguraciya
        echo.
        echo ADMIN_USERNAME=admin
        echo ADMIN_PASSWORD=markus2026
        echo.
        echo SMTP_SERVER=smtp.yandex.ru
        echo SMTP_PORT=465
        echo SMTP_USER=info@markus-mart.ru
        echo SMTP_PASSWORD=your_password_here
        echo ADMIN_EMAIL=admin@markus-mart.ru
        echo.
        echo SECRET_KEY=markus-mart-secret-key-change-me
    ) > .env
    echo  [OK] .env sozdan
) else (
    echo  [OK] .env naiden
)
echo.

if not exist "templates\logo" mkdir "templates\logo"
if not exist "templates\logo\logo.png" (
    echo  [VNIMANIE] templates\logo\logo.png ne naiden!
    echo            Poloji tuda svoy logotip.
)
echo.

echo  [START] Zapusk servera...
echo  ------------------------------------------------
echo.
echo  Otkroy v brauzere:  http://127.0.0.1:5000
echo  Admin panel:         http://127.0.0.1:5000/admin/login
echo  Login: admin    Parol: markus2026
echo.
echo  Dla ostanovki najmi Ctrl+C
echo.

start "" "http://127.0.0.1:5000"
venv\Scripts\python.exe app.py

echo.
echo  Server ostanovlen.
pause
