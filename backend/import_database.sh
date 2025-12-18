#!/bin/bash
# Import PostgreSQL Database Script
# Usage: ./import_database.sh

echo "=========================================="
echo "TDT eContract - PostgreSQL Import Script"
echo "=========================================="

# Database connection details
DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"
DB_USER="${PGUSER:-postgres}"
DB_PASSWORD="${PGPASSWORD:-postgres}"
DB_NAME="${PGDATABASE:-tdt_econtract}"

echo ""
echo "Database Configuration:"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  User: $DB_USER"
echo "  Database: $DB_NAME"
echo ""

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "❌ Error: psql is not installed"
    echo "Please install PostgreSQL client first"
    exit 1
fi

echo "📋 Step 1: Checking if database exists..."
DB_EXISTS=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -w $DB_NAME | wc -l)

if [ $DB_EXISTS -eq 0 ]; then
    echo "📦 Creating database: $DB_NAME"
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "❌ Failed to create database"
        exit 1
    fi
else
    echo "✅ Database already exists"
    read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Dropping existing database..."
        PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
        echo "📦 Creating new database..."
        PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
    fi
fi

echo ""
echo "📋 Step 2: Importing schema..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f schema.sql
if [ $? -eq 0 ]; then
    echo "✅ Schema imported successfully"
else
    echo "❌ Failed to import schema"
    exit 1
fi

echo ""
echo "📋 Step 3: Importing sample data..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f sample_data.sql
if [ $? -eq 0 ]; then
    echo "✅ Sample data imported successfully"
else
    echo "❌ Failed to import sample data"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Database import completed successfully!"
echo "=========================================="
echo ""
echo "Connection URL:"
echo "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""
