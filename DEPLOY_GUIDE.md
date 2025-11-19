# 🚀 HƯỚNG DẪN DEPLOY DỰ ÁN STUDENTWORK

## 📋 TỔNG QUAN

Dự án này gồm 2 phần:
- **Backend**: Node.js + Express + MongoDB (thư mục `server/`)
- **Frontend**: React + Vite (thư mục gốc)

## 🎯 CÁC PHƯƠNG ÁN DEPLOY

### Phương án 1: Deploy miễn phí (Khuyến nghị cho demo)
- **Backend**: Railway / Render / Cyclic
- **Frontend**: Vercel / Netlify
- **Database**: MongoDB Atlas (miễn phí)

### Phương án 2: Deploy VPS (Có phí, nhưng linh hoạt)
- **VPS**: DigitalOcean / AWS EC2 / Linode
- **Database**: MongoDB Atlas hoặc MongoDB trên VPS

---

## 📦 BƯỚC 1: CHUẨN BỊ DATABASE (MongoDB Atlas)

### 1.1. Tạo tài khoản MongoDB Atlas
1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Đăng ký tài khoản miễn phí
3. Tạo cluster miễn phí (M0 Sandbox)

### 1.2. Lấy Connection String
1. Vào **Database Access** → Tạo user mới (username/password)
2. Vào **Network Access** → Thêm IP `0.0.0.0/0` (cho phép mọi IP) hoặc IP cụ thể
3. Vào **Database** → Click **Connect** → Chọn **Connect your application**
4. Copy connection string, ví dụ:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority
   ```

---

## 🔧 BƯỚC 2: CHUẨN BỊ BACKEND

### 2.1. Cập nhật file `.env` trong `server/`

Tạo file `server/.env` với nội dung:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentwork?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters

# Cloudinary (cho upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Port (sẽ được set tự động bởi hosting)
PORT=5000

# CORS (thêm domain frontend của bạn)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 2.2. Cập nhật CORS trong `server/server.js`

Đảm bảo có dòng này:

```javascript
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### 2.3. Kiểm tra `server/package.json`

Đảm bảo có script `start`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🌐 BƯỚC 3: DEPLOY BACKEND LÊN RAILWAY (Miễn phí)

### 3.1. Tạo tài khoản Railway
1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub

### 3.2. Deploy Backend
1. Click **New Project** → **Deploy from GitHub repo**
2. Chọn repository của bạn
3. Railway sẽ tự detect Node.js
4. Cấu hình:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
5. Vào **Variables** → Thêm tất cả biến từ `.env`:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `FRONTEND_URL` (sẽ cập nhật sau khi deploy frontend)
6. Railway sẽ tự động deploy và cung cấp URL, ví dụ: `https://your-app.railway.app`

### 3.3. Lấy Backend URL
- Vào **Settings** → **Domains** → Copy URL
- Hoặc dùng URL tự động: `https://your-app-name.up.railway.app`

---

## 🎨 BƯỚC 4: DEPLOY FRONTEND LÊN VERCEL (Miễn phí)

### 4.1. Cập nhật API URL trong Frontend

Tạo file `.env` ở thư mục gốc:

```env
VITE_API_BASE_URL=https://your-backend.railway.app
```

### 4.2. Cập nhật code để dùng environment variable

Trong các file như `src/pages/*.jsx`, thay:

```javascript
const API_BASE_URL = 'http://localhost:5000';
```

Thành:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

### 4.3. Deploy lên Vercel
1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub
3. Click **Add New Project**
4. Import repository của bạn
5. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (gốc)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Thêm Environment Variable:
   - `VITE_API_BASE_URL` = `https://your-backend.railway.app`
7. Click **Deploy**

### 4.4. Lấy Frontend URL
- Vercel sẽ cung cấp URL: `https://your-app.vercel.app`

---

## 🔄 BƯỚC 5: CẬP NHẬT CORS VÀ FRONTEND_URL

### 5.1. Cập nhật Backend Environment Variables
1. Vào Railway → Project → Variables
2. Cập nhật `FRONTEND_URL` = `https://your-app.vercel.app`
3. Railway sẽ tự động restart

### 5.2. Kiểm tra kết nối
- Mở frontend URL
- Thử đăng ký/đăng nhập
- Kiểm tra console browser xem có lỗi CORS không

