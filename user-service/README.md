# User Service

Microservice quản lý thông tin người dùng cho English-RPG.

## Cấu trúc thư mục
- `src/controllers/`: Xử lý logic request/response
- `src/models/`: Định nghĩa model dữ liệu
- `src/routes/`: Định nghĩa endpoint API
- `src/services/`: Xử lý nghiệp vụ
- `src/utils/`: Tiện ích dùng chung
- `src/app.ts`: Khởi tạo app Express
- `src/server.ts`: Chạy server

## Khởi động
```bash
npm install
npm run dev
```

API mẫu: `GET /api/users` trả về danh sách user mẫu.
