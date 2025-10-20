import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Languages, ArrowLeft } from 'lucide-react'; // Bỏ Printer
import { useAuth } from '../context/AuthContext'; // Đường dẫn đến AuthContext

function CVPreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Lấy user hiện tại từ context

  // Lấy profile data từ state được truyền qua route từ ProfilePage
  const profile = location.state?.profileData || {
    name: user?.name || 'Tên Người Dùng',
    email: user?.email || 'email@example.com',
    phone: 'Chưa cập nhật SĐT',
    location: 'Chưa cập nhật địa chỉ',
    avatar: null,
    about: 'Chưa cập nhật giới thiệu bản thân...',
    education: [ { id: 1, school: 'Chưa cập nhật trường', major: 'Chưa cập nhật ngành', period: 'N/A', gpa: '' } ],
    experience: [ { id: 1, company: 'Chưa có kinh nghiệm', position: '', period: '', description: '' } ],
    skills: ['Chưa cập nhật kỹ năng'],
    languages: [ { name: 'Tiếng Việt', level: 'Bản ngữ' } ]
  };

  // Bỏ hàm handlePrint

  return (
    // Bỏ class 'print-container' vì không cần style in nữa
    <div className="bg-gray-100 min-h-screen py-8">
       {/* Nút Quay lại */}
      <div className="max-w-4xl mx-auto mb-6 px-4">
        <div className="flex justify-start items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
           <button
            onClick={() => navigate('/profile')} // Nút quay lại ProfilePage
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Hồ sơ
          </button>
           {/* Bỏ nút In/Lưu PDF */}
        </div>
      </div>

      {/* Nội dung CV */}
      <div id="cv-content" className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8 md:p-12 border border-gray-200">
        {/* Header CV */}
        <header className="flex flex-col md:flex-row items-center mb-10 border-b pb-6 border-gray-200">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 text-4xl font-bold mr-0 md:mr-8 mb-4 md:mb-0 flex-shrink-0">
             {profile.name.charAt(0).toUpperCase()}
           </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{profile.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-gray-400"/>{profile.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gray-400"/>{profile.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400"/>{profile.location}</span>
            </div>
          </div>
        </header>

        {/* CV Sections (Giữ nguyên như trước) */}
        <div className="space-y-8">
          {profile.about && (
            <CVSection title="Giới thiệu" icon={User}>
              <p className="text-gray-700 leading-relaxed text-sm">{profile.about}</p>
            </CVSection>
          )}

          {profile.experience && profile.experience.length > 0 && profile.experience[0]?.position && (
            <CVSection title="Kinh nghiệm làm việc" icon={Briefcase}>
              {profile.experience.map((exp) => ( // Dùng ID làm key
                <div key={exp.id} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-base text-gray-800">{exp.position}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-1">{exp.period}</p>
                  {exp.description && (
                     <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-200 mt-1">
                      {exp.description.split('\n').map((line, lineIdx) => (
                         <p key={lineIdx} className="mb-1">{line.replace(/^-\s*/, '• ')}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CVSection>
          )}

          {profile.education && profile.education.length > 0 && profile.education[0]?.school !== 'Chưa cập nhật trường' && (
            <CVSection title="Học vấn" icon={GraduationCap}>
               {profile.education.map((edu) => ( // Dùng ID làm key
                <div key={edu.id} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-base text-gray-800">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.major}</p>
                  <p className="text-xs text-gray-500 mb-1">{edu.period} {edu.gpa && `(GPA: ${edu.gpa})`}</p>
                </div>
              ))}
            </CVSection>
           )}

          {profile.skills && profile.skills.length > 0 && profile.skills[0] !== 'Chưa cập nhật kỹ năng' && (
            <CVSection title="Kỹ năng" icon={Award}>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </CVSection>
           )}

          {profile.languages && profile.languages.length > 0 && (
             <CVSection title="Ngôn ngữ" icon={Languages}>
               <div className="space-y-1">
                  {profile.languages.map((lang, idx) => (
                  <p key={idx} className="text-gray-700 text-sm">
                    <span className="font-medium">{lang.name}:</span> {lang.level}
                  </p>
                 ))}
               </div>
             </CVSection>
           )}
        </div>
      </div>
       {/* Bỏ style cho bản in */}
    </div>
  );
}

// Component phụ cho mỗi Section trong CV (Giữ nguyên)
const CVSection = ({ title, icon: Icon, children }) => (
  <section>
    <h2 className="flex items-center text-lg font-semibold text-indigo-700 mb-3 border-b pb-1.5 border-indigo-100">
      <Icon className="w-5 h-5 mr-2.5 flex-shrink-0" />
      {title.toUpperCase()}
    </h2>
    <div className="pl-1">{children}</div>
  </section>
);

export default CVPreviewPage;