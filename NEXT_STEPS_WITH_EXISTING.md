# 🎯 CÁC BƯỚC TIẾP THEO - BẠN ĐÃ CÓ DB & CLOUDINARY

## ✅ ĐÃ CÓ SẴN
- [x] MongoDB Database
- [x] Cloudinary Account

## 📋 CHECKLIST DEPLOY (Bỏ qua bước 1 & 2)

### BƯỚC 1: KIỂM TRA THÔNG TIN HIỆN TẠI (5 phút)

#### 1.1. Kiểm tra MongoDB Connection String
- [ ] Tìm file `.env` trong thư mục `server/` (nếu có)
- [ ] Hoặc kiểm tra MongoDB Atlas dashboard để lấy connection string
- [ ] Đảm bảo connection string có format:
  ```
  mongodb+srv://username:password@cluster.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority
  ```
- [ ] **Lưu lại** connection string này (cần cho bước deploy)

#### 1.2. Kiểm tra Cloudinary Credentials
- [ ] Vào Cloudinary Dashboard: https://console.cloudinary.com
- [ ] Copy 3 thông tin sau:
  - **Cloud Name**: `xxxxx`
  - **API Key**: `123456789012345`
  - **API Secret**: `abcdefghijklmnopqrstuvwxyz`
- [ ] **Lưu lại** 3 thông tin này (cần cho bước deploy)

#### 1.3. Tạo JWT Secret (nếu chưa có)
- [ ] Tạo một chuỗi ngẫu nhiên tối thiểu 32 ký tự
- [ ] Ví dụ: `my_super_secret_jwt_key_2025_studentwork_123456789`
- [ ] **Lưu lại** JWT secret này

---

### BƯỚC 2: DEPLOY BACKEND LÊN RAILWAY (20 phút)

#### 2.1. Tạo Railway Account
- [ ] Truy cập: https://railway.app
- [ ] Click **Login with GitHub**
- [ ] Authorize Railway

#### 2.2. Tạo Project mới
- [ ] Click **New Project**
- [ ] Chọn **Deploy from GitHub repo**
- [ ] Chọn repository của bạn
- [ ] Railway sẽ tự detect Node.js

#### 2.3. Cấu hình Deployment
- [ ] Vào **Settings** → Tìm **Root Directory**
- [ ] Đặt: `server`
- [ ] Vào **Settings** → Tìm **Start Command**
- [ ] Đặt: `npm start`
- [ ] Railway sẽ tự động build và deploy

#### 2.4. Thêm Environment Variables
- [ ] Vào tab **Variables** (ở trên cùng)
- [ ] Thêm từng biến sau (click **New Variable** cho mỗi biến):

**1. MongoDB URI:**
```
Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority
```
*(Dùng connection string từ bước 1.1)*

**2. JWT Secret:**
```
Name: JWT_SECRET
Value: my_super_secret_jwt_key_2025_studentwork_123456789
```
*(Dùng JWT secret từ bước 1.3)*

**3. Cloudinary Cloud Name:**
```
Name: CLOUDINARY_CLOUD_NAME
Value: xxxxx
```
*(Dùng Cloud Name từ bước 1.2)*

**4. Cloudinary API Key:**
```
Name: CLOUDINARY_API_KEY
Value: 123456789012345
```
*(Dùng API Key từ bước 1.2)*

**5. Cloudinary API Secret:**
```
Name: CLOUDINARY_API_SECRET
Value: abcdefghijklmnopqrstuvwxyz
```
*(Dùng API Secret từ bước 1.2)*

**6. Port:**
```
Name: PORT
Value: 5000
```

**7. Frontend URL (tạm thời):**
```
Name: FRONTEND_URL
Value: http://localhost:5173
```
*(Sẽ cập nhật sau khi deploy frontend)*

#### 2.5. Lấy Backend URL
- [ ] Vào **Settings** → **Domains**
- [ ] Railway tự tạo domain: `https://your-app-name.up.railway.app`
- [ ] Hoặc xem ở tab **Deployments** → Copy URL
- [ ] **Copy và lưu lại URL này** (cần cho bước tiếp theo)

**Kết quả:** Backend đã chạy tại: `https://your-backend.railway.app`

---

### BƯỚC 3: DEPLOY FRONTEND LÊN VERCEL (15 phút)

#### 3.1. Tạo Vercel Account
- [ ] Truy cập: https://vercel.com
- [ ] Click **Sign Up** → Chọn **Continue with GitHub**
- [ ] Authorize Vercel

