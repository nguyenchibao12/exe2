import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Edit2, Save, Upload, Plus, X, Languages, Eye, Trash2, Camera, Building, ExternalLink } from 'lucide-react';

// --- Helper Functions ---
const handleProfileChange = (setProfile, field, value) => setProfile(prev => ({ ...prev, [field]: value }));
const handleArrayChange = (setProfile, arrayName, id, field, value) => setProfile(prev => ({ ...prev, [arrayName]: (prev[arrayName] || []).map(item => item.id === id ? { ...item, [field]: value } : item) }));
const addArrayItem = (setProfile, arrayName, newItemTemplate) => { const newItem = { ...newItemTemplate, id: Date.now() + Math.random() }; setProfile(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), newItem] })); };
const removeArrayItem = (setProfile, arrayName, id) => { if (window.confirm(`Bạn có chắc muốn xóa mục này?`)) { setProfile(prev => ({ ...prev, [arrayName]: (prev[arrayName] || []).filter(item => item.id !== id) })); } };
const addSkill = (profile, setProfile, newSkill, setNewSkill) => { if (newSkill.trim() && !(profile.skills || []).includes(newSkill.trim())) { setProfile(prev => ({ ...prev, skills: [...(prev.skills || []), newSkill.trim()].sort() })); setNewSkill(''); } };
const removeSkill = (setProfile, skillToRemove) => { setProfile(prev => ({ ...prev, skills: (prev.skills || []).filter((skill) => skill !== skillToRemove) })); };
// --------------------

