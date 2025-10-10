import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Edit2, Save, Download, Plus, X } from 'lucide-react';

function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // info, cv, settings
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '0123456789',
    location: 'TP. Hồ Chí Minh',
    avatar: null,
    about: 'Sinh viên năm 3 chuyên ngành CNTT, đam mê lập trình web và thiết kế UI/UX.',
    education: [
      {
        school: 'Đại học Công nghệ Thông tin',
        major: 'Khoa học Máy tính',
        period: '2021 - 2025',
        gpa: '3.5/4.0'
      }
    ],
    experience: [
      {
        company: 'Tech Startup',
        position: 'Frontend Intern',
        period: '06/2023 - 09/2023',
        description: 'Phát triển giao diện web với React, làm việc với team 5 người'
      }
    ],
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Figma', 'Git'],
    languages: [
      { name: 'Tiếng Việt', level: 'Bản ngữ' },
      { name: 'Tiếng Anh', level: 'IELTS 6.5' }
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    // TODO: Save to backend
    console.log('Saving profile:', profile);
    setIsEditing(false);
    alert('Cập nhật hồ sơ thành công!');
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) });
  };

  const generateCV = () => {
    alert('Đang tạo CV PDF... Tính năng sẽ sớm có!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <div className="space-y-1 text-indigo-100">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {profile.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Lưu
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Chỉnh sửa
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'info'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'cv'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            CV của tôi
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'settings'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:bg-white'
            }`}
          >
            Cài đặt
          </button>
        </div>

        {/* Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* About Me */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-indigo-600" />
                Giới thiệu
              </h3>
              {isEditing ? (
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-indigo-500"
                  value={profile.about}
                  onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                />
              ) : (
                <p className="text-gray-700">{profile.about}</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                Học vấn
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-600 pl-4">
                    <h4 className="font-bold text-gray-900">{edu.school}</h4>
                    <p className="text-gray-600">{edu.major}</p>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-gray-500">{edu.period}</span>
                      <span className="text-indigo-600 font-medium">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                Kinh nghiệm làm việc
              </h3>
              <div className="space-y-4">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-purple-600 pl-4">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Kỹ năng
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(idx)}
                        className="hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Thêm kỹ năng mới"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Thêm
                  </button>
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Ngôn ngữ</h3>
              <div className="space-y-3">
                {profile.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cv' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-center py-12">
              <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tạo CV chuyên nghiệp</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Sử dụng thông tin hồ sơ của bạn để tạo CV chuyên nghiệp trong vài giây
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={generateCV}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Tạo CV PDF
                </button>
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Tải CV lên
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Cài đặt tài khoản</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600" defaultChecked />
                    <span className="text-gray-700">Nhận thông báo việc làm qua email</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600" defaultChecked />
                    <span className="text-gray-700">Hiển thị hồ sơ công khai</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Nhận tin nhắn từ nhà tuyển dụng</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-red-600">Vùng nguy hiểm</h3>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors">
                  Đổi mật khẩu
                </button>
                <button className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Xóa tài khoản
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;