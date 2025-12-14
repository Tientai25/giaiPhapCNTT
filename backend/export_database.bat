@echo off
REM Export TDT eContract Database to SQL file
REM Update paths if needed

echo Exporting database from MySQL Workbench...

REM Update these paths for your MySQL installation
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
set MYSQLDUMP_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

REM Database credentials (update if different)
set DB_USER=giaiphapcntt
set DB_PASSWORD=0865798099
set DB_NAME=tdt_econtract

REM Output file
set OUTPUT_FILE=database_export_full.sql

echo.
echo Exporting %DB_NAME% to %OUTPUT_FILE%...

%MYSQLDUMP_PATH% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% > %OUTPUT_FILE%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Export successful! File saved: %OUTPUT_FILE%
    echo File size:
    dir %OUTPUT_FILE% | find "%OUTPUT_FILE%"
) else (
    echo.
    echo ❌ Export failed! Please check:
    echo 1. MySQL path is correct
    echo 2. Username and password are correct
    echo 3. Database exists
)

pause
