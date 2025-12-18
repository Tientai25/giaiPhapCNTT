#!/bin/bash
# Import Schema to Render PostgreSQL Database

# Set your External Database URL from Render
DATABASE_URL="postgresql://tdt_user:Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE@dpg-d522146uk2gs7a7ef9g-a.singapore-postgres.render.com:5432/tdt_econtract"

echo "=========================================="
echo "Importing Schema to Render PostgreSQL"
echo "=========================================="

# Import schema
echo "📋 Importing schema.sql..."
psql "$DATABASE_URL" -f backend/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema imported successfully"
else
    echo "❌ Failed to import schema"
    exit 1
fi

# Import sample data (optional)
read -p "Do you want to import sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📋 Importing sample_data.sql..."
    psql "$DATABASE_URL" -f backend/sample_data.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Sample data imported successfully"
    else
        echo "❌ Failed to import sample data"
    fi
fi

echo ""
echo "=========================================="
echo "✅ Import completed!"
echo "=========================================="
