# TDT eContract Backend - Render.com Deployment Guide

## 🎯 Deploy Backend lên Render.com (Chi tiết từng bước)

### 📋 Yêu cầu trước khi bắt đầu:
- ✅ Tài khoản GitHub
- ✅ Repository đã push code lên GitHub
- ✅ Tài khoản Render.com (đăng ký miễn phí tại [render.com](https://render.com))

---

## 🚀 PHƯƠNG PHÁP 1: Deploy tự động với render.yaml (Khuyến nghị)

### Bước 1: Đăng nhập Render.com
1. Truy cập https://render.com
2. Click **Sign Up** hoặc **Log In**
3. Đăng nhập bằng GitHub account

### Bước 2: Tạo Blueprint từ GitHub
1. Trên Dashboard Render, click **New +** → **Blueprint**
2. Connect GitHub repository của bạn
3. Chọn repository: `giaiphapCNTT`
4. Branch: `main` hoặc `master`
5. Click **Apply**

✨ **Render sẽ tự động:**
- Tạo PostgreSQL database
- Tạo Web Service cho backend
- Link database với web service
- Setup environment variables
- Deploy ứng dụng

### Bước 3: Chờ deployment hoàn tất
- Render sẽ build và deploy (thường mất 3-5 phút)
- Xem logs trong tab **Logs**
- Khi thấy "✅ Successfully connected to TDT eContract PostgreSQL database" là thành công!

### Bước 4: Import Database Schema
1. Trên Dashboard, click vào **tdt-econtract-db** (PostgreSQL service)
2. Tab **Connect**, copy **External Database URL**
3. Dùng script import:

```bash
# Trên máy local, cài PostgreSQL client
# Set connection string
export DATABASE_URL="postgresql://user:pass@host:port/dbname"

# Import schema
psql $DATABASE_URL -f backend/schema.sql

# Import sample data (optional)
psql $DATABASE_URL -f backend/sample_data.sql
```

### Bước 5: Test API
- URL backend sẽ là: `https://tdt-econtract-backend.onrender.com`
- Test health check: `https://tdt-econtract-backend.onrender.com/api/health`

---

## 🔧 PHƯƠNG PHÁP 2: Deploy thủ công (Manual Setup)

### Bước 1: Tạo PostgreSQL Database

1. Trên Dashboard Render, click **New +** → **PostgreSQL**
2. Điền thông tin:
   - **Name**: `tdt-econtract-db`
   - **Database**: `tdt_econtract`
   - **User**: `tdt_user`
   - **Region**: `Singapore` (gần Việt Nam nhất)
   - **Plan**: **Free** (1GB storage, 90 days)
3. Click **Create Database**
4. Chờ database khởi tạo (1-2 phút)

### Bước 2: Lấy thông tin kết nối Database

1. Click vào database vừa tạo
2. Tab **Connect**, copy các thông tin:
   - **Hostname**
   - **Port** (thường là 5432)
   - **Database**
   - **Username**
   - **Password**
   - **Internal Database URL** (dùng nếu cùng region)
   - **External Database URL** (dùng để import từ local)

### Bước 3: Tạo Web Service (Backend)

1. Trên Dashboard, click **New +** → **Web Service**
2. **Connect GitHub repository**:
   - Click **Connect account** nếu chưa connect
   - Chọn repository: `giaiphapCNTT`
   - Click **Connect**

3. **Cấu hình Service**:
   - **Name**: `tdt-econtract-backend`
   - **Region**: `Singapore`
   - **Branch**: `main`
   - **Root Directory**: để trống (đã có trong build command)
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     cd backend && npm install
     ```
   - **Start Command**: 
     ```bash
     cd backend && node server.js
     ```
   - **Plan**: **Free**

4. Click **Advanced** để thêm settings:
   - **Health Check Path**: `/api/health`
   - **Auto-Deploy**: `Yes` (tự động deploy khi push code)

### Bước 4: Thêm Environment Variables

Scroll xuống phần **Environment Variables**, thêm các biến sau:

```bash
# Node Environment
NODE_ENV=production
PORT=3000

# PostgreSQL Connection (lấy từ database info ở Bước 2)
PGHOST=dpg-xxxxx-a.singapore-postgres.render.com
PGPORT=5432
PGDATABASE=tdt_econtract
PGUSER=tdt_user
PGPASSWORD=xxxxxxxxxxxxxxxxx

# JWT Secret (tạo random string dài)
JWT_SECRET=super_secret_jwt_key_change_this_in_production_12345

# CORS (nếu cần, thêm domain frontend)
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**💡 Tip**: Để generate JWT_SECRET mạnh:
```bash
# Trên terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Bước 5: Create Service và Deploy

1. Click **Create Web Service**
2. Render sẽ bắt đầu build và deploy
3. Xem logs real-time trong tab **Logs**

**Các logs bạn sẽ thấy:**
```
==> Cloning from https://github.com/your-repo/giaiphapCNTT...
==> Running 'cd backend && npm install'
==> Installing dependencies...
==> Running 'cd backend && node server.js'
==> ✅ Successfully connected to TDT eContract PostgreSQL database
==> Server running on port 3000
```

### Bước 6: Import Database Schema

**Option A: Dùng Render Shell**
1. Click vào database service
2. Tab **Shell** → **PSQL**
3. Copy-paste nội dung của `backend/schema.sql`
4. Execute

**Option B: Từ máy local (Khuyến nghị)**
```bash
# Cài PostgreSQL client nếu chưa có
# Windows: choco install postgresql
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client

# Lấy External Database URL từ Render
export DATABASE_URL="postgresql://tdt_user:password@dpg-xxxxx.singapore-postgres.render.com:5432/tdt_econtract"

# Import schema
psql $DATABASE_URL -f backend/schema.sql

# Import sample data (optional - để test)
psql $DATABASE_URL -f backend/sample_data.sql
```

### Bước 7: Kiểm tra Deployment

1. **Check Service Status**: 
   - Dashboard → Web Service → Status phải là "Live" (màu xanh)

2. **Test API Endpoints**:
   ```bash
   # Health check
   curl https://tdt-econtract-backend.onrender.com/api/health
   
   # Expected response:
   # {"status":"healthy","database":"connected","timestamp":"..."}
   
   # Test root endpoint
   curl https://tdt-econtract-backend.onrender.com/
   
   # Expected response:
   # {"message":"🚀 TDT eContract API Server","status":"running","version":"1.0.0"}
   ```

3. **Check Logs**:
   - Tab **Logs** để xem realtime logs
   - Tìm message: "✅ Successfully connected to TDT eContract PostgreSQL database"

---

## 🔄 Cập nhật Code (Auto-deploy)

Khi bạn push code mới lên GitHub:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render sẽ **tự động**:
1. Phát hiện có code mới
2. Trigger new build
3. Deploy version mới
4. Health check
5. Switch traffic sang version mới

**Zero downtime deployment!** 🎉

---

## ⚙️ Cấu hình nâng cao

### Tăng Performance

1. **Upgrade Plan** (nếu cần):
   - Free: 512MB RAM, auto-sleep sau 15 phút idle
   - Starter ($7/month): 512MB RAM, không sleep
   - Standard ($25/month): 2GB RAM, faster

2. **Database Scaling**:
   - Free: 1GB storage, 90 days
   - Paid: 10GB+ storage, không giới hạn thời gian

### Custom Domain

1. Tab **Settings** → **Custom Domain**
2. Add domain: `api.yourdomain.com`
3. Cấu hình DNS:
   ```
   Type: CNAME
   Name: api
   Value: tdt-econtract-backend.onrender.com
   ```
4. Render tự động tạo SSL certificate (Let's Encrypt)

### Environment Groups

Tạo Environment Group để reuse variables:
1. Dashboard → **Environment Groups**
2. **New Environment Group**
3. Add variables, link với multiple services

### Notifications & Monitoring

1. **Notifications**:
   - Tab **Settings** → **Notifications**
   - Add email hoặc Slack webhook
   - Nhận thông báo khi deploy failed

2. **Metrics**:
   - Tab **Metrics** xem CPU, Memory, Request stats
   - Free plan có basic metrics

---

## 🐛 Troubleshooting

### ❌ Build Failed

**Lỗi: "npm install failed"**
```bash
# Fix: Đảm bảo package.json đúng
cd backend
npm install --save pg  # Install PostgreSQL driver
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

**Lỗi: "Module not found"**
- Check `package.json` có đủ dependencies
- `pg` phải ở trong `dependencies`, không phải `devDependencies`

### ❌ Database Connection Failed

**Lỗi: "password authentication failed"**
- Check lại PGUSER và PGPASSWORD trong Environment Variables
- Copy chính xác từ database connection info

**Lỗi: "database does not exist"**
- Kiểm tra PGDATABASE có đúng không
- Database phải đã được tạo trên Render

**Lỗi: "SSL required"**
- Render PostgreSQL yêu cầu SSL
- File `db.config.js` đã có: `ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false`

### ❌ Service Không Start

**Lỗi: "Port already in use"**
- Đảm bảo `server.js` dùng `process.env.PORT`:
  ```javascript
  const PORT = process.env.PORT || 3000;
  ```

**Service sleep sau 15 phút (Free plan)**
- Đây là behavior bình thường của Free plan
- Service sẽ wake up khi có request (cold start ~30s)
- Upgrade Starter plan để tránh sleep

### ❌ 502 Bad Gateway

- Service đang restart hoặc deploy
- Chờ 1-2 phút
- Check logs xem có error không

---

## 💰 Chi phí Render.com

### Free Tier:
✅ **Web Service Free**:
- 512MB RAM
- Shared CPU
- Auto-sleep sau 15 phút idle
- 750 giờ/tháng (đủ cho development)

✅ **PostgreSQL Free**:
- 1GB storage
- Miễn phí 90 ngày
- Sau 90 ngày: $7/month cho database

### Paid Plans:
- **Starter**: $7/month (web service không sleep)
- **Standard**: $25/month (2GB RAM, better performance)
- **PostgreSQL**: $7/month (10GB storage)

### So sánh với Railway:
| Feature | Render Free | Railway Free |
|---------|-------------|--------------|
| Web Service | 750h/month | $5 credit |
| PostgreSQL | 90 days free | 500MB always free |
| Auto-sleep | Yes (15 min) | No |
| Build time | Generous | Limited |

---

## 📝 Checklist Deploy Thành Công

- [ ] Tạo PostgreSQL database trên Render
- [ ] Tạo Web Service và connect GitHub
- [ ] Cấu hình Build & Start commands
- [ ] Thêm Environment Variables (PG*, PORT, JWT_SECRET)
- [ ] Deploy thành công (status = Live)
- [ ] Import schema.sql vào database
- [ ] Test `/api/health` → response healthy
- [ ] Test `/` → response API info
- [ ] (Optional) Import sample_data.sql
- [ ] (Optional) Setup custom domain
- [ ] (Optional) Configure notifications

---

## 🔗 Links hữu ích

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **PostgreSQL on Render**: https://render.com/docs/databases
- **Node.js Deploy Guide**: https://render.com/docs/deploy-node-express-app

---

## 🎉 Kết luận

URL backend của bạn sau khi deploy:
```
https://tdt-econtract-backend.onrender.com
```

Dùng URL này để config trong frontend (Vercel):
```javascript
// frontend config
const API_URL = 'https://tdt-econtract-backend.onrender.com/api';
```

**Next steps:**
1. ✅ Backend deployed on Render
2. 🔜 Deploy frontend on Vercel
3. 🔜 Connect frontend với backend API
4. 🔜 Test toàn bộ hệ thống

---

**Cần hỗ trợ?** Check logs trong Render dashboard hoặc hỏi team! 🚀
