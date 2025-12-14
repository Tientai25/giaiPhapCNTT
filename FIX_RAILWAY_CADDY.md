# 🔧 Cách Sửa Lỗi Caddy SSL trên Railway

## ❌ Lỗi hiện tại:
```
mise install-into caddy@2.10.2 /railpack/caddy
ERROR: certificate verify failed (hostname mismatch)
```

## 🔍 Nguyên nhân:
Railway đang build **CẢ Frontend + Backend** cùng lúc:
- Phát hiện có Vite → Cài Caddy để serve static files
- Caddy download thất bại vì SSL certificate error
- **Frontend không cần deploy trên Railway** (đã có Vercel rồi!)

---

## ✅ GIẢI PHÁP: Chỉ Deploy Backend

Đã tạo 3 file config để Railway chỉ build backend:

### 1. `railway.json` - Cấu hình Railway
```json
{
  "build": {
    "buildCommand": "cd backend && npm install"
  },
  "deploy": {
    "startCommand": "cd backend && node server.js"
  }
}
```

### 2. `nixpacks.toml` - Ngăn cài Caddy
```toml
[start]
cmd = "cd backend && node server.js"
```

### 3. `.railwayignore` - Bỏ qua frontend files
Ignore: src/, public/, vite.config.js, etc.

---

## 🚀 Các Bước Thực Hiện:

### Bước 1: Push code mới
```powershell
git add .
git commit -m "Fix: Deploy backend only on Railway"
git push
```

### Bước 2: Cấu hình Railway Dashboard

**QUAN TRỌNG:** Phải set Root Directory!

1. Vào Railway project của bạn
2. Click vào **Service** → **Settings**
3. Tìm **Root Directory** 
4. Nhập: `backend`
5. Click **Save**
6. Redeploy: **Deployments** → **⋮** → **Redeploy**

### Bước 3: Thêm MySQL Database

1. Click **"+ New"** → **"Database"** → **"Add MySQL"**
2. Railway tự động tạo và inject env vars:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

### Bước 4: Import Database Schema

**Cách 1: Dùng Railway CLI**
```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Import schema
cd backend
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < schema.sql
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < sample_data.sql
```

**Cách 2: Dùng MySQL Workbench/Client**
1. Lấy connection details từ Railway dashboard
2. Connect và import file SQL

### Bước 5: Generate Domain & Lấy URL

1. Trong Railway, vào **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy URL (ví dụ: `https://your-backend.up.railway.app`)

### Bước 6: Cập nhật Vercel

1. Vào **Vercel Dashboard** → Project → **Settings** → **Environment Variables**
2. Thêm/sửa:
   ```
   VITE_API_URL = https://your-backend.up.railway.app
   ```
3. **Redeploy** frontend:
   - **Deployments** → **⋮** → **Redeploy**

---

## 🎯 Kiểm Tra

### 1. Test Backend API
```
https://your-backend.up.railway.app/api/health
```
Phải trả về: `{"status": "healthy", "database": "connected"}`

### 2. Test Frontend
1. Mở Vercel app: `https://your-app.vercel.app`
2. Thử đăng ký tài khoản
3. Kiểm tra Network tab → Request đi tới Railway backend

---

## 🔧 Troubleshooting

### Nếu vẫn lỗi Caddy:

**Option 1: Xóa cache và redeploy**
```
Settings → Clear Cache & Redeploy
```

**Option 2: Deploy từ backend folder trực tiếp**
```powershell
cd backend
railway init
railway up
```

**Option 3: Dùng Dockerfile thay vì Nixpacks**
- Railway sẽ ưu tiên `backend/Dockerfile` đã tạo
- Settings → Builder → Dockerfile

### Check logs:
```powershell
railway logs
```

---

## 📝 Checklist

- [x] Đã tạo `railway.json`
- [x] Đã sửa `nixpacks.toml`
- [x] Đã tạo `.railwayignore`
- [ ] **Commit & push code**
- [ ] **Set Root Directory = `backend`** trong Railway Settings
- [ ] Redeploy trên Railway
- [ ] Thêm MySQL database
- [ ] Import schema.sql và sample_data.sql
- [ ] Generate domain
- [ ] Cập nhật `VITE_API_URL` trên Vercel
- [ ] Redeploy frontend
- [ ] Test đăng ký/đăng nhập

---

## 🆘 Nếu vẫn không được:

**Plan B: Dùng Render.com**

Render đơn giản hơn và không có vấn đề Caddy:

1. https://render.com/ → Sign up
2. **New** → **Web Service**
3. Connect GitHub repo
4. **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Start Command**: `node server.js`
7. **Add PostgreSQL/MySQL** (free tier)
8. Deploy!

Render URL: `https://your-app.onrender.com`

---

Hãy làm theo các bước trên và cho tôi biết kết quả nhé! 🚀
