import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const AdminPendingJobsPage = () => {
  const { token } = useAuth();
  const [pendingJobs, setPendingJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const fetchPendingJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/jobs/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingJobs(res.data);
      setError(null);
    } catch (err) {
      console.error("Lỗi tải job:", err);
      setError("Không thể tải danh sách job chờ duyệt.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (jobId, status) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${API_BASE_URL}/api/jobs/${jobId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Xóa job khỏi danh sách sau khi duyệt thành công
      setPendingJobs((prev) => prev.filter((job) => job._id !== jobId));
      setError(null);
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      setError(err.response?.data?.message || "Không thể cập nhật trạng thái. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt bài đăng chờ thanh toán</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {isLoading && pendingJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Đang tải danh sách...</p>
        </div>
      ) : pendingJobs.length === 0 ? (
        <p className="text-gray-600">Không có bài đăng chờ duyệt.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pendingJobs.map((job) => (
            <div key={job._id} className="bg-white shadow p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.company || job.companyName}</p>
              <p className="text-sm mb-2">Trạng thái: {job.status}</p>
              {job.recruiter && (
                <p className="text-xs text-gray-500 mb-2">
                  Nhà tuyển dụng: {job.recruiter.name || job.recruiter.email}
                </p>
              )}

              {job.paymentProof && (
                <img
                  src={job.paymentProof}
                  alt="Payment proof"
                  className="w-full h-48 object-cover rounded-md border mb-3"
                />
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleApproval(job._id, "Approved")}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang xử lý..." : "Duyệt"}
                </button>
                <button
                  onClick={() => handleApproval(job._id, "Rejected")}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang xử lý..." : "Từ chối"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPendingJobsPage;
