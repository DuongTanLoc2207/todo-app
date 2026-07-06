# Todo List App

Ứng dụng quản lý công việc (Todo List) hỗ trợ đầy đủ thao tác CRUD, tìm kiếm, lọc, sắp xếp và phân trang. Dự án được xây dựng theo mô hình **MERN stack** (MongoDB, Express, React, Node.js) như một bài test dành cho vị trí Intern Developer.

## Demo Online

| Thành phần | Link |
|---|---|
| Frontend | https://todo-frontend-eta-drab.vercel.app |
| Backend API | https://todo-backend-gkoy.onrender.com |

> **Lưu ý:** Backend được deploy trên Render free tier, sẽ tự "ngủ" (sleep) sau 15 phút không có request. Lần gọi API đầu tiên sau khi ngủ có thể mất khoảng 30-60 giây để server khởi động lại, các lần sau sẽ phản hồi bình thường.

## Tính năng

- Thêm mới, xem danh sách, cập nhật, xóa công việc (CRUD đầy đủ)
- Đánh dấu công việc hoàn thành / chưa hoàn thành
- Tìm kiếm công việc theo tiêu đề
- Lọc danh sách theo trạng thái (pending / completed)
- Sắp xếp danh sách công việc theo thời gian tạo (mới nhất / cũ nhất trước)
- Phân trang danh sách công việc
- Giao diện responsive, tối ưu cho cả desktop và mobile

## Tech Stack

**Backend**
- Node.js, Express
- MongoDB Atlas, Mongoose

**Frontend**
- React, Vite
- MUI (Material UI)
- Axios

**Testing**
- Jest, Supertest, mongodb-memory-server

**DevOps**
- Docker (backend)
- Deploy: Render (backend) + Vercel (frontend)

## Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # Kết nối MongoDB
│   ├── controllers/
│   │   └── todo.controller.js # Xử lý logic CRUD
│   ├── models/
│   │   └── Todo.js            # Schema Mongoose
│   ├── routes/
│   │   └── todo.routes.js     # Định nghĩa API routes
│   ├── tests/
│   │   └── todo.test.js       # Unit test API
│   ├── app.js                 # Khởi tạo Express app (dùng để test)
│   └── server.js              # Entry point, kết nối DB và lắng nghe port
├── Dockerfile
└── package.json
```

```
frontend/
├── src/
│   ├── assets/                # Hình ảnh, icon tĩnh
│   ├── components/
│   │   ├── FilterBar.jsx      # Thanh tìm kiếm, lọc, sắp xếp
│   │   ├── PaginationControl.jsx
│   │   ├── TodoForm.jsx       # Form thêm/sửa todo
│   │   ├── TodoItem.jsx       # Một dòng công việc
│   │   └── TodoList.jsx       # Danh sách công việc
│   ├── services/
│   │   └── todoApi.js         # Gọi API bằng Axios
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.js               # Custom theme cho MUI
└── package.json
```

## Hướng dẫn cài đặt và chạy local

### Yêu cầu

- Node.js >= 18
- Tài khoản MongoDB Atlas (hoặc MongoDB cài đặt local)

> Nếu chưa có MongoDB Atlas, có thể tạo miễn phí tại https://mongodb.com/cloud/atlas (tier M0).

Các bước lấy MongoDB Atlas connection string:

1. Đăng ký tài khoản miễn phí tại https://mongodb.com/cloud/atlas
2. Tạo 1 cluster mới, chọn Free Tier (M0)
3. Vào Database Access → Add New Database User, chọn "Autogenerate Secure Password", role "Read and write to any database" - lưu lại username/password
4. Vào Network Access → Add IP Address → chọn "Allow Access from Anywhere" (0.0.0.0/0)
5. Vào Database (Overview cluster) → bấm Connect → chọn Drivers → Node.js → copy connection string dạng mongodb+srv://...
6. Thay `<username>`, `<password>` trong chuỗi vừa copy bằng thông tin đã tạo ở bước 3, thêm tên database vào sau `.net/` (ví dụ `.net/todoapp?...`)

### 1. Clone repo

```bash
git clone https://github.com/DuongTanLoc2207/todo-app.git
cd todo-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` với nội dung:

```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

Chạy server ở chế độ development:

```bash
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`.

> **Lưu ý:** Phải chạy Backend trước, đợi thấy log `MongoDB connected successfully` và `Server running on port 5000` rồi mới chạy Frontend.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Tạo file `.env` trong thư mục `frontend/` với nội dung:

```env
VITE_API_URL=http://localhost:5000/api/todos
```

> Giá trị PORT trong `VITE_API_URL` phải khớp với `PORT` đã cấu hình ở `backend/.env`.

Chạy frontend:

```bash
npm run dev
```

### 4. Truy cập ứng dụng

Mở trình duyệt tại: **http://localhost:5173**

### Xác nhận đã chạy đúng

- Backend: log hiện đúng 2 dòng `MongoDB connected successfully` và `Server running on port 5000`.
- Frontend: giao diện "Quản lý công việc" hiển thị bình thường, không báo lỗi kết nối tới API.

## Chạy bằng Docker (Backend)

Đảm bảo đã có file `.env` trong thư mục `backend/` (xem hướng dẫn ở trên), sau đó:

```bash
cd backend
docker build -t todo-backend .
docker run -d --name todo-backend --env-file .env -p 5000:5000 todo-backend
```

Backend container sẽ chạy tại `http://localhost:5000`.

## Chạy Unit Test

```bash
cd backend
npm test
```

Bộ test sử dụng **mongodb-memory-server** để khởi tạo một MongoDB instance tạm thời trong bộ nhớ, hoàn toàn độc lập với `MONGO_URI` thật. Vì vậy, việc chạy test **không ảnh hưởng** đến dữ liệu trên MongoDB Atlas.

## API Endpoints

Base URL: `/api/todos`

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/todos` | Lấy danh sách todo, hỗ trợ query `status`, `search`, `page`, `limit`, `sortBy`, `sortOrder` |
| POST | `/api/todos` | Tạo mới một todo |
| PUT | `/api/todos/:id` | Cập nhật tiêu đề/mô tả của một todo |
| PATCH | `/api/todos/:id/status` | Cập nhật trạng thái (`pending` / `completed`) của một todo |
| DELETE | `/api/todos/:id` | Xóa một todo |

## Ghi chú thêm

- **Tách `app.js` và `server.js`**: `app.js` chỉ khởi tạo Express app và export ra ngoài (không gọi `listen`), còn `server.js` chịu trách nhiệm kết nối MongoDB và lắng nghe port. Cách tách này giúp Supertest có thể import trực tiếp `app.js` để test API mà không cần mở port thật hay kết nối MongoDB thật.
- **Custom MUI theme**: giao diện sử dụng theme MUI tùy chỉnh (`frontend/src/theme.js`) với bảng màu, bo góc, typography riêng để tạo phong cách nhất quán thay vì dùng theme mặc định.
- **Responsive design**: layout được xây dựng dựa trên hệ thống Grid/Flexbox của MUI, tự động điều chỉnh theo kích thước màn hình từ mobile đến desktop.
- **Validate dữ liệu**: các trường bắt buộc (như `title`) và giá trị `status` hợp lệ được kiểm tra ở cả tầng model (Mongoose schema) lẫn tầng controller trước khi thao tác với database.