---

## 🐳 PHƯƠNG ÁN ALTERNATIVE: DEPLOY LÊN RENDER

### Backend trên Render:
1. Truy cập: https://render.com
2. **New** → **Web Service**
3. Connect GitHub repo
4. Cấu hình:
   - **Name**: `studentwork-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: `server`
5. Thêm Environment Variables (giống Railway)
6. Deploy

### Frontend trên Netlify:
1. Truy cập: https://netlify.com
2. **Add new site** → **Import an existing project**
3. Connect GitHub
4. Cấu hình:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Thêm Environment Variable: `VITE_API_BASE_URL`
6. Deploy

---

## 🔐 BƯỚC 6: CẤU HÌNH CLOUDINARY (Cho upload ảnh)

### 6.1. Tạo tài khoản Cloudinary
1. Truy cập: https://cloudinary.com
2. Đăng ký tài khoản miễn phí
3. Vào **Dashboard** → Copy:
   - Cloud Name
   - API Key
   - API Secret

### 6.2. Thêm vào Environment Variables
- Thêm vào Railway/Render backend environment variables

---

## ✅ BƯỚC 7: KIỂM TRA SAU KHI DEPLOY

### Checklist:
- [ ] Backend API hoạt động: `https://your-backend.railway.app/api/jobs`
- [ ] Frontend load được: `https://your-app.vercel.app`
- [ ] Đăng ký/Đăng nhập hoạt động
- [ ] Upload ảnh hoạt động (Cloudinary)
- [ ] Database kết nối thành công
- [ ] CORS không có lỗi
- [ ] Tất cả routes hoạt động

### Test các tính năng:
1. **Student**: Đăng ký → Tìm việc → Ứng tuyển
2. **Recruiter**: Đăng ký → Đăng tin → Thanh toán
3. **Admin**: Đăng nhập → Duyệt tin → Quản lý blog

---

## 🛠️ TROUBLESHOOTING

### Lỗi CORS:
- Kiểm tra `FRONTEND_URL` trong backend env
- Đảm bảo CORS middleware đúng

### Lỗi kết nối Database:
- Kiểm tra `MONGODB_URI` đúng format
- Kiểm tra Network Access trong MongoDB Atlas (cho phép IP)

### Lỗi 404 trên Frontend:
- Thêm file `vercel.json` (nếu dùng Vercel):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Lỗi Environment Variables:
- Đảm bảo tất cả biến đã được thêm vào hosting platform
- Restart service sau khi thêm biến mới

---

## 📝 FILE CẦN TẠO/CHỈNH SỬA

### 1. `server/.env` (không commit lên Git)
```
MONGODB_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

### 2. `.env` ở root (cho frontend, không commit)
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

### 3. `vercel.json` (nếu dùng Vercel)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 4. Cập nhật tất cả `API_BASE_URL` trong code:
Tìm và thay trong các file:
- `src/pages/*.jsx`
- `src/components/*.jsx`

Thay:
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

Thành:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

---

## 🎯 TÓM TẮT QUY TRÌNH

1. ✅ Tạo MongoDB Atlas cluster
2. ✅ Cấu hình Cloudinary
3. ✅ Deploy Backend lên Railway/Render
4. ✅ Deploy Frontend lên Vercel/Netlify
5. ✅ Cập nhật CORS và environment variables
6. ✅ Test toàn bộ tính năng

---

## 💡 LƯU Ý QUAN TRỌNG

1. **Không commit file `.env`** lên Git
2. **Thêm `.env` vào `.gitignore`**
3. **Backend URL** sẽ thay đổi mỗi lần deploy mới trên Railway (free plan)
4. **MongoDB Atlas** có giới hạn 512MB storage (free tier)
5. **Cloudinary** có giới hạn 25GB storage (free tier)

---

## 🚀 DEPLOY NHANH (TL;DR)

```bash
# 1. Setup MongoDB Atlas
# 2. Setup Cloudinary
# 3. Deploy Backend:
#    - Railway: Connect GitHub → Deploy server/ folder
#    - Add env variables
# 4. Deploy Frontend:
#    - Vercel: Connect GitHub → Deploy root folder
#    - Add VITE_API_BASE_URL
# 5. Update FRONTEND_URL in backend
# 6. Done! 🎉
```

---

**Chúc bạn deploy thành công! 🎉**

