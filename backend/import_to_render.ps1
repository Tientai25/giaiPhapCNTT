# Import Schema to Render PostgreSQL Database
# Copy External Database URL from Render and run:

# Windows PowerShell:
$env:DATABASE_URL="postgresql://tdt_user:Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE@dpg-d522146uk2gs7a7ef9g-a.singapore-postgres.render.com:5432/tdt_econtract"

# Import schema
psql $env:DATABASE_URL -f backend\schema.sql

# Import sample data (optional)
psql $env:DATABASE_URL -f backend\sample_data.sql

# Linux/Mac:
export DATABASE_URL="postgresql://tdt_user:Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE@dpg-d522146uk2gs7a7ef9g-a.singapore-postgres.render.com:5432/tdt_econtract"
psql $DATABASE_URL -f backend/schema.sql
psql $DATABASE_URL -f backend/sample_data.sql
