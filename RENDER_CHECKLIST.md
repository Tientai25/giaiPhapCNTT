# Render Deployment Checklist

## ✅ Pre-deployment Checklist

- [x] Đã chuyển sang PostgreSQL (pg package)
- [x] Có file `render.yaml` (auto-deploy)
- [x] server.js listen on 0.0.0.0
- [x] server.js dùng process.env.PORT
- [x] db.config.js có SSL config cho production
- [x] package.json có đầy đủ dependencies

## 🚀 Deployment Steps

### Quick Deploy (Blueprint):
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for Render deployment"
git push

# 2. Go to Render Dashboard
# https://dashboard.render.com

# 3. Click: New + → Blueprint

# 4. Connect GitHub repo

# 5. Click Apply

# 6. Wait for auto-deploy (3-5 min)

# 7. Import schema
psql DATABASE_URL -f backend/schema.sql
```

### Manual Deploy:
Xem file `RENDER_DEPLOYMENT.md` để có hướng dẫn chi tiết.

## 🔑 Environment Variables

Setup trong Render Dashboard:
```
NODE_ENV=production
PORT=3000
PGHOST=[from database]
PGPORT=5432
PGDATABASE=tdt_econtract
PGUSER=[from database]
PGPASSWORD=[from database]
JWT_SECRET=[generate random]
```

## ✅ Post-deployment Checklist

- [ ] Service status = "Live" (green)
- [ ] Database created and connected
- [ ] Schema imported successfully
- [ ] Test: https://your-app.onrender.com/
- [ ] Test: https://your-app.onrender.com/api/health
- [ ] Logs show: "Successfully connected to PostgreSQL database"

## 🐛 Common Issues

**Build fails**: Check `package.json` có đúng dependencies
**Connection fails**: Check environment variables PGHOST, PGPASSWORD
**502 Error**: Service đang restart, đợi 1-2 phút

## 📝 Notes

- Free plan auto-sleep sau 15 phút không dùng
- Cold start ~30 giây sau khi sleep
- PostgreSQL free 90 days, sau đó $7/month
- Có thể upgrade sang Starter plan ($7/month) để không sleep
