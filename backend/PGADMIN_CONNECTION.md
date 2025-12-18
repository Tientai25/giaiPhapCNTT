# pgAdmin Connection Guide
# Kết nối tới Render PostgreSQL Database

## 📥 Download pgAdmin
https://www.pgadmin.org/download/

## 🔧 Connection Settings

### General Tab:
Name: Render TDT eContract

### Connection Tab:
Host name/address: dpg-d522146uk2gs7a7ef9g-a.singapore-postgres.render.com
Port: 5432
Maintenance database: tdt_econtract
Username: tdt_user
Password: Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE
Save password: ✓

### SSL Tab:
SSL mode: Require

## 📊 Useful Queries

-- View all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- View users
SELECT * FROM users;

-- View contracts
SELECT * FROM contracts;

-- Count records
SELECT 
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'contracts', COUNT(*) FROM contracts
UNION ALL
SELECT 'templates', COUNT(*) FROM templates;

-- View table structure
SELECT 
  column_name, 
  data_type, 
  character_maximum_length,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

## 🔍 Quick Commands in PSQL Shell (Render Console)

\dt              -- List all tables
\d users         -- Describe users table
\l               -- List databases
\du              -- List users
\q               -- Quit

SELECT * FROM users LIMIT 10;
SELECT * FROM contracts WHERE status = 'pending';
