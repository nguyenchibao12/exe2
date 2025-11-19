import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

import { API_BASE_URL } from '../config/api';

// ✅ Helper format trạng thái
const getStatusClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

function ApplicationsPage() {
  const { user, isAuthenticated, loading, token } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) {
      // 1️⃣ Kiểm tra quyền
      if (!isAuthenticated || user?.role !== "student") {
        navigate("/login", { replace: true, state: { from: "/applications" } });
        return;
      }

      // 2️⃣ Fetch applications
      const fetchApplications = async () => {
        setDataLoading(true);
        setError(null);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/applications/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplications(res.data || []);
        } catch (err) {
          console.error("[Applications] Fetch error:", err.response || err);
          setError("Không thể tải danh sách đơn ứng tuyển của bạn.");
          setApplications([]);
        } finally {
          setDataLoading(false);
        }
      };

      fetchApplications();
    }
  }, [loading, isAuthenticated, user, navigate, token]);

  // 3️⃣ Loading states
  if (loading || (!dataLoading && (!isAuthenticated || user?.role !== "student"))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="ml-3 text-gray-600">Đang tải đơn ứng tuyển...</p>
      </div>
    );
  }

  // 4️⃣ Render UI
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
          Đơn Ứng Tuyển Của Tôi ({applications.length})
        </h1>

        {error && <div className="error-message mb-6">{error}</div>}

        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((app) => {
              const job = app.job || {}; // ✅ fix null
              return (
                <div
                  key={app._id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    {/* Job Info */}
                    <div className="flex-grow min-w-0 mb-3 md:mb-0">
                      <Link
                        to={job?._id ? `/job/${job._id}` : "#"}
                        className={`group block mb-1 ${
                          job?._id ? "cursor-pointer" : "cursor-not-allowed"
                        }`}
                      >
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                          {job?.title || "Công việc không xác định"}
                        </h2>
                      </Link>
                      <p className="text-sm text-gray-600 flex items-center gap-1.5">
                        <Briefcase size={14} /> {job?.company || "N/A"}
                        <span className="mx-2 text-gray-300">|</span>
                        <MapPin size={14} /> {job?.location || "N/A"}
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5 flex-shrink-0 ${getStatusClasses(
                        app.status
                      )}`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="border-t border-gray-100 mt-4 pt-4 text-sm">
                    <p className="text-gray-500 flex items-center gap-2 mb-1">
                      <Clock size={14} />
                      Ngày ứng tuyển:
                      <span className="text-gray-700 font-medium">
                        {new Date(app.applicationDate).toLocaleDateString("vi-VN")}
                      </span>
                    </p>
                    <p className="text-gray-500 flex items-start gap-2">
                      <FileText size={14} className="mt-1 flex-shrink-0" />
                      Ghi chú:
                      <span className="text-gray-700 flex-grow">
                        {app.coverLetter || "Không có ghi chú thêm."}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow border border-gray-100">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Bạn chưa nộp đơn ứng tuyển nào
            </h3>
            <p className="text-gray-500 mb-6 text-sm max-w-xs mx-auto">
              Hãy bắt đầu tìm kiếm và ứng tuyển vào các công việc phù hợp!
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              Tìm việc ngay
            </Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      `}</style>
    </div>
  );
}

export default ApplicationsPage;
