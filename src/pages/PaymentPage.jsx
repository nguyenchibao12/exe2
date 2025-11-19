import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Upload, Image as ImageIcon, CheckCircle, AlertTriangle, Loader2, ArrowLeft, CreditCard, Building } from 'lucide-react';

import { API_BASE_URL } from '../config/api';

function PaymentPage() {
  const { jobId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [packageType, setPackageType] = useState('1month'); // '1month' hoặc '3months'
  const [paymentProof, setPaymentProof] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);

  // Tính toán số tiền và duration dựa trên packageType
  const packageInfo = {
    '1month': { amount: 150000, duration: 1, label: '1 tháng' },
    '3months': { amount: 400000, duration: 3, label: '3 tháng' }
  };

  const selectedPackage = packageInfo[packageType];

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File quá lớn! Vui lòng chọn ảnh dưới 5MB.');
      return;
    }

    setError(null);

    // Đọc file thành base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPaymentProof(base64String);
      setPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Upload biên lai
  const handleUpload = async () => {
    if (!paymentProof) {
      setError('Vui lòng chọn ảnh biên lai chuyển khoản!');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      console.log(`📤 Uploading payment proof for job ${jobId}...`);
      
      const response = await axios.put(
        `${API_BASE_URL}/api/jobs/${jobId}/payment`,
        { 
          paymentProof,
          packageType,
          paymentAmount: selectedPackage.amount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ Payment proof uploaded:', response.data);
      setSuccess(true);

      // Redirect sau 3s
      setTimeout(() => {
        navigate('/employer/dashboard');
      }, 3000);

    } catch (err) {
      console.error('❌ Error uploading payment proof:', err);
      setError(err.response?.data?.message || 'Lỗi khi upload biên lai. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upload Thành Công! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Biên lai của bạn đã được gửi đến Admin. Tin tuyển dụng sẽ được duyệt trong vòng 24h.
          </p>
          <div className="text-sm text-gray-500">
            Đang chuyển về Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/employer/dashboard')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại Dashboard
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Thanh Toán</h1>
                <p className="text-indigo-100">Upload biên lai chuyển khoản</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Chọn gói */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Chọn gói đăng tin <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPackageType('1month')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    packageType === '1month'
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900">Gói 1 tháng</h3>
                      {packageType === '1month' && (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mb-1">
                      150,000 VND
                    </p>
                    <p className="text-sm text-gray-600">
                      Tin đăng hiển thị trong 1 tháng
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPackageType('3months')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    packageType === '3months'
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900">Gói 3 tháng</h3>
                      {packageType === '3months' && (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mb-1">
                      400,000 VND
                    </p>
                    <p className="text-sm text-gray-600">
                      Tin đăng hiển thị trong 3 tháng
                    </p>
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Tiết kiệm 50,000 VND
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Thông tin chuyển khoản */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <div className="flex items-start gap-3 mb-4">
                <Building className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    Thông Tin Chuyển Khoản
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Ngân hàng:</span>
                      <span className="text-gray-900">Vietcombank</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Số tài khoản:</span>
                      <span className="text-gray-900 font-mono">1019946644</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Chủ tài khoản:</span>
                      <span className="text-gray-900">NGUYEN CHI BAO</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Gói đăng:</span>
                      <span className="text-gray-900 font-semibold">{selectedPackage.label}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Số tiền:</span>
                      <span className="text-red-600 font-bold text-lg">
                        {selectedPackage.amount.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-semibold text-gray-700">Nội dung:</span>
                      <span className="text-gray-900 font-mono">THANHTOAN {packageType.toUpperCase()} {jobId?.slice(-6)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng nội dung để Admin dễ dàng xác nhận.
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload Biên Lai Chuyển Khoản <span className="text-red-500">*</span>
              </label>
              
              {!preview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium mb-1">
                        Click để chọn ảnh biên lai
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (tối đa 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-xl border-2 border-gray-200 max-h-96 object-contain bg-gray-50"
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setPaymentProof(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-lg"
                  >
                    Xóa ảnh
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            {/* Hướng dẫn */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-indigo-600" />
                Hướng dẫn chụp biên lai:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span>Chụp rõ toàn bộ nội dung biên lai (số tiền, nội dung, thời gian)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span>Ảnh không bị mờ, nghiêng hoặc che khuất</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span>Đảm bảo có đầy đủ thông tin: số tiền, nội dung chuyển khoản</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/employer/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleUpload}
                disabled={!paymentProof || isUploading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang upload...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Xác nhận thanh toán
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;