#### 3.2. Import Project
- [ ] Click **Add New Project**
- [ ] Chọn repository của bạn
- [ ] Vercel sẽ tự detect Vite

#### 3.3. Cấu hình Build
- [ ] **Framework Preset**: Vite (tự động detect)
- [ ] **Root Directory**: `./` (gốc)
- [ ] **Build Command**: `npm run build` (tự động)
- [ ] **Output Directory**: `dist` (tự động)

#### 3.4. Thêm Environment Variable
- [ ] Scroll xuống phần **Environment Variables**
- [ ] Click **Add** để thêm biến mới:
  - **Name**: `VITE_API_BASE_URL`
  - **Value**: `https://your-backend.railway.app` (URL từ bước 2.5)
- [ ] Click **Add**

#### 3.5. Deploy
- [ ] Click **Deploy** (góc dưới bên phải)
- [ ] Đợi build (2-3 phút)
- [ ] Vercel sẽ cung cấp URL: `https://your-app.vercel.app`
- [ ] **Copy và lưu lại URL này** (cần cho bước tiếp theo)

**Kết quả:** Frontend đã chạy tại: `https://your-frontend.vercel.app`

---

### BƯỚC 4: CẬP NHẬT CORS (5 phút)

#### 4.1. Cập nhật Backend Environment Variable
- [ ] Vào Railway → Project của bạn
- [ ] Vào tab **Variables**
- [ ] Tìm biến `FRONTEND_URL`
- [ ] Click vào biến đó để edit
- [ ] Thay giá trị = `https://your-app.vercel.app` (URL từ bước 3.5)
- [ ] Click **Save**
- [ ] Railway sẽ tự động restart backend

#### 4.2. Kiểm tra kết nối
- [ ] Mở frontend URL trong browser
- [ ] Mở Developer Tools (F12) → Tab **Console**
- [ ] Thử đăng ký hoặc đăng nhập
- [ ] Kiểm tra không có lỗi CORS (không có thông báo đỏ về CORS)

---

### BƯỚC 5: TEST TOÀN BỘ TÍNH NĂNG (15 phút)

#### 5.1. Test Student Flow
- [ ] Đăng ký tài khoản Student
- [ ] Đăng nhập
- [ ] Tìm kiếm công việc
- [ ] Lưu công việc
- [ ] Ứng tuyển công việc
- [ ] Xem đơn ứng tuyển
- [ ] Cập nhật profile

#### 5.2. Test Recruiter Flow
- [ ] Đăng ký tài khoản Recruiter
- [ ] Đăng nhập
- [ ] Đăng tin tuyển dụng
- [ ] Chọn gói thanh toán
- [ ] Upload biên lai (test với ảnh mẫu)
- [ ] Xem dashboard
- [ ] Xem ứng viên

#### 5.3. Test Admin Flow
- [ ] Tạo admin account trong database (hoặc dùng account có sẵn)
- [ ] Đăng nhập admin
- [ ] Duyệt tin tuyển dụng
- [ ] Xem lịch sử giao dịch
- [ ] Duyệt blog
- [ ] Xem profile nhà tuyển dụng

---

## 🎯 BẮT ĐẦU NGAY

**Bước đầu tiên:** Kiểm tra MongoDB connection string và Cloudinary credentials

Sau đó deploy backend lên Railway → https://railway.app

---

## ❓ NẾU GẶP LỖI

### Lỗi kết nối Database:
- Kiểm tra connection string đúng format
- Kiểm tra Network Access trong MongoDB Atlas đã cho phép IP Railway
- Thêm IP `0.0.0.0/0` vào Network Access nếu cần

### Lỗi CORS:
- Kiểm tra `FRONTEND_URL` trong Railway = đúng URL frontend (có `https://`)
- Đảm bảo không có dấu `/` ở cuối URL

### Lỗi upload ảnh:
- Kiểm tra Cloudinary credentials đúng
- Kiểm tra Cloudinary account còn active
- Xem logs trong Railway để debug

### Lỗi build Frontend:
- Kiểm tra `VITE_API_BASE_URL` đã được thêm vào Vercel
- Rebuild lại project trong Vercel

---

## 📝 TÓM TẮT NHANH

1. ✅ Kiểm tra MongoDB connection string
2. ✅ Kiểm tra Cloudinary credentials  
3. 🚀 Deploy Backend lên Railway + thêm env variables
4. 🚀 Deploy Frontend lên Vercel + thêm `VITE_API_BASE_URL`
5. 🔄 Cập nhật `FRONTEND_URL` trong Railway
6. ✅ Test toàn bộ tính năng

---

**Chúc bạn deploy thành công! 🚀**

