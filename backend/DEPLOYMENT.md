# TDT eContract Backend - Deployment Guide

## 🗄️ Database: PostgreSQL

### Environment Variables

Cấu hình các biến môi trường sau:

```bash
# PostgreSQL Connection
PGHOST=localhost           # hoặc host của Railway/Render
PGPORT=5432               # Port PostgreSQL (default: 5432)
PGUSER=postgres           # Username
PGPASSWORD=your_password  # Password
PGDATABASE=tdt_econtract  # Database name

# Application
PORT=3000
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here
```

## 🚀 Deployment Options

### ✅ Option 1: Railway.app (Khuyến nghị)

**Ưu điểm:**
- PostgreSQL database miễn phí (500MB)
- $5 credit/tháng free
- Auto-deploy từ GitHub
- Hỗ trợ environment variables tốt

**Cách deploy:**
1. Tạo project mới trên [Railway.app](https://railway.app)
2. Add PostgreSQL database service
3. Deploy từ GitHub repository
4. Railway tự động detect và dùng `nixpacks.toml`
5. Lấy DATABASE_URL và set các biến PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE

### ✅ Option 2: Render.com

**Ưu điểm:**
- Free tier tốt
- PostgreSQL free (90 days, 1GB storage)
- Easy to use
- Auto-deploy

**Cách deploy:**
1. Tạo Web Service mới trên [Render.com](https://render.com)
2. Connect GitHub repository
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && node server.js`
5. Tạo PostgreSQL database (free tier)
6. Link database với web service

### ✅ Option 3: Fly.io

**Ưu điểm:**
- Free tier generous
- PostgreSQL free
- Global edge network

**Cách deploy:**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Create app
fly launch

# Add PostgreSQL
fly postgres create

# Deploy
fly deploy
```

### ✅ Option 4: Supabase

**Ưu điểm:**
- PostgreSQL managed database
- Auto REST API
- Realtime subscriptions
- Free tier: 500MB database

**Cách deploy:**
1. Tạo project trên [Supabase](https://supabase.com)
2. Import schema.sql vào SQL Editor
3. Deploy backend lên Vercel/Railway
4. Connect với Supabase PostgreSQL

### Option 5: Heroku (Trả phí)

**Lưu ý:** Heroku đã ngừng free tier từ 11/2022

## 📦 Local Development với PostgreSQL

### 1. Cài đặt PostgreSQL

**Windows:**
```powershell
# Download từ: https://www.postgresql.org/download/windows/
# Hoặc dùng Chocolatey:
choco install postgresql
```

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Tạo Database Local

```powershell
# PowerShell
.\import_database.ps1
```

hoặc

```bash
# Linux/Mac
chmod +x import_database.sh
./import_database.sh
```

### 3. Install dependencies và chạy

```bash
cd backend
npm install
npm run dev
```

## 🔄 Migration từ MySQL sang PostgreSQL

Đã hoàn thành! Các thay đổi:

✅ Package: `mysql2` → `pg`
✅ Config: `db.config.js` đã chuyển sang PostgreSQL Pool
✅ Schema: `schema.sql` đã chuyển sang PostgreSQL syntax
✅ Sample Data: `sample_data.sql` đã tương thích PostgreSQL
✅ Scripts: Import scripts cho bash và PowerShell

## 🔗 Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

Ví dụ:
```
postgresql://postgres:mypassword@localhost:5432/tdt_econtract
```

## 🛠️ Troubleshooting

### Lỗi: "psql: command not found"
→ Cài đặt PostgreSQL client

### Lỗi: "password authentication failed"
→ Check PGUSER và PGPASSWORD

### Lỗi: "database does not exist"
→ Chạy script import_database.ps1 hoặc import_database.sh

### Railway deployment error
→ Đảm bảo nixpacks.toml đúng và Railway đã add PostgreSQL service

## 📝 Notes

- **Production**: Nên dùng connection pool và set `ssl: true`
- **Environment**: Không commit `.env` file lên Git
- **Backup**: Định kỳ backup database trên production
- **Monitoring**: Setup monitoring và alerts cho database

## 🎯 Next Steps

1. Deploy backend lên platform bạn chọn
2. Add PostgreSQL database service
3. Configure environment variables
4. Test API endpoints
5. Connect frontend với backend API

---

**Support:** Nếu cần hỗ trợ, vui lòng liên hệ team TDT eContract
