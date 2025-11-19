import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Loader2,
  ArrowLeft,
  Building,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  Users,
  Briefcase,
  Clock,
  Award,
  Camera,
  Facebook,
  Linkedin,
  Globe,
  X
} from 'lucide-react';

import { API_BASE_URL } from '../config/api';

function AdminRecruiterProfilePage() {
  const { recruiterId } = useParams();
  const { token, loading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [recruiter, setRecruiter] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/login', { replace: true });
      } else {
        fetchRecruiterProfile();
      }
    }
  }, [loading, isAuthenticated, user, token, navigate, recruiterId]);

  const fetchRecruiterProfile = async () => {
    setDataLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/recruiters/${recruiterId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecruiter(response.data.recruiter);
    } catch (err) {
      console.error('Error fetching recruiter profile:', err.response || err);
      setError(err.response?.data?.message || 'Không thể tải thông tin nhà tuyển dụng.');
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Quay lại Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recruiter) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold overflow-hidden border-4 border-white/50">
                  {recruiter.avatar ? (
                    <img src={recruiter.avatar} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    (recruiter.companyName || recruiter.name)?.charAt(0).toUpperCase() || '?'
                  )}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2">{recruiter.companyName || recruiter.name}</h1>
                <div className="space-y-1 text-indigo-100">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" /> {recruiter.email}
                  </p>
                  {recruiter.phone && (
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <Phone className="w-4 h-4" /> {recruiter.phone}
                    </p>
                  )}
                  {recruiter.location && (
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <MapPin className="w-4 h-4" /> {recruiter.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Ảnh công ty */}
            {recruiter.companyImages && recruiter.companyImages.length > 0 && (
              <div className="profile-section">
                <h3 className="section-title">
                  <Camera size={18} /> Ảnh công ty ({recruiter.companyImages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recruiter.companyImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Company ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 hover:border-indigo-500 transition-colors"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-lg">
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thông tin cơ bản */}
            <div className="profile-section">
              <h3 className="section-title">
                <Building size={18} /> Thông tin công ty
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recruiter.companyIndustry && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Briefcase size={16} /> Lĩnh vực
                    </p>
                    <p className="font-medium text-gray-900">{recruiter.companyIndustry}</p>
                  </div>
                )}
                {recruiter.companySize && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Users size={16} /> Quy mô
                    </p>
                    <p className="font-medium text-gray-900">{recruiter.companySize}</p>
                  </div>
                )}
                {recruiter.companyFoundedYear && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Calendar size={16} /> Năm thành lập
                    </p>
                    <p className="font-medium text-gray-900">{recruiter.companyFoundedYear}</p>
                  </div>
                )}
                {recruiter.companyWorkingHours && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Clock size={16} /> Giờ làm việc
                    </p>
                    <p className="font-medium text-gray-900">{recruiter.companyWorkingHours}</p>
                  </div>
                )}
                {recruiter.companyAddress && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <MapPin size={16} /> Địa chỉ
                    </p>
                    <p className="font-medium text-gray-900">{recruiter.companyAddress}</p>
                  </div>
                )}
                {recruiter.companyWebsite && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Globe size={16} /> Website
                    </p>
                    <a
                      href={recruiter.companyWebsite.startsWith('http') ? recruiter.companyWebsite : `https://${recruiter.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      {recruiter.companyWebsite}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                {recruiter.companyFacebook && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Facebook size={16} /> Facebook
                    </p>
                    <a
                      href={recruiter.companyFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      {recruiter.companyFacebook}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                {recruiter.companyLinkedIn && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Linkedin size={16} /> LinkedIn
                    </p>
                    <a
                      href={recruiter.companyLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      {recruiter.companyLinkedIn}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Giới thiệu công ty */}
            {recruiter.companyDescription && (
              <div className="profile-section">
                <h3 className="section-title">
                  <Building size={18} /> Giới thiệu công ty
                </h3>
                <p className="section-content whitespace-pre-line">{recruiter.companyDescription}</p>
              </div>
            )}

            {/* Văn hóa công ty */}
            {recruiter.companyCulture && (
              <div className="profile-section">
                <h3 className="section-title">
                  <Award size={18} /> Văn hóa công ty
                </h3>
                <p className="section-content whitespace-pre-line">{recruiter.companyCulture}</p>
              </div>
            )}

            {/* Thông tin tài khoản */}
            <div className="profile-section">
              <h3 className="section-title">Thông tin tài khoản</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tên người dùng</p>
                  <p className="font-medium">{recruiter.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{recruiter.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ngày tạo tài khoản</p>
                  <p className="font-medium">
                    {new Date(recruiter.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Cập nhật lần cuối</p>
                  <p className="font-medium">
                    {new Date(recruiter.updatedAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] max-w-full rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .profile-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e5e7eb;
        }
        .section-content {
          color: #4b5563;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default AdminRecruiterProfilePage;

