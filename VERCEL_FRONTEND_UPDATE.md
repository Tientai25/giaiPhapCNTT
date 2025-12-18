# ⚠️ QUAN TRỌNG: Cập nhật Frontend cho Production

Hiện tại frontend trên Vercel đang point về `localhost:3000` → **SẼ KHÔNG HOẠT ĐỘNG!**

## 🔧 CẦN LÀM GÌ:

### 1️⃣ Deploy Backend lên Render (làm trước)

```bash
# Push code mới (đã có CORS config)
git add .
git commit -m "Add CORS config for Vercel"
git push origin main

# Deploy lên Render theo hướng dẫn RENDER_DEPLOYMENT.md
# Sau khi deploy xong, bạn sẽ có URL:
# https://tdt-econtract-backend.onrender.com
```

### 2️⃣ Cập nhật Environment Variable trên Vercel

**Cách 1: Qua Vercel Dashboard (Khuyến nghị)**

1. Đăng nhập Vercel: https://vercel.com/dashboard
2. Click vào project: `giai-phap-cntt`
3. Tab **Settings** → **Environment Variables**
4. Add variable mới:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tdt-econtract-backend.onrender.com`
   - **Environments**: Tick cả `Production`, `Preview`, `Development`
5. Click **Save**
6. Tab **Deployments** → Click **Redeploy** (menu ... bên phải)

**Cách 2: Qua Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add VITE_API_URL production
# Nhập: https://tdt-econtract-backend.onrender.com

# Redeploy
vercel --prod
```

### 3️⃣ Hoặc update file `.env` và redeploy

```bash
# Sửa file .env local
VITE_API_URL=https://tdt-econtract-backend.onrender.com

# Push lên GitHub
git add .env
git commit -m "Update API URL to Render backend"
git push origin main

# Vercel sẽ tự động redeploy
```

---

## ✅ Checklist hoàn chỉnh:

- [ ] Backend deployed lên Render: `https://tdt-econtract-backend.onrender.com`
- [ ] Backend có CORS cho `https://giai-phap-cntt.vercel.app`
- [ ] Vercel có env var `VITE_API_URL` point đến Render backend
- [ ] Redeploy frontend trên Vercel
- [ ] Test login/register trên https://giai-phap-cntt.vercel.app

---

## 🧪 Test sau khi update:

1. **Test backend health**:
   ```bash
   curl https://tdt-econtract-backend.onrender.com/api/health
   ```

2. **Test frontend connection**:
   - Truy cập: https://giai-phap-cntt.vercel.app
   - Thử login/register
   - Check Console (F12) không có CORS error

---

## 🐛 Nếu gặp lỗi CORS:

```
Access to fetch at 'https://...' from origin 'https://giai-phap-cntt.vercel.app' 
has been blocked by CORS policy
```

**Fix**: Thêm env var `CORS_ORIGIN` trên Render:
```
CORS_ORIGIN=https://giai-phap-cntt.vercel.app
```

---

## 📝 Files đã cập nhật:

- ✅ `backend/server.js` - Thêm CORS config cho Vercel
- ✅ `backend/.env.example` - Cập nhật PostgreSQL + CORS example

---

**Next step**: Deploy backend lên Render, sau đó update Vercel env var! 🚀
