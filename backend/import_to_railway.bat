@echo off
REM Import Database to Railway MySQL
REM Paste your Railway MySQL credentials below

echo ========================================
echo   IMPORT DATABASE TO RAILWAY MYSQL
echo ========================================
echo.

REM ==================================================
REM PASTE YOUR VALUES FROM RAILWAY HERE:
REM ==================================================
REM Go to Railway Dashboard → MySQL → Variables tab
REM Click on each variable to reveal the value, then paste here:

set MYSQLHOST=paste_your_MYSQLHOST_here
set MYSQLPORT=paste_your_MYSQLPORT_here
set MYSQLUSER=paste_your_MYSQLUSER_here
set MYSQLPASSWORD=paste_your_MYSQLPASSWORD_here
set MYSQLDATABASE=paste_your_MYSQLDATABASE_here

REM ==================================================

echo Checking values...
echo Host: %MYSQLHOST%
echo Port: %MYSQLPORT%
echo User: %MYSQLUSER%
echo Database: %MYSQLDATABASE%
echo.

REM Check if values have been updated
if "%MYSQLHOST%"=="paste_your_MYSQLHOST_here" (
    echo ❌ ERROR: Please update the Railway credentials in this file first!
    echo.
    echo Open this file in a text editor and replace the placeholder values
    echo with your actual Railway MySQL credentials.
    pause
    exit /b 1
)

echo ========================================
echo Starting import...
echo ========================================
echo.

REM Set password environment variable to avoid showing it in command line
set MYSQL_PWD=%MYSQLPASSWORD%

REM Import database
mysql -h %MYSQLHOST% -P %MYSQLPORT% -u %MYSQLUSER% %MYSQLDATABASE% < database_export_full.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ IMPORT SUCCESSFUL!
    echo ========================================
    echo.
    echo Verifying tables...
    mysql -h %MYSQLHOST% -P %MYSQLPORT% -u %MYSQLUSER% %MYSQLDATABASE% -e "SHOW TABLES;"
    echo.
    echo ========================================
    echo Next steps:
    echo 1. Go to Railway Dashboard to check backend logs
    echo 2. Generate domain for backend service
    echo 3. Update VITE_API_URL on Vercel
    echo ========================================
) else (
    echo.
    echo ❌ IMPORT FAILED!
    echo.
    echo Please check:
    echo 1. MySQL client is installed
    echo 2. Railway credentials are correct
    echo 3. database_export_full.sql exists in current folder
    echo 4. Railway MySQL service is running
)

echo.
pause
