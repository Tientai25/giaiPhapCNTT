# TDT eContract Backend API

Backend API cho hệ thống Hợp đồng điện tử TDT eContract

## Cấu trúc thư mục

```
backend/
├── config/              # Cấu hình
│   ├── db.config.js    # Database connection
│   └── .env.example    # Environment variables template
├── controllers/         # Business logic
│   └── authController.js
├── middleware/          # Middleware functions
│   └── authMiddleware.js
├── routes/             # API routes
│   ├── authRoutes.js
│   ├── contractRoutes.js
│   ├── templateRoutes.js
│   └── userRoutes.js
├── models/             # Database models (future)
├── server.js           # Entry point
├── package.json
├── README.md
├── schema.sql          # Database schema
└── sample_data.sql     # Sample data
```

## Cài đặt

```bash
cd backend
npm install
```

## Chạy server

```bash
# Development
npm start

# hoặc
node server.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Xem profile (protected)

### Users
- `GET /api/users` - Danh sách users (admin only)

### Contracts
- `GET /api/contracts` - Danh sách hợp đồng (protected)
- `GET /api/contracts/:id` - Chi tiết hợp đồng (protected)

### Templates
- `GET /api/templates` - Danh sách mẫu hợp đồng (public)

### System
- `GET /` - Server info
- `GET /api/health` - Health check

## Authentication

Sử dụng JWT Bearer Token trong header:

```
Authorization: Bearer <your_token_here>
```

## Database

MySQL Database: `tdt_econtract`

Import schema và data:
```bash
mysql -u giaiphapcntt -p < schema.sql
mysql -u giaiphapcntt -p < sample_data.sql
```

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MySQL2** - Database driver
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
