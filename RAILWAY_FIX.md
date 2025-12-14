# Railway Deployment Instructions

## ❌ Lỗi hiện tại:
```
mise ERROR error:0A000086:SSL routines:tls_post_process_server_certificate:certificate verify failed
```

**Nguyên nhân**: Railway/Nixpacks tự động cài Caddy server nhưng gặp lỗi SSL certificate.

---

## ✅ Giải pháp đã thêm:

### 1. File `nixpacks.toml` (Root folder)
- Cấu hình Railway sử dụng Node.js thay vì Caddy
- Chỉ định rõ lệnh build và start

### 2. File `backend/Dockerfile` 
- Dockerfile tùy chỉnh cho backend
- Railway sẽ ưu tiên dùng Dockerfile nếu có

### 3. File `backend/.railwayignore`
- Bỏ qua files frontend khi deploy backend

---

## 🚀 Cách Deploy Backend lên Railway:

### Bước 1: Chuẩn bị Code

1. **Commit các file mới**:
   ```bash
   git add .
   git commit -m "Add Railway deployment config"
   git push
   ```

### Bước 2: Deploy lên Railway

**Tùy chọn A: Deploy từ GitHub (Khuyên dùng)**

1. Đăng nhập Railway: https://railway.app/
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Chọn repository của bạn
4. Railway sẽ tự động phát hiện và build

**Tùy chọn B: Deploy trực tiếp từ folder backend**

1. Cài Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login:
   ```bash
   railway login
   ```

3. Deploy từ folder backend:
   ```bash
   cd backend
   railway init
   railway up
   ```

### Bước 3: Thêm MySQL Database

1. Trong Railway project, click **"New"** → **"Database"** → **"Add MySQL"**
2. Railway tự động tạo database và cung cấp connection variables
3. Không cần cấu hình gì thêm!

### Bước 4: Cấu hình Environment Variables

Railway tự động inject các biến:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLDATABASE`
- `MYSQLUSER`
- `MYSQLPASSWORD`

**Cập nhật** `backend/config/db.config.js`:

```javascript
require('dotenv').config();

const mysql = require('mysql2');

const config = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'tdt_econtract',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);
```

### Bước 5: Import Database

**Tùy chọn A: Sử dụng Railway CLI**
```bash
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < schema.sql
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < sample_data.sql
```

**Tùy chọn B: Sử dụng MySQL client**
1. Lấy connection string từ Railway dashboard
2. Connect và import:
   ```bash
   mysql -h <host> -P <port> -u <user> -p<password> <database> < schema.sql
   ```

### Bước 6: Lấy Backend URL

1. Trong Railway dashboard, vào **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Lấy URL (VD: `https://your-backend.railway.app`)

### Bước 7: Cấu hình Vercel với Backend URL

1. Vào **Vercel Dashboard** → Project → **Settings** → **Environment Variables**
2. Thêm:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
3. **Redeploy** frontend

---

## 🔧 Troubleshooting

### Nếu vẫn gặp lỗi Caddy/mise:

1. **Xóa cache Railway**:
   - Settings → Redeploy → Clear cache & redeploy

2. **Chỉ định Root Directory**:
   - Settings → Root Directory → `/backend`

3. **Force dùng Dockerfile**:
   - Đặt file `Dockerfile` trong root hoặc backend folder
   - Railway sẽ ưu tiên Dockerfile

### Kiểm tra logs:

```bash
railway logs
```

---

## 📝 Checklist

- [ ] Đã tạo `nixpacks.toml`
- [ ] Đã tạo `backend/Dockerfile`
- [ ] Đã push code lên GitHub
- [ ] Đã deploy backend lên Railway
- [ ] Đã thêm MySQL database
- [ ] Đã import schema và data
- [ ] Đã generate domain cho backend
- [ ] Đã cập nhật `VITE_API_URL` trên Vercel
- [ ] Đã redeploy frontend
- [ ] Test đăng ký/đăng nhập thành công

---

## 🎯 Alternative: Deploy Backend lên Render

Nếu Railway vẫn gặp vấn đề, dùng Render:

1. https://render.com/ → **New** → **Web Service**
2. Connect GitHub repo
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `node server.js`
6. Thêm Environment Variables
7. Render sẽ cung cấp URL

---

Thử deploy theo các bước trên và cho tôi biết kết quả nhé!
