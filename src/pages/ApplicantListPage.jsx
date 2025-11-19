import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Loader2, User, FileText, Mail, Phone, MapPin, Award, Eye } from "lucide-react";

import { API_BASE_URL } from '../config/api';

// Helper function để hiển thị status
const getStatusClasses = (status) => {
  switch (status) {
    case "Submitted":
      return "bg-blue-100 text-blue-700";
    case "Viewed":
      return "bg-purple-100 text-purple-700";
    case "Shortlisted":
      return "bg-yellow-100 text-yellow-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "Interviewing":
      return "bg-orange-100 text-orange-700";
    case "Hired":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusText = (status) => {
  const statusMap = {
    'Submitted': 'Đã nộp',
    'Viewed': 'Đã xem',
    'Shortlisted': 'Lọt vòng',
    'Rejected': 'Từ chối',
    'Interviewing': 'Phỏng vấn',
    'Hired': 'Đã tuyển'
  };
  return statusMap[status] || status;
};

function ApplicantListPage() {
  const { jobId } = useParams();
  const { user, token, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API lấy danh sách ứng viên cho job này
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setDataLoading(true);
        console.log(`📋 Fetching applicants for job: ${jobId}`);
        
        const response = await axios.get(
          `${API_BASE_URL}/api/applications/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        console.log('✅ Applications received:', response.data);
        setApplications(response.data || []);
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
        setError(err.response?.data?.message || "Không thể tải danh sách ứng viên.");
      } finally {
        setDataLoading(false);
      }
    };

    if (!loading && isAuthenticated && user?.role === "recruiter") {
      fetchApplicants();
    } else if (!loading && (!isAuthenticated || user?.role !== "recruiter")) {
      navigate("/login", { replace: true });
    }
  }, [jobId, token, isAuthenticated, loading, user, navigate]);

  // Cập nhật trạng thái ứng tuyển
  const updateStatus = async (applicationId, newStatus) => {
    try {
      console.log(`🔄 Updating application ${applicationId} to ${newStatus}`);
      
      await axios.put(
        `${API_BASE_URL}/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Cập nhật ngay trên UI
      setApplications((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status: newStatus } : a
        )
      );
      
      console.log('✅ Status updated successfully');
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert(err.response?.data?.message || "Cập nhật trạng thái thất bại.");
    }
  };

  // Loading state
  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="ml-3 text-gray-600">Đang tải danh sách ứng viên...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">{error}</div>
          <button 
            onClick={() => navigate('/employer/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Quay lại Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/employer/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Quay lại Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 pb-4 border-b border-gray-200">
            Danh Sách Ứng Viên ({applications.length})
          </h1>
        </div>

        {/* Applications List */}
        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Header: Tên + Status */}
                <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                      <User size={20} className="text-indigo-600" /> 
                      {app.student?.name || "Không rõ tên"}
                    </h2>
                    
                    {/* Contact Info */}
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        {app.student?.email || "Không có email"}
                      </p>
                      {app.student?.phone && (
                        <p className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          {app.student.phone}
                        </p>
                      )}
                      {app.student?.location && (
                        <p className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400" />
                          {app.student.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClasses(
                      app.status
                    )}`}
                  >
                    {getStatusText(app.status)}
                  </span>
                </div>

                {/* About */}
                {app.student?.about && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      "{app.student.about}"
                    </p>
                  </div>
                )}

                {/* Skills */}
                {app.student?.skills && app.student.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                      <Award size={14} /> Kỹ năng:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {app.student.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cover Letter */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    Thư ứng tuyển:
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {app.coverLetter || <span className="italic text-gray-400">Không có thư ứng tuyển</span>}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-3">Cập nhật trạng thái:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(app._id, "Viewed")}
                      disabled={app.status === "Viewed"}
                      className="btn-status bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      👁️ Đã xem
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Shortlisted")}
                      disabled={app.status === "Shortlisted"}
                      className="btn-status bg-yellow-100 text-yellow-700 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ⭐ Lọt vòng
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Interviewing")}
                      disabled={app.status === "Interviewing"}
                      className="btn-status bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      💬 Phỏng vấn
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Hired")}
                      disabled={app.status === "Hired"}
                      className="btn-status bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✅ Tuyển dụng
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Rejected")}
                      disabled={app.status === "Rejected"}
                      className="btn-status bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ❌ Từ chối
                    </button>
                  </div>
                </div>

                {/* View Profile Button */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <button 
                    onClick={() => {
                      // Navigate to student profile page (tạo route này nếu cần)
                      navigate(`/student-profile/${app.student._id}`);
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                  >
                    <Eye size={16} />
                    Xem hồ sơ đầy đủ →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 bg-white rounded-xl shadow border border-gray-100">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Chưa có ứng viên nào
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Khi có sinh viên nộp đơn ứng tuyển, bạn sẽ thấy họ tại đây.
            </p>
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .btn-status {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-status:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

export default ApplicantListPage;