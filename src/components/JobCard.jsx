import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Users, Star, Heart } from 'lucide-react';

function JobCard({ job, isSaved, onToggleSave }) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {job.logo}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(job.id);
          }}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold text-green-600">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{job.slots[0]} • {job.slots[1]}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">
          {job.type}
        </span>
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
          {job.posted}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{job.applicants} ứng viên</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{job.rating}</span>
          </div>
        </div>
        <button className="text-indigo-600 font-medium text-sm hover:underline">
          Xem chi tiết →
        </button>
      </div>
    </div>
  );
}

export default JobCard;