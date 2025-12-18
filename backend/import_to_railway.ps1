# Import Database to Railway MySQL - PowerShell Version
# Paste your Railway MySQL credentials

Write-Host "========================================"
Write-Host "  IMPORT DATABASE TO RAILWAY MYSQL"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ==================================================
# PASTE YOUR VALUES FROM RAILWAY HERE:
# ==================================================
# Go to Railway Dashboard → MySQL → Variables tab
# Click on each variable to reveal the value, then paste here:

$MYSQLHOST = "paste_your_MYSQLHOST_here"
$MYSQLPORT = "paste_your_MYSQLPORT_here"
$MYSQLUSER = "paste_your_MYSQLUSER_here"
$MYSQLPASSWORD = "paste_your_MYSQLPASSWORD_here"
$MYSQLDATABASE = "paste_your_MYSQLDATABASE_here"

# ==================================================

Write-Host "Checking values..."
Write-Host "Host: $MYSQLHOST"
Write-Host "Port: $MYSQLPORT"
Write-Host "User: $MYSQLUSER"
Write-Host "Database: $MYSQLDATABASE"
Write-Host ""

# Check if values have been updated
if ($MYSQLHOST -eq "paste_your_MYSQLHOST_here") {
    Write-Host "❌ ERROR: Please update the Railway credentials in this file first!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Open this file in a text editor and replace the placeholder values"
    Write-Host "with your actual Railway MySQL credentials."
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "========================================"
Write-Host "Starting import..."
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set password environment variable
$env:MYSQL_PWD = $MYSQLPASSWORD

# Import database
$importCmd = "mysql -h $MYSQLHOST -P $MYSQLPORT -u $MYSQLUSER $MYSQLDATABASE"
Get-Content database_export_full.sql | & mysql -h $MYSQLHOST -P $MYSQLPORT -u $MYSQLUSER $MYSQLDATABASE

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "✅ IMPORT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Verifying tables..."
    mysql -h $MYSQLHOST -P $MYSQLPORT -u $MYSQLUSER $MYSQLDATABASE -e "SHOW TABLES;"
    Write-Host ""
    Write-Host "========================================"
    Write-Host "Next steps:"
    Write-Host "1. Go to Railway Dashboard to check backend logs"
    Write-Host "2. Generate domain for backend service"
    Write-Host "3. Update VITE_API_URL on Vercel"
    Write-Host "========================================"
} else {
    Write-Host ""
    Write-Host "❌ IMPORT FAILED!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:"
    Write-Host "1. MySQL client is installed"
    Write-Host "2. Railway credentials are correct"
    Write-Host "3. database_export_full.sql exists in current folder"
    Write-Host "4. Railway MySQL service is running"
}

Write-Host ""
Read-Host "Press Enter to exit"
