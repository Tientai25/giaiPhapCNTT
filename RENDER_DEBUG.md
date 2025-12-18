# Debug Render Deployment Issues

## 🔴 Lỗi: Health Check Timeout

### Nguyên nhân đã fix:

1. ✅ **PORT config sai**: Xóa `PORT=3000` trong render.yaml (Render tự set PORT)
2. ✅ **PostgreSQL query syntax**: Sửa `const [rows] = await` → `const result = await`
3. ✅ **Missing dotenv**: Thêm `require('dotenv').config()` trong server.js

### Các file đã sửa:

- `render.yaml` - Xóa PORT env var
- `backend/server.js` - Fix health check query & add dotenv
- `backend/db.config.js` - Đã đúng (không cần sửa)

---

## 🚀 Deploy lại:

```bash
git add .
git commit -m "Fix Render deployment: health check & port config"
git push origin main
```

Render sẽ tự động redeploy.

---

## 🔍 Check Logs trên Render:

1. Vào Render Dashboard
2. Click vào service `tdt-econtract-backend`
3. Tab **Logs**

**Logs cần thấy:**
```
✅ Successfully connected to TDT eContract PostgreSQL database
🌍 Environment: production
🚀 Starting server on port: 10000
✅ TDT eContract API Server running on port 10000
```

**Nếu thấy lỗi:**
- ❌ Database connection error → Check env vars PGHOST, PGUSER, PGPASSWORD
- ❌ Module not found → Check package.json có đủ dependencies
- ❌ Port binding error → Đã fix (xóa PORT=3000)

---

## ✅ Sau khi deploy thành công:

Test API:
```bash
curl https://tdt-econtract-backend.onrender.com/api/health
```

Expected:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-12-18T..."
}
```

---

## 🐛 Troubleshooting:

### Nếu vẫn timeout:

**1. Check Environment Variables:**
```
NODE_ENV=production
PGHOST=dpg-d522146uk2gs7a7ef9g-a
PGPORT=5432
PGDATABASE=tdt_econtract
PGUSER=tdt_user
PGPASSWORD=Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE
JWT_SECRET=your-secret
CORS_ORIGIN=https://giai-phap-cntt.vercel.app
```

**2. Import Schema:**
```bash
# Nếu chưa import schema
psql "postgresql://tdt_user:Y6JyhQVucZR8CwM1alpXr3VUi7TTVyLE@dpg-d522146uk2gs7a7ef9g-a.singapore-postgres.render.com:5432/tdt_econtract" -f backend/schema.sql
```

**3. Check Build Logs:**
- Có error khi `npm install` không?
- Có missing dependencies không?

---

## 📋 Checklist:

- [x] Xóa PORT=3000 trong render.yaml
- [x] Fix health check query PostgreSQL
- [x] Add require('dotenv').config()
- [ ] Push code và đợi redeploy
- [ ] Check logs không có error
- [ ] Test health endpoint
- [ ] Import schema nếu chưa có

---

**Common issues:**

| Error | Fix |
|-------|-----|
| Port binding failed | Xóa PORT env var, để Render tự set |
| Database connection timeout | Check PGHOST, PGPASSWORD đúng chưa |
| Health check timeout | Check /api/health response 200 |
| Module not found | Check package.json có `pg` dependency |
| SSL error | db.config.js có `ssl: { rejectUnauthorized: false }` |