function ProfilePage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // Default to 'info' initially
  const avatarInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', location: '', avatar: null, about: '',
    education: [], experience: [], skills: [], languages: [],
    companyName: '', companyDescription: '', companyWebsite: '',
  });
  const [newSkill, setNewSkill] = useState('');

  // Load user data
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfile({ // Load all possible fields
        name: user.name || '', email: user.email || '', phone: user.phone || '',
        location: user.location || '', avatar: user.avatar || null, about: user.about || '',
        education: (user.education || []).map(edu => ({ ...edu, id: edu.id || Date.now() + Math.random() })),
        experience: (user.experience || []).map(exp => ({ ...exp, id: exp.id || Date.now() + Math.random() })),
        skills: user.skills || [], languages: user.languages || [],
        companyName: user.companyName || user.name || '', // Fallback for employer name
        companyDescription: user.companyDescription || user.about || '', // Fallback for employer desc
        companyWebsite: user.companyWebsite || '',
      });
      // Set default tab based on role *after* profile is set
      setActiveTab(user.role === 'employer' ? 'company' : 'info');
      setAvatarPreview(null); setIsLoading(false);
    } else if (!isAuthenticated && !user && !isLoading) { // Ensure not already loading
       navigate('/login', { replace: true, state: { from: '/profile' } });
    } else if (!user && isAuthenticated){ setIsLoading(true); }
  }, [user, isAuthenticated, navigate, isLoading]); // Add isLoading to dependencies

  // Save profile
  const handleSave = () => { /* ... (Giữ nguyên) ... */ };
  // Avatar handlers
  const handleAvatarClick = () => { /* ... (Giữ nguyên) ... */ };
  const handleAvatarFileChange = (event) => { /* ... (Giữ nguyên) ... */};
  // CV handler
  const handleViewGeneratedCV = () => navigate('/cv-preview', { state: { profileData: profile } });

   // Loading/Redirect checks
   if (isLoading && isAuthenticated) { return <div className="text-center py-20">Đang tải hồ sơ...</div>; }
   if (!isAuthenticated && !user) { return null; /* Redirecting */ }
   if (!user) { return <div className="text-center py-20 text-red-500">Lỗi tải hồ sơ.</div>; }

  // --- JSX RENDER ---
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Header Card --- */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg">
            {/* ... (Code Header Card giữ nguyên từ lần trước) ... */}
             <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <div className="relative group"> {/* Avatar Container */}
                        <div className={`w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-indigo-600 text-3xl md:text-4xl font-bold flex-shrink-0 overflow-hidden border-4 border-indigo-200/50 ${isEditing ? 'cursor-pointer' : ''}`} onClick={handleAvatarClick} title={isEditing ? "Đổi ảnh đại diện/logo" : ""}>
                            {avatarPreview ? (<img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />) : profile.avatar ? (<img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />) : ( (user.role === 'employer' ? profile.companyName : profile.name)?.charAt(0).toUpperCase() || '?')}
                        </div>
                        {isEditing && (<div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"><Camera className="w-6 h-6 text-white" /></div>)}
                        <input type="file" ref={avatarInputRef} onChange={handleAvatarFileChange} className="hidden" accept="image/*" />
                    </div>
                    <div className="text-center sm:text-left"> {/* Info Container */}
                        {isEditing ? (
                            <input type="text"
                                   value={user.role === 'employer' ? profile.companyName : profile.name}
                                   onChange={(e) => handleProfileChange(setProfile, user.role === 'employer' ? 'companyName' : 'name', e.target.value)}
                                   className="text-3xl font-bold bg-transparent border-b border-indigo-300 outline-none mb-2 placeholder-indigo-100 text-white w-full"
                                   placeholder={user.role === 'employer' ? "Tên công ty *" : "Họ và tên *"}/>
                        ) : (
                            <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.role === 'employer' ? profile.companyName : profile.name}</h1>
                        )}
                        <div className="space-y-1 text-indigo-100 text-sm">
                            <p className="flex items-center justify-center sm:justify-start gap-2"><Mail className="w-4 h-4 flex-shrink-0"/> {profile.email}</p>
                            {isEditing ? (
                               <>
                               <input type="tel" value={profile.phone} onChange={(e) => handleProfileChange(setProfile, 'phone', e.target.value)} className="input-header" placeholder="Số điện thoại"/>
                               <input type="text" value={profile.location} onChange={(e) => handleProfileChange(setProfile, 'location', e.target.value)} className="input-header" placeholder="Địa chỉ"/>
                               {user.role === 'employer' && <input type="text" value={profile.companyWebsite} onChange={(e) => handleProfileChange(setProfile, 'companyWebsite', e.target.value)} className="input-header" placeholder="Website công ty (vd: https://...)"/>}
                               </>
                            ) : (
                               <>
                               <p className="flex items-center justify-center sm:justify-start gap-2"><Phone className="w-4 h-4 flex-shrink-0"/> {profile.phone || <span className="italic opacity-70">Chưa cập nhật</span>}</p>
                               <p className="flex items-center justify-center sm:justify-start gap-2"><MapPin className="w-4 h-4 flex-shrink-0"/> {profile.location || <span className="italic opacity-70">Chưa cập nhật</span>}</p>
                               {user.role === 'employer' && profile.companyWebsite && <p className="flex items-center justify-center sm:justify-start gap-2"><ExternalLink className="w-4 h-4 flex-shrink-0"/> <a href={profile.companyWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline">{profile.companyWebsite}</a></p>}
                               </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Edit/Save Button */}
                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="mt-4 sm:mt-0 bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2 text-sm flex-shrink-0 shadow-sm">
                    {isEditing ? <><Save className="w-4 h-4"/> Lưu</> : <><Edit2 className="w-4 h-4"/> Chỉnh sửa</>}
                </button>
            </div>
        </div>
        {/* --- Hết Header Card --- */}


        {/* --- Tabs --- */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
           {user.role === 'employer' ? ( <button onClick={() => setActiveTab('company')} className={`tab-button ${ activeTab === 'company' ? 'active' : '' }`} > Thông tin công ty </button> ) : ( <button onClick={() => setActiveTab('info')} className={`tab-button ${ activeTab === 'info' ? 'active' : '' }`} > Thông tin cá nhân </button> )}
           {user.role !== 'employer' && ( <button onClick={() => setActiveTab('cv')} className={`tab-button ${ activeTab === 'cv' ? 'active' : '' }`} > CV của tôi </button> )}
           {user.role === 'employer' && ( <button onClick={() => navigate('/employer/dashboard')} className="tab-button"> Tin đã đăng </button> )}
        </div>
        {/* --- Hết Tabs --- */}


        {/* --- Content Tabs --- */}
        <div className="space-y-6">

          {/* === NỘI DUNG CHO STUDENT === */}
          {/* **** ĐẢM BẢO KHỐI NÀY ĐƯỢC RENDER CHO STUDENT **** */}
          {user.role !== 'employer' && (
            <>
              {/* Tab Thông tin cá nhân (Student) */}
              {activeTab === 'info' && (
                <>
                  {/* Giới thiệu */}
                  <div className="profile-section">
                    <h3 className="section-title"><User size={18}/> Giới thiệu</h3>
                    {isEditing ? ( <textarea rows={4} className="input-field text-sm" value={profile.about} onChange={(e) => handleProfileChange(setProfile, 'about', e.target.value)} placeholder="Viết một vài dòng giới thiệu..."/> ) : ( <p className="section-content whitespace-pre-line">{profile.about || <span className="placeholder-text">Chưa cập nhật giới thiệu.</span>}</p> )}
                  </div>
                  {/* Học vấn */}
                  <div className="profile-section">
                    <h3 className="section-title"><GraduationCap size={18}/> Học vấn</h3>
                    <div className="space-y-4">
                       {(profile.education || []).map((edu) => ( <div key={edu.id} className="relative border-l-2 border-indigo-100 pl-4 py-1 group">{/* ... Edit/View JSX ... */}</div> ))}
                       {isEditing && ( <button onClick={() => addArrayItem(setProfile, 'education', { school: '', major: '', period: '', gpa: '' })} className="add-item-button"><Plus size={16}/> Thêm học vấn</button> )}
                       {!isEditing && (!profile.education || profile.education.length === 0) && <p className="placeholder-text ml-4">Chưa cập nhật.</p>}
                    </div>
                  </div>
                  {/* Kinh nghiệm */}
                  <div className="profile-section">
                    <h3 className="section-title"><Briefcase size={18}/> Kinh nghiệm làm việc</h3>
                    <div className="space-y-4">
                        {(profile.experience || []).map((exp) => ( <div key={exp.id} className="relative border-l-2 border-purple-100 pl-4 py-1 group">{/* ... Edit/View JSX ... */}</div> ))}
                       {isEditing && ( <button onClick={() => addArrayItem(setProfile, 'experience', { company: '', position: '', period: '', description: '' })} className="add-item-button"><Plus size={16}/> Thêm kinh nghiệm</button> )}
                       {!isEditing && (!profile.experience || profile.experience.length === 0) && <p className="placeholder-text ml-4">Chưa cập nhật.</p>}
                    </div>
                  </div>
                  {/* Kỹ năng */}
                  <div className="profile-section">
                     <h3 className="section-title"><Award size={18}/> Kỹ năng</h3>
                     <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                        {(profile.skills || []).map((skill) => ( <span key={skill} className="skill-tag">{/* ... */}</span> ))}
                        {!isEditing && (!profile.skills || profile.skills.length === 0) && <p className="placeholder-text">Chưa cập nhật.</p>}
                     </div>
                     {isEditing && ( <div className="flex gap-2">{/* ... Input + Add Button ... */}</div> )}
                  </div>
                  {/* Ngôn ngữ */}
                  <div className="profile-section">
                      <h3 className="section-title"><Languages size={18}/> Ngôn ngữ</h3>
                      {(profile.languages || []).length > 0 ? ( <div className="space-y-2 text-sm">{/* ... List Languages ... */}</div> ) : ( <p className="placeholder-text">Chưa cập nhật.</p> )}
                  </div>
                </>
              )}
              {/* Tab CV của tôi (Student) */}
              {activeTab === 'cv' && (
                 <div className="profile-section space-y-5">
                    <h3 className="section-title"><FileText size={18}/> CV Tạo Từ Hồ Sơ</h3>
                    <p className="section-content"> Xem trước CV được tạo tự động...</p>
                    <button onClick={handleViewGeneratedCV} className="button-primary w-full sm:w-auto"> <Eye size={16}/> Xem CV tạo từ hồ sơ </button>
                    <p className="text-xs text-gray-400 mt-2"> Lưu ý: Chức năng tạo file PDF...</p>
                 </div>
              )}
            </>
          )}
          {/* **** HẾT KHỐI STUDENT **** */}


          {/* === NỘI DUNG CHO EMPLOYER === */}
          {user.role === 'employer' && (
            <>
              {/* Tab Thông tin công ty (Employer) */}
              {activeTab === 'company' && (
                 <div className="profile-section">
                    <h3 className="section-title"><Building size={18}/> Giới thiệu công ty</h3>
                    {isEditing ? (
                       <textarea rows={6} className="input-field text-sm"
                                 value={profile.companyDescription || profile.about}
                                 onChange={(e) => {
                                     handleProfileChange(setProfile, 'companyDescription', e.target.value);
                                     // Optionally sync with 'about' if using it as fallback
                                     handleProfileChange(setProfile, 'about', e.target.value);
                                 }}
                                 placeholder="Mô tả về công ty..."/>
                    ) : (
                       <p className="section-content whitespace-pre-line">{profile.companyDescription || profile.about || <span className="placeholder-text">Chưa cập nhật.</span>}</p>
                    )}
                 </div>
              )}
            </>
          )}
          {/* === HẾT KHỐI EMPLOYER === */}

        </div>
        {/* --- Hết Content Tabs --- */}
      </div>

       {/* --- CSS Dùng Chung --- */}
       {/* (Khối CSS giữ nguyên như lần trước) */}
       <style jsx global>{`
            .input-header { background: transparent; border-bottom: 1px solid #A5B4FC; width: 100%; margin-bottom: 0.25rem; font-size: 0.875rem; line-height: 1.25rem; color: white; outline: none; padding-bottom: 2px;}
            .input-header::placeholder { color: #C7D2FE;}
            .input-header:focus { border-bottom-color: white; }
            .tab-button { padding: 0.625rem 1.25rem; border-radius: 0.5rem; font-weight: 500; transition: all 150ms ease-in-out; font-size: 0.875rem; line-height: 1.25rem; border: 1px solid transparent; cursor: pointer;}
            .tab-button.active { background-color: #EEF2FF; color: #4338CA; border-color: #C7D2FE; }
            .tab-button:not(.active) { color: #6B7280; }
            .tab-button:not(.active):hover { background-color: #F9FAFB; color: #1F2937; }

            .profile-section { background-color: white; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); border: 1px solid #E5E7EB; }
            .section-title { font-size: 1.125rem; line-height: 1.75rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; color: #1F2937; padding-bottom: 0.5rem; border-bottom: 1px solid #F3F4F6;}
            .section-title svg { color: #4F46E5; flex-shrink: 0;}
            .section-content { font-size: 0.875rem; line-height: 1.5; color: #4B5563; }
            .placeholder-text { font-size: 0.875rem; line-height: 1.25rem; color: #9CA3AF; font-style: italic; }

            .input-field { display: block; width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; outline: none; transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out; font-size: 0.875rem; line-height: 1.25rem; }
            .input-field:focus { border-color: #6366F1; box-shadow: 0 0 0 1px #6366F1; }
            textarea.input-field { min-height: 5rem; line-height: 1.5; }

            .edit-item-box { position: relative; margin-bottom: 0.5rem; padding: 1rem; padding-right: 2.5rem; background-color: #F9FAFB; border-radius: 0.375rem; border: 1px dashed #E5E7EB; }
            .view-item-box { padding-bottom: 0.5rem; }
            .item-title { font-weight: 600; color: #111827; font-size: 0.9rem; line-height: 1.3rem;}
            .item-subtitle { color: #4B5563; font-size: 0.85rem; line-height: 1.2rem; }
            .item-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 0.25rem; font-size: 0.75rem; line-height: 1rem; }
            .item-description { margin-top: 0.75rem; font-size: 0.875rem; color: #4B5563; white-space: pre-line; line-height: 1.5; padding-left: 0.75rem; border-left: 2px solid #E5E7EB;}
            .item-description p { position: relative; margin-bottom: 0.3rem !important; }
            .item-description p::before { content: ''; position: absolute; left: -0.75rem; top: 0.5em; width: 4px; height: 4px; background-color: #9CA3AF; border-radius: 50%; }

            .delete-item-button { position: absolute; top: 0.5rem; right: 0.5rem; color: #9CA3AF; padding: 0.25rem; border-radius: 99px; background-color: white; border: 1px solid #E5E7EB;}
            .delete-item-button:hover { color: #EF4444; background-color: #FEE2E2; border-color: #FECACA;}
            .add-item-button { color: #4F46E5; font-size: 0.875rem; line-height: 1.25rem; margin-top: 0.75rem; display: inline-flex; align-items: center; gap: 0.25rem; font-weight: 500; padding: 0.25rem 0.5rem; border-radius: 0.375rem; background-color: #EEF2FF;}
            .add-item-button:hover { color: #4338CA; background-color: #E0E7FF;}

            .skill-tag { padding: 0.25rem 0.75rem; background-color: #DBEAFE; color: #1D4ED8; border-radius: 99px; font-weight: 500; font-size: 0.75rem; line-height: 1rem; display: inline-flex; align-items: center; gap: 0.3rem; }
            .skill-delete-button { color: #93C5FD; margin-left: 0.25rem; cursor: pointer;}
            .skill-delete-button:hover { color: #DC2626; }
            .add-skill-button { padding: 0.375rem 0.75rem; background-color: #4F46E5; color: white; border-radius: 0.375rem; display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.875rem; line-height: 1.25rem; border: none; cursor: pointer; }
            .add-skill-button:hover { background-color: #4338CA; }

            .button-primary { padding: 0.625rem 1.25rem; background-color: #4F46E5; color: white; border-radius: 0.5rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; line-height: 1.25rem; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); border: none; cursor: pointer; }
            .button-primary:hover { background-color: #4338CA; }
       `}</style>
    </div>
  );
}

export default ProfilePage;