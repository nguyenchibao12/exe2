# 🎯 CÁC BƯỚC TIẾP THEO ĐỂ DEPLOY

## ✅ ĐÃ HOÀN THÀNH
- [x] Code đã được chuẩn bị sẵn sàng deploy
- [x] API URL đã được cấu hình động
- [x] CORS đã được cấu hình
- [x] File hướng dẫn deploy đã được tạo

## 📋 CHECKLIST BẮT ĐẦU DEPLOY

### BƯỚC 1: CHUẨN BỊ DATABASE (15 phút)

#### 1.1. Tạo MongoDB Atlas Account
- [ ] Truy cập: https://www.mongodb.com/cloud/atlas/register
- [ ] Đăng ký tài khoản (dùng email/GitHub)
- [ ] Chọn plan **FREE** (M0 Sandbox)

#### 1.2. Tạo Cluster
- [ ] Chọn cloud provider: **AWS** hoặc **Google Cloud**
- [ ] Chọn region gần nhất (ví dụ: Singapore)
- [ ] Click **Create Cluster** (mất 3-5 phút)

#### 1.3. Cấu hình Database Access
- [ ] Vào **Database Access** (menu bên trái)
- [ ] Click **Add New Database User**
- [ ] Chọn **Password** authentication
- [ ] Tạo username và password (LƯU LẠI!)
- [ ] Chọn **Read and write to any database**
- [ ] Click **Add User**

#### 1.4. Cấu hình Network Access
- [ ] Vào **Network Access** (menu bên trái)
- [ ] Click **Add IP Address**
- [ ] Chọn **Allow Access from Anywhere** (0.0.0.0/0) - cho demo
- [ ] Click **Confirm**

#### 1.5. Lấy Connection String
- [ ] Vào **Database** → Click **Connect**
- [ ] Chọn **Connect your application**
- [ ] Copy connection string, ví dụ:
  ```
  mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- [ ] Thay `<password>` bằng password bạn vừa tạo
- [ ] Thêm database name vào cuối: `?retryWrites=true&w=majority` → `studentwork?retryWrites=true&w=majority`

**Kết quả:** Bạn có connection string dạng:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority
```

---

### BƯỚC 2: CHUẨN BỊ CLOUDINARY (10 phút)

#### 2.1. Tạo Cloudinary Account
- [ ] Truy cập: https://cloudinary.com/users/register/free
- [ ] Đăng ký tài khoản miễn phí
- [ ] Xác nhận email

#### 2.2. Lấy Credentials
- [ ] Vào **Dashboard**
- [ ] Copy 3 thông tin sau (LƯU LẠI!):
  - **Cloud Name**: `xxxxx`
  - **API Key**: `123456789012345`
  - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

---

### BƯỚC 3: DEPLOY BACKEND LÊN RAILWAY (20 phút)

#### 3.1. Tạo Railway Account
- [ ] Truy cập: https://railway.app
- [ ] Click **Login with GitHub**
- [ ] Authorize Railway

#### 3.2. Tạo Project mới
- [ ] Click **New Project**
- [ ] Chọn **Deploy from GitHub repo**
- [ ] Chọn repository của bạn
- [ ] Railway sẽ tự detect Node.js

#### 3.3. Cấu hình Deployment
- [ ] Vào **Settings** → **Root Directory**: `server`
- [ ] Vào **Settings** → **Start Command**: `npm start`
- [ ] Railway sẽ tự động build và deploy

#### 3.4. Thêm Environment Variables
- [ ] Vào tab **Variables**
- [ ] Thêm từng biến sau:

```
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority
```

```
JWT_SECRET = your_super_secret_jwt_key_min_32_characters_123456789
```

```
CLOUDINARY_CLOUD_NAME = xxxxx
```

```
CLOUDINARY_API_KEY = 123456789012345
```

```
CLOUDINARY_API_SECRET = abcdefghijklmnopqrstuvwxyz
```

```
PORT = 5000
```

```
FRONTEND_URL = http://localhost:5173
```
*(Cập nhật sau khi deploy frontend)*

#### 3.5. Lấy Backend URL
- [ ] Vào **Settings** → **Domains**
- [ ] Railway tự tạo domain: `https://your-app-name.up.railway.app`
- [ ] Copy URL này (cần cho bước tiếp theo)

