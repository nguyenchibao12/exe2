import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminPendingJobsPage = () => {
  const { token } = useAuth();
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const fetchPendingJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingJobs(res.data);
    } catch (err) {
      console.error("Lỗi tải job:", err);
    }
  };

  const handleApproval = async (jobId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt bài đăng chờ thanh toán</h1>

      {pendingJobs.length === 0 ? (
        <p>Không có bài đăng chờ duyệt.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pendingJobs.map((job) => (
            <div key={job._id} className="bg-white shadow p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.companyName}</p>
              <p className="text-sm mb-2">Trạng thái: {job.status}</p>

              {job.paymentImage && (
                <img
                  src={job.paymentImage}
                  alt="Payment proof"
                  className="w-full h-48 object-cover rounded-md border mb-3"
                />
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleApproval(job._id, "approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => handleApproval(job._id, "rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Từ chối
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
