# TDT eContract Backend - Quick Start Guide

## 🚀 Deploy lên Render.com (Recommended)

### Cách nhanh nhất - Blueprint Deploy:

1. **Push code lên GitHub** (nếu chưa):
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Truy cập Render.com**:
   - Đăng nhập: https://dashboard.render.com
   - Click **New +** → **Blueprint**
   - Connect GitHub repo: `giaiphapCNTT`
   - Click **Apply**

3. **Chờ auto-deploy** (3-5 phút):
   - Render tự tạo PostgreSQL database
   - Render tự deploy backend service
   - Render tự link database với service

4. **Import database schema**:
   ```bash
   # Lấy Database URL từ Render dashboard
   psql "postgresql://user:pass@host:port/db" -f backend/schema.sql
   ```

5. **✅ Done!** Backend của bạn đã live tại:
   ```
   https://tdt-econtract-backend.onrender.com
   ```

### 📖 Hướng dẫn chi tiết:
Xem file: `RENDER_DEPLOYMENT.md`

---

## 🔧 Environment Variables cần thiết:

```bash
NODE_ENV=production
PORT=3000
PGHOST=your-db-host.render.com
PGPORT=5432
PGDATABASE=tdt_econtract
PGUSER=tdt_user
PGPASSWORD=your-password
JWT_SECRET=your-secret-key
```

---

## 🧪 Test Local trước khi deploy:

```bash
# Install dependencies
cd backend
npm install

# Setup local PostgreSQL
.\import_database.ps1

# Run server
npm run dev

# Test API
curl http://localhost:3000/api/health
```

---

## 📚 More info:
- Full deployment guide: `RENDER_DEPLOYMENT.md`
- General deployment: `DEPLOYMENT.md`
