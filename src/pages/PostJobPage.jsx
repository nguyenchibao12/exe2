import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Part-time',
    description: '',
    requirements: ''
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Đăng tin tuyển dụng</h1>
      <form className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        {/* Form fields */}
      </form>
    </div>
  );
}

export default PostJobPage;