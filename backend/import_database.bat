@echo off
echo ========================================
echo TDT eContract - Database Import Script
echo ========================================
echo.

REM Thay đổi đường dẫn MySQL nếu cần
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
set DB_USER=giaiphapcntt
set DB_PASS=0865798099
set DB_HOST=localhost

echo Checking MySQL connection...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% -h%DB_HOST% -e "SELECT 'Connected successfully' as status;"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Cannot connect to MySQL!
    echo Please check:
    echo - MySQL Server is running
    echo - Username and password are correct
    echo - MySQL path is correct in this script
    pause
    exit /b 1
)

echo.
echo Importing database schema...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% -h%DB_HOST% < schema.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to import schema!
    pause
    exit /b 1
)

echo Schema imported successfully!
echo.
echo Importing sample data...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% -h%DB_HOST% tdt_econtract < sample_data.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to import sample data!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database imported successfully!
echo ========================================
echo.
echo Checking data...
%MYSQL_PATH% -u%DB_USER% -p%DB_PASS% -h%DB_HOST% tdt_econtract -e "SELECT COUNT(*) as user_count FROM users; SELECT COUNT(*) as contract_count FROM contracts;"

echo.
echo Done! You can now use the database.
pause
