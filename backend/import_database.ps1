# Import PostgreSQL Database Script (PowerShell)
# Usage: .\import_database.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TDT eContract - PostgreSQL Import Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Database connection details
$DB_HOST = if ($env:PGHOST) { $env:PGHOST } else { "localhost" }
$DB_PORT = if ($env:PGPORT) { $env:PGPORT } else { "5432" }
$DB_USER = if ($env:PGUSER) { $env:PGUSER } else { "postgres" }
$DB_PASSWORD = if ($env:PGPASSWORD) { $env:PGPASSWORD } else { "postgres" }
$DB_NAME = if ($env:PGDATABASE) { $env:PGDATABASE } else { "tdt_econtract" }

Write-Host "Database Configuration:" -ForegroundColor Yellow
Write-Host "  Host: $DB_HOST"
Write-Host "  Port: $DB_PORT"
Write-Host "  User: $DB_USER"
Write-Host "  Database: $DB_NAME"
Write-Host ""

# Set PGPASSWORD environment variable for authentication
$env:PGPASSWORD = $DB_PASSWORD

# Check if psql is installed
try {
    $null = Get-Command psql -ErrorAction Stop
} catch {
    Write-Host "❌ Error: psql is not installed" -ForegroundColor Red
    Write-Host "Please install PostgreSQL client first" -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Step 1: Checking if database exists..." -ForegroundColor Cyan
$dbCheckQuery = "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'"
$dbExists = psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -t -A -c $dbCheckQuery 2>$null

if ([string]::IsNullOrEmpty($dbExists)) {
    Write-Host "📦 Creating database: $DB_NAME" -ForegroundColor Yellow
    psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database created successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to create database" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Database already exists" -ForegroundColor Green
    $response = Read-Host "Do you want to drop and recreate it? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "🗑️  Dropping existing database..." -ForegroundColor Yellow
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
        Write-Host "📦 Creating new database..." -ForegroundColor Yellow
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"
    }
}

Write-Host ""
Write-Host "📋 Step 2: Importing schema..." -ForegroundColor Cyan
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f schema.sql
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema imported successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to import schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Step 3: Importing sample data..." -ForegroundColor Cyan
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sample_data.sql
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Sample data imported successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to import sample data" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Database import completed successfully!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Connection URL:" -ForegroundColor Yellow
Write-Host "postgresql://$DB_USER`:$DB_PASSWORD@$DB_HOST`:$DB_PORT/$DB_NAME"
Write-Host ""
