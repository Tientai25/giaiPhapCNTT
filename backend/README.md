# Hướng dẫn cài đặt Database TDT eContract

## Thông tin kết nối MySQL

```
Connection Name: giaiphapcntt
Hostname: localhost
Port: 3306
Username: giaiphapcntt
Password: 0865798099
```

## Các bước cài đặt

### 1. Kết nối MySQL Workbench

1. Mở **MySQL Workbench**
2. Click vào dấu **+** bên cạnh "MySQL Connections"
3. Nhập thông tin:
   - Connection Name: `giaiphapcntt`
   - Hostname: `localhost`
   - Port: `3306`
   - Username: `giaiphapcntt`
4. Click **Store in Vault** và nhập password: `0865798099`
5. Click **Test Connection** để kiểm tra
6. Click **OK** để lưu

### 2. Import Database Schema

```sql
-- Mở file schema.sql trong MySQL Workbench và chạy
-- Hoặc chạy lệnh sau trong terminal:
mysql -u giaiphapcntt -p0865798099 -h localhost < database/schema.sql
```

### 3. Import Sample Data

```sql
-- Mở file sample_data.sql trong MySQL Workbench và chạy
-- Hoặc chạy lệnh sau trong terminal:
mysql -u giaiphapcntt -p0865798099 -h localhost < database/sample_data.sql
```

## Cách import qua MySQL Workbench

1. Kết nối vào database `giaiphapcntt`
2. Click **File** → **Open SQL Script**
3. Chọn file `schema.sql` và click **Execute** (⚡ hoặc Ctrl+Shift+Enter)
4. Sau khi schema xong, mở file `sample_data.sql` và chạy tương tự

## Kiểm tra Database

```sql
-- Kiểm tra database đã tạo
SHOW DATABASES;

-- Chọn database
USE tdt_econtract;

-- Xem các bảng
SHOW TABLES;

-- Kiểm tra dữ liệu mẫu
SELECT * FROM users;
SELECT * FROM contracts;
SELECT * FROM templates;
```

## Cấu trúc Database

### Tables chính:
- **users**: Người dùng hệ thống
- **companies**: Công ty/Tổ chức
- **contracts**: Hợp đồng điện tử
- **contract_signers**: Người ký hợp đồng
- **signatures**: Chữ ký điện tử
- **templates**: Mẫu hợp đồng
- **notifications**: Thông báo
- **subscriptions**: Gói dịch vụ
- **payments**: Lịch sử thanh toán

## Troubleshooting

### Lỗi kết nối
```bash
# Kiểm tra MySQL service đang chạy
# Windows:
net start MySQL80

# Kiểm tra port
netstat -ano | findstr :3306
```

### Lỗi quyền truy cập
```sql
-- Tạo user mới nếu chưa có
CREATE USER 'giaiphapcntt'@'localhost' IDENTIFIED BY '0865798099';
GRANT ALL PRIVILEGES ON tdt_econtract.* TO 'giaiphapcntt'@'localhost';
FLUSH PRIVILEGES;
```

## Backend Connection String

### Node.js (MySQL2)
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'giaiphapcntt',
  password: '0865798099',
  database: 'tdt_econtract'
});
```

### Python (PyMySQL)
```python
import pymysql

connection = pymysql.connect(
    host='localhost',
    port=3306,
    user='giaiphapcntt',
    password='0865798099',
    database='tdt_econtract'
)
```

### PHP (PDO)
```php
$pdo = new PDO(
    'mysql:host=localhost;port=3306;dbname=tdt_econtract',
    'giaiphapcntt',
    '0865798099'
);
```

## Lưu ý bảo mật

⚠️ **Không commit password vào Git!**

Sử dụng file `.env` để lưu thông tin nhạy cảm:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=giaiphapcntt
DB_PASSWORD=0865798099
DB_NAME=tdt_econtract
```

Thêm `.env` vào `.gitignore`