**Kết quả:** Backend đã chạy tại: `https://your-backend.railway.app`

---

### BƯỚC 4: DEPLOY FRONTEND LÊN VERCEL (15 phút)

#### 4.1. Tạo Vercel Account
- [ ] Truy cập: https://vercel.com
- [ ] Click **Sign Up** → Chọn **Continue with GitHub**
- [ ] Authorize Vercel

#### 4.2. Import Project
- [ ] Click **Add New Project**
- [ ] Chọn repository của bạn
- [ ] Vercel sẽ tự detect Vite

#### 4.3. Cấu hình Build
- [ ] **Framework Preset**: Vite (tự động)
- [ ] **Root Directory**: `./` (gốc)
- [ ] **Build Command**: `npm run build` (tự động)
- [ ] **Output Directory**: `dist` (tự động)

#### 4.4. Thêm Environment Variable
- [ ] Scroll xuống **Environment Variables**
- [ ] Thêm:
  - **Name**: `VITE_API_BASE_URL`
  - **Value**: `https://your-backend.railway.app` (URL từ bước 3.5)
- [ ] Click **Add**

#### 4.5. Deploy
- [ ] Click **Deploy**
- [ ] Đợi build (2-3 phút)
- [ ] Vercel sẽ cung cấp URL: `https://your-app.vercel.app`

**Kết quả:** Frontend đã chạy tại: `https://your-frontend.vercel.app`

---

### BƯỚC 5: CẬP NHẬT CORS (5 phút)

#### 5.1. Cập nhật Backend Environment Variable
- [ ] Vào Railway → Project → **Variables**
- [ ] Tìm `FRONTEND_URL`
- [ ] Cập nhật giá trị = `https://your-app.vercel.app` (URL từ bước 4.5)
- [ ] Railway sẽ tự động restart

#### 5.2. Kiểm tra
- [ ] Mở frontend URL
- [ ] Mở Developer Tools (F12) → Console
- [ ] Thử đăng ký/đăng nhập
- [ ] Kiểm tra không có lỗi CORS

---

### BƯỚC 6: TEST TOÀN BỘ TÍNH NĂNG (15 phút)

#### 6.1. Test Student Flow
- [ ] Đăng ký tài khoản Student
- [ ] Đăng nhập
- [ ] Tìm kiếm công việc
- [ ] Lưu công việc
- [ ] Ứng tuyển công việc
- [ ] Xem đơn ứng tuyển
- [ ] Cập nhật profile

#### 6.2. Test Recruiter Flow
- [ ] Đăng ký tài khoản Recruiter
- [ ] Đăng nhập
- [ ] Đăng tin tuyển dụng
- [ ] Chọn gói thanh toán
- [ ] Upload biên lai (test với ảnh mẫu)
- [ ] Xem dashboard
- [ ] Xem ứng viên

#### 6.3. Test Admin Flow
- [ ] Tạo admin account trong database (hoặc dùng account có sẵn)
- [ ] Đăng nhập admin
- [ ] Duyệt tin tuyển dụng
- [ ] Xem lịch sử giao dịch
- [ ] Duyệt blog
- [ ] Xem profile nhà tuyển dụng

---

## 🎯 BẮT ĐẦU NGAY

**Bước đầu tiên:** Tạo MongoDB Atlas account → https://www.mongodb.com/cloud/atlas/register

Sau khi hoàn thành từng bước, đánh dấu ✅ vào checklist trên.

---

## ❓ NẾU GẶP LỖI

### Lỗi kết nối Database:
- Kiểm tra connection string đúng format
- Kiểm tra Network Access đã cho phép IP
- Kiểm tra username/password đúng

### Lỗi CORS:
- Kiểm tra `FRONTEND_URL` trong backend = đúng URL frontend
- Kiểm tra có `https://` ở đầu URL

### Lỗi build Frontend:
- Kiểm tra `VITE_API_BASE_URL` đã được thêm vào Vercel
- Rebuild lại project

### Lỗi upload ảnh:
- Kiểm tra Cloudinary credentials đúng
- Kiểm tra Cloudinary account còn active

---

## 📞 CẦN HỖ TRỢ?

Xem file `DEPLOY_GUIDE.md` để có hướng dẫn chi tiết hơn.

---

**Chúc bạn deploy thành công! 🚀**

