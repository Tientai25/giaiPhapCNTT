# Hướng dẫn Deploy Full-stack Application

## 🔴 VẤN ĐỀ HIỆN TẠI

Bạn đã deploy **Frontend** lên **Vercel**, nhưng **Backend** và **Database** đang chạy ở **local** (máy tính của bạn). 

❌ **Vercel không thể kết nối tới `localhost:3000` của máy bạn!**

## ✅ GIẢI PHÁP

Bạn cần deploy Backend lên một nền tảng cloud. Dưới đây là các bước chi tiết:

---

## BƯỚC 1: Deploy Backend lên Cloud

### Tùy chọn A: Railway (Khuyên dùng - Dễ nhất)

1. **Đăng ký tài khoản**: https://railway.app/
2. **Tạo project mới**
3. **Deploy từ GitHub**:
   - Push code backend lên GitHub repository
   - Kết nối Railway với GitHub repo
   - Railway sẽ tự động deploy
4. **Thêm Database MySQL**:
   - Click "New" → "Database" → "Add MySQL"
   - Railway sẽ cung cấp connection string
5. **Cấu hình Environment Variables**:
   ```
   DB_HOST=<railway-mysql-host>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=<railway-mysql-database>
   DB_PORT=3306
   PORT=3000
   ```
6. **Lấy URL Backend**: Ví dụ `https://your-app.railway.app`

### Tùy chọn B: Render (Miễn phí)

1. **Đăng ký**: https://render.com/
2. **Tạo Web Service**:
   - Connect GitHub repository
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
3. **Tạo MySQL Database** (hoặc dùng external như PlanetScale)
4. **Cấu hình Environment Variables** tương tự Railway
5. **Lấy URL**: Ví dụ `https://your-app.onrender.com`

### Tùy chọn C: Vercel Serverless Functions

1. **Tạo file** `api/index.js` trong root project:
   ```javascript
   const app = require('../backend/server.js');
   module.exports = app;
   ```
2. **Cấu hình** `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/index.js"
       }
     ]
   }
   ```
3. **Deploy**: API sẽ có cùng domain với frontend

---

## BƯỚC 2: Cấu hình Frontend trên Vercel

1. **Vào Vercel Dashboard** → Project của bạn → Settings → Environment Variables

2. **Thêm biến môi trường**:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
   - Thay `https://your-backend-url.com` bằng URL backend đã deploy ở Bước 1

3. **Redeploy Frontend**:
   - Deployments → Latest → Redeploy
   - Hoặc push code mới lên GitHub để trigger auto-deploy

---

## BƯỚC 3: Kiểm tra Database

### Import Database lên Cloud

1. **Export database local**:
   ```bash
   mysqldump -u root -p tdt_econtract > database_backup.sql
   ```

2. **Import vào database cloud**:
   - **Railway**: Sử dụng MySQL client kết nối và import
     ```bash
     mysql -h <railway-host> -u <user> -p<password> <database> < database_backup.sql
     ```
   - **PlanetScale**: Upload qua dashboard
   - **Render**: Sử dụng connection string để import

---

## BƯỚC 4: Test Ứng Dụng

1. Truy cập frontend trên Vercel: `https://your-app.vercel.app`
2. Thử đăng ký/đăng nhập
3. Kiểm tra Network tab trong DevTools:
   - Request phải gửi tới backend URL cloud
   - Response trả về thành công

---

## 📝 Checklist Hoàn Thành

- [ ] Backend đã deploy lên cloud platform
- [ ] Database đã deploy/import xong
- [ ] Đã cấu hình VITE_API_URL trên Vercel
- [ ] Đã redeploy frontend
- [ ] Test đăng ký/đăng nhập thành công

---

## 🚀 GIẢI PHÁP TẠM THỜI (Chỉ để Test)

Nếu muốn test nhanh mà chưa deploy backend:

1. **Cài ngrok**: https://ngrok.com/
2. **Chạy backend local**: `npm start` trong folder backend
3. **Expose backend ra internet**:
   ```bash
   ngrok http 3000
   ```
4. **Copy URL** (ví dụ: `https://abc123.ngrok.io`)
5. **Update VITE_API_URL** trên Vercel với URL ngrok
6. **Redeploy frontend**

⚠️ **Lưu ý**: Ngrok URL sẽ thay đổi mỗi lần restart, không dùng cho production!

---

## ❓ Câu Hỏi Thường Gặp

**Q: Tại sao không thể dùng localhost?**
A: Vercel chạy trên cloud, "localhost" của Vercel không phải là máy tính của bạn.

**Q: Deploy backend mất phí không?**
A: Railway, Render, Vercel đều có plan miễn phí đủ dùng cho project nhỏ.

**Q: Database host nào tốt?**
A: PlanetScale (MySQL), Supabase (PostgreSQL), Railway (nhiều loại) đều tốt và có plan free.

---

## 📞 Cần Hỗ Trợ Thêm?

Nếu bạn cần hỗ trợ deploy cụ thể cho platform nào, hãy cho tôi biết!
