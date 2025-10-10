import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Calendar, CheckCircle, CreditCard } from 'lucide-react';

function PostJobPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    logo: '🏢',
    location: '',
    salary: '',
    type: 'Part-time',
    workDays: '',
    workHours: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('momo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Post job with payment:', formData, paymentMethod);
      alert('Đăng tin thành công! Đang chuyển đến trang thanh toán...');
      navigate('/jobs');
    }
  };

  const renderJobInfoForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin công việc</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề công việc *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              placeholder="VD: Content Writer Part-time"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên công ty *
          </label>
          <input
            type="text"
            required
            placeholder="Tên công ty của bạn"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại hình *
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Part-time">Part-time</option>
            <option value="Flexible">Linh động</option>
            <option value="Full-time">Full-time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm làm việc *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              placeholder="VD: Quận 1, HCM"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mức lương *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              placeholder="VD: 80-120k/giờ"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày làm việc *
          </label>
          <input
            type="text"
            required
            placeholder="VD: Thứ 2, 4, 6"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.workDays}
            onChange={(e) => setFormData({ ...formData, workDays: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giờ làm việc *
          </label>
          <input
            type="text"
            required
            placeholder="VD: 14:00-18:00"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.workHours}
            onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả công việc *
        </label>
        <textarea
          required
          rows={5}
          placeholder="Mô tả chi tiết về công việc, trách nhiệm, môi trường làm việc..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Yêu cầu ứng viên *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Mỗi yêu cầu một dòng"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quyền lợi
        </label>
        <textarea
          rows={3}
          placeholder="Các quyền lợi của ứng viên (mỗi quyền lợi một dòng)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email liên hệ *
          </label>
          <input
            type="email"
            required
            placeholder="hr@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại *
          </label>
          <input
            type="tel"
            required
            placeholder="0123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Xem trước tin đăng</h2>
      
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl">
            {formData.logo}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{formData.title}</h3>
            <p className="text-lg text-gray-600 mt-1">{formData.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm">Mức lương</span>
            </div>
            <p className="font-bold text-green-600">{formData.salary}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm">Loại hình</span>
            </div>
            <p className="font-bold text-gray-900">{formData.type}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Địa điểm</span>
            </div>
            <p className="font-bold text-gray-900">{formData.location}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Thời gian</span>
            </div>
            <p className="font-bold text-gray-900">{formData.workDays} • {formData.workHours}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-lg mb-3">Mô tả công việc</h4>
          <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-lg mb-3">Yêu cầu</h4>
          <ul className="space-y-2">
            {formData.requirements.split('\n').filter(r => r.trim()).map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{req.replace(/^-\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>

        {formData.benefits && (
          <div>
            <h4 className="font-bold text-lg mb-3">Quyền lợi</h4>
            <div className="flex flex-wrap gap-2">
              {formData.benefits.split('\n').filter(b => b.trim()).map((benefit, idx) => (
                <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
                  {benefit.replace(/^-\s*/, '')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h2>
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Gói Đăng Tin Cơ Bản</h3>
            <p className="text-gray-600 mt-1">Hiển thị trong 30 ngày</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-indigo-600">199,000đ</p>
            <p className="text-sm text-gray-600">Chỉ ~6,600đ/ngày</p>
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t border-indigo-200">
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Hiển thị trên trang tìm việc 30 ngày</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Nhận CV ứng viên không giới hạn</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Hỗ trợ 24/7</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Thống kê lượt xem & ứng tuyển</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Chọn phương thức thanh toán</h3>
        <div className="space-y-3">
          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'momo' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === 'momo'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-indigo-600"
            />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ví MoMo</p>
                <p className="text-sm text-gray-600">Thanh toán qua ví điện tử MoMo</p>
              </div>
            </div>
          </label>

          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'vnpay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="vnpay"
              checked={paymentMethod === 'vnpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-indigo-600"
            />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">VNPay</p>
                <p className="text-sm text-gray-600">Thẻ ATM/Visa/Mastercard</p>
              </div>
            </div>
          </label>

          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'bank' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-indigo-600"
            />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold">
                🏦
              </div>
              <div>
                <p className="font-semibold text-gray-900">Chuyển khoản ngân hàng</p>
                <p className="text-sm text-gray-600">Chuyển khoản trực tiếp</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {paymentMethod === 'bank' && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-bold mb-4">Thông tin chuyển khoản</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Ngân hàng:</strong> Vietcombank</p>
            <p><strong>Số tài khoản:</strong> 0123456789</p>
            <p><strong>Chủ tài khoản:</strong> CONG TY TNHH STUDENTWORK</p>
            <p><strong>Nội dung:</strong> <span className="text-indigo-600 font-mono">DJOB_{formData.contactPhone}</span></p>
            <p className="text-gray-600 mt-4">* Tin đăng sẽ được duyệt trong vòng 24h sau khi nhận được thanh toán</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Thông tin' },
              { num: 2, label: 'Xem trước' },
              { num: 3, label: 'Thanh toán' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= s.num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step >= s.num ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-1 mx-4 rounded transition-all ${
                    step > s.num ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderJobInfoForm()}
            {step === 2 && renderPreview()}
            {step === 3 && renderPayment()}

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Quay lại
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                {step === 3 ? 'Thanh toán & Đăng tin' : 'Tiếp tục'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJobPage;