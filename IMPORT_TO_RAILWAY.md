# 📥 Hướng dẫn Import Database lên Railway MySQL

## Cách 1: Qua Railway Dashboard (Dễ nhất)

### Bước 1: Lấy Connection String
1. Vào Railway Dashboard
2. Click vào **MySQL service** (database icon)
3. Tab **Variables** → Copy các giá trị:
   - MYSQLHOST (ví dụ: viaduct.proxy.rlwy.net)
   - MYSQLPORT (ví dụ: 12345)
   - MYSQLUSER (thường là: root)
   - MYSQLPASSWORD (password được generate)
   - MYSQLDATABASE (thường là: railway)

### Bước 2: Import qua Command Line

Mở PowerShell trong folder backend và chạy:

```powershell
# Thay thế các giá trị <...> bằng giá trị từ Railway
$env:MYSQL_PWD="<MYSQLPASSWORD>"

mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> <MYSQLDATABASE> < database_export_full.sql
```

**Ví dụ:**
```powershell
$env:MYSQL_PWD="abc123xyz789"
mysql -h viaduct.proxy.rlwy.net -P 12345 -u root railway < database_export_full.sql
```

### Bước 3: Kiểm tra đã import thành công

```powershell
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> <MYSQLDATABASE> -e "SHOW TABLES;"
```

Phải thấy các bảng: users, contracts, contract_templates, etc.

---

## Cách 2: Dùng MySQL Workbench (Giao diện)

### Bước 1: Tạo Connection mới
1. Mở **MySQL Workbench**
2. Click **"+"** (New Connection)
3. Nhập thông tin từ Railway:
   - Connection Name: `Railway - TDT eContract`
   - Hostname: `<MYSQLHOST>`
   - Port: `<MYSQLPORT>`
   - Username: `<MYSQLUSER>`
   - Password: Click **Store in Keychain** → Nhập `<MYSQLPASSWORD>`
4. **Test Connection** → **OK**

### Bước 2: Import Database
1. Double-click connection vừa tạo
2. Menu **Server** → **Data Import**
3. Chọn **"Import from Self-Contained File"**
4. Browse tới: `backend/database_export_full.sql`
5. **Default Target Schema**: Chọn `railway` (hoặc database name từ Railway)
6. Click **"Start Import"**
7. Đợi import xong

### Bước 3: Verify
1. Refresh schema
2. Xem tables đã có đầy đủ chưa

---

## Cách 3: Dùng Railway CLI (Nếu login được)

```powershell
cd backend
railway link
railway run mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < database_export_full.sql
```

---

## ✅ Sau khi import xong:

1. **Backend trên Railway sẽ tự động restart**
2. **Kiểm tra logs** trên Railway:
   - Phải thấy: `✅ Successfully connected to TDT eContract database`

3. **Test API Health Check**:
   - Vào Railway → Backend service → **Settings** → **Networking**
   - Click **"Generate Domain"** (nếu chưa có)
   - Truy cập: `https://your-backend.up.railway.app/api/health`
   - Phải trả về: 
   ```json
   {
     "status": "healthy",
     "database": "connected"
   }
   ```

---

## 🔗 Cuối cùng: Kết nối Frontend với Backend

### Bước 1: Lấy Backend URL
Copy domain từ Railway (ví dụ: `https://giaiphapcntt-production.up.railway.app`)

### Bước 2: Cập nhật Vercel
1. Vào **Vercel Dashboard** → Project → **Settings** → **Environment Variables**
2. Thêm/sửa:
   ```
   Name: VITE_API_URL
   Value: https://giaiphapcntt-production.up.railway.app
   ```
3. **Save**

### Bước 3: Redeploy Frontend
1. Tab **Deployments**
2. Click **⋮** (3 dots) → **Redeploy**
3. Đợi deploy xong

### Bước 4: Test
1. Mở app Vercel: `https://your-app.vercel.app`
2. Thử đăng ký/đăng nhập
3. Kiểm tra Network tab → Request gửi tới Railway backend ✓

---

## 🎉 Hoàn tất!

Bây giờ:
- ✅ Frontend trên Vercel
- ✅ Backend trên Railway
- ✅ Database trên Railway MySQL
- ✅ Tất cả kết nối với nhau!
