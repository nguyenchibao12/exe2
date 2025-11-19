import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Edit2, Save, Plus, X, Languages, Eye, Trash2, Camera, Building, ExternalLink, Loader2, AlertTriangle } from 'lucide-react';

import { API_BASE_URL } from '../config/api';

// --- Helper Functions ---
const handleProfileChange = (setProfile, field, value) => setProfile(prev => ({ ...prev, [field]: value }));
const handleArrayChange = (setProfile, arrayName, id, field, value) => setProfile(prev => ({ ...prev, [arrayName]: (prev[arrayName] || []).map(item => item.id === id ? { ...item, [field]: value } : item) }));
const addArrayItem = (setProfile, arrayName, newItemTemplate) => { const newItem = { ...newItemTemplate, id: Date.now() + Math.random() }; setProfile(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), newItem] })); };
const removeArrayItem = (setProfile, arrayName, id) => { if (window.confirm(`Bạn có chắc muốn xóa mục này?`)) { setProfile(prev => ({ ...prev, [arrayName]: (prev[arrayName] || []).filter(item => item.id !== id) })); } };
const addSkill = (profile, setProfile, newSkill, setNewSkill) => { if (newSkill.trim() && !(profile.skills || []).includes(newSkill.trim())) { setProfile(prev => ({ ...prev, skills: [...(prev.skills || []), newSkill.trim()].sort() })); setNewSkill(''); } };
const removeSkill = (setProfile, skillToRemove) => { setProfile(prev => ({ ...prev, skills: (prev.skills || []).filter((skill) => skill !== skillToRemove) })); };

function ProfilePage() {
  const { user, updateUser, isAuthenticated, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); 
  const avatarInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', location: '', avatar: null, about: '',
    education: [], experience: [], skills: [], languages: [],
    companyName: '', companyDescription: '', companyWebsite: '',
    companyAddress: '', companySize: '', companyFoundedYear: '', companyIndustry: '',
    companyFacebook: '', companyLinkedIn: '', companyWorkingHours: '', companyCulture: '',
    companyImages: [],
  });
  const [companyImagePreviews, setCompanyImagePreviews] = useState([]);
  const companyImageInputRef = useRef(null);
  const [newSkill, setNewSkill] = useState('');

  // Load user data từ context
  useEffect(() => {
    if (user && isAuthenticated) {
      setProfile({
        name: user.name || '', 
        email: user.email || '', 
        phone: user.phone || '',
        location: user.location || '', 
        avatar: user.avatar || null, 
        about: user.about || '',
        education: (user.education || []).map(edu => ({ ...edu, id: edu.id || Date.now() + Math.random() })),
        experience: (user.experience || []).map(exp => ({ ...exp, id: exp.id || Date.now() + Math.random() })),
        skills: user.skills || [], 
        languages: (user.languages || []).map(lang => ({ ...lang, id: lang.id || Date.now() + Math.random() })),
        companyName: user.companyName || user.name || '',
        companyDescription: user.companyDescription || user.about || '',
        companyWebsite: user.companyWebsite || '',
        companyAddress: user.companyAddress || '',
        companySize: user.companySize || '',
        companyFoundedYear: user.companyFoundedYear || '',
        companyIndustry: user.companyIndustry || '',
        companyFacebook: user.companyFacebook || '',
        companyLinkedIn: user.companyLinkedIn || '',
        companyWorkingHours: user.companyWorkingHours || '',
        companyCulture: user.companyCulture || '',
        companyImages: user.companyImages || [],
      });
      setAvatarPreview(null);
      setCompanyImagePreviews([]);
      setActiveTab(user.role === 'recruiter' ? 'company' : 'info');
    } else if (!isAuthenticated && !authLoading) { 
       navigate('/login', { replace: true, state: { from: '/profile' } });
    }
  }, [user, isAuthenticated, authLoading, navigate]);


 // *** HÀM LƯU PROFILE - GỌI API ***
  const handleSave = async () => {
    if (!user || !token) {
      alert('Không thể lưu - chưa đăng nhập!');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      let response;

      // Nếu là recruiter, dùng endpoint riêng
      if (user.role === 'recruiter') {
        const payload = {
          companyName: profile.companyName,
          companyDescription: profile.companyDescription,
          companyWebsite: profile.companyWebsite,
          companyAddress: profile.companyAddress,
          companySize: profile.companySize,
          companyFoundedYear: profile.companyFoundedYear ? parseInt(profile.companyFoundedYear) : null,
          companyIndustry: profile.companyIndustry,
          companyFacebook: profile.companyFacebook,
          companyLinkedIn: profile.companyLinkedIn,
          companyWorkingHours: profile.companyWorkingHours,
          companyCulture: profile.companyCulture,
          location: profile.location,
          phone: profile.phone,
        };

        // Xử lý Avatar
        if (avatarPreview) {
          payload.avatar = avatarPreview;
        }

        // Xử lý ảnh công ty nếu có
        if (companyImagePreviews.length > 0) {
          const imagesToUpload = companyImagePreviews.filter(img => img.startsWith('data:image'));
          if (imagesToUpload.length > 0) {
            const uploadResponse = await axios.post(
              `${API_BASE_URL}/api/auth/me/company-images`,
              { images: imagesToUpload },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            payload.companyImages = uploadResponse.data.images;
          }
        }

        console.log('Sending recruiter profile update payload:', payload);

        response = await axios.put(
          `${API_BASE_URL}/api/auth/me/recruiter-profile`, 
          payload, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      } 
      // Nếu là student, dùng endpoint cũ
      else {
        const payload = {
          name: profile.name, 
          phone: profile.phone, 
          location: profile.location, 
          about: profile.about,
          education: profile.education.map(({ id, ...rest }) => rest),
          experience: profile.experience.map(({ id, ...rest }) => rest),
          skills: profile.skills,
          languages: profile.languages.map(({ id, ...rest }) => rest),
        };

        // Xử lý Avatar
        if (avatarPreview) {
          payload.avatar = avatarPreview;
        }

        console.log('Sending student profile update payload:', payload);

        response = await axios.put(
          `${API_BASE_URL}/api/auth/me/profile`, 
          payload, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }

      console.log('Profile update response:', response.data);

      // Cập nhật user trong AuthContext
      if (response.data.user && updateUser) {
        updateUser(response.data.user); 
      }

      setAvatarPreview(null);
      setCompanyImagePreviews([]);
      setIsEditing(false);
      alert('✅ Cập nhật hồ sơ thành công!');

    } catch (err) {
      console.error("Profile update failed:", err.response || err);
      const errorMsg = err.response?.data?.message || 'Lỗi kết nối hoặc lỗi server khi lưu hồ sơ.';
      setSaveError(errorMsg);
      alert('❌ ' + errorMsg);
    } finally {
      setIsSaving(false);
    }
  };
  // Avatar handlers
  const handleAvatarClick = () => { 
    if (isEditing) avatarInputRef.current?.click(); 
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn! Vui lòng chọn ảnh dưới 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý ảnh công ty
  const handleCompanyImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const totalImages = (profile.companyImages?.length || 0) + companyImagePreviews.length + files.length;
    if (totalImages > 6) {
      alert('Tối đa 6 ảnh công ty!');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} quá lớn! Vui lòng chọn ảnh dưới 5MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeCompanyImage = (index) => {
    setCompanyImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingCompanyImage = async (imageUrl) => {
    if (!window.confirm('Bạn có chắc muốn xóa ảnh này?')) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/api/auth/me/company-images`,
        { 
          data: { imageUrl },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProfile(prev => ({
        ...prev,
        companyImages: prev.companyImages.filter(img => img !== imageUrl)
      }));
      alert('✅ Đã xóa ảnh thành công!');
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('❌ Lỗi khi xóa ảnh.');
    }
  };

  const handleViewGeneratedCV = () => navigate('/cv-preview', { state: { profileData: profile } });


  // Render Loading
  if (authLoading || !user) { 
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const currentRole = user.role;
  const isRecruiter = currentRole === 'recruiter';


  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <div className="relative group">
                <div className={`w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-indigo-600 text-3xl md:text-4xl font-bold flex-shrink-0 overflow-hidden border-4 border-indigo-200/50 ${isEditing ? 'cursor-pointer' : ''}`} 
                     onClick={handleAvatarClick} 
                     title={isEditing ? "Đổi ảnh đại diện/logo" : ""}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    (isRecruiter ? profile.companyName : profile.name)?.charAt(0).toUpperCase() || '?'
                  )}
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
                <input type="file" ref={avatarInputRef} onChange={handleAvatarFileChange} className="hidden" accept="image/*" />
              </div>

              <div className="text-center sm:text-left">
                {isEditing ? (
                  <input type="text"
                         value={isRecruiter ? profile.companyName : profile.name}
                         onChange={(e) => handleProfileChange(setProfile, isRecruiter ? 'companyName' : 'name', e.target.value)}
                         className="text-3xl font-bold bg-transparent border-b border-indigo-300 outline-none mb-2 placeholder-indigo-100 text-white w-full input-header"
                         placeholder={isRecruiter ? "Tên công ty *" : "Họ và tên *"}/>
                ) : (
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">
                    {isRecruiter ? profile.companyName : profile.name}
                  </h1>
                )}
                <div className="space-y-1 text-indigo-100 text-sm">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0"/> {profile.email}
                  </p>
                  {isEditing ? (
                    <>
                      <input type="tel" value={profile.phone} onChange={(e) => handleProfileChange(setProfile, 'phone', e.target.value)} className="input-header" placeholder="Số điện thoại"/>
                      <input type="text" value={profile.location} onChange={(e) => handleProfileChange(setProfile, 'location', e.target.value)} className="input-header" placeholder="Địa chỉ"/>
                      {isRecruiter && <input type="text" value={profile.companyWebsite} onChange={(e) => handleProfileChange(setProfile, 'companyWebsite', e.target.value)} className="input-header" placeholder="Website công ty (vd: https://...)"/>}
                    </>
                  ) : (
                    <>
                      <p className="flex items-center justify-center sm:justify-start gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0"/> 
                        {profile.phone || <span className="italic opacity-70">Chưa cập nhật</span>}
                      </p>
                      <p className="flex items-center justify-center sm:justify-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0"/> 
                        {profile.location || <span className="italic opacity-70">Chưa cập nhật</span>}
                      </p>
                      {isRecruiter && profile.companyWebsite && (
                        <p className="flex items-center justify-center sm:justify-start gap-2">
                          <ExternalLink className="w-4 h-4 flex-shrink-0"/> 
                          <a href={profile.companyWebsite.startsWith('http') ? profile.companyWebsite : `https://${profile.companyWebsite}`} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="hover:underline">
                            {profile.companyWebsite}
                          </a>
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                    disabled={isSaving} 
                    className="mt-4 sm:mt-0 bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2 text-sm flex-shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin"/> Đang lưu...</>
              ) : isEditing ? (
                <><Save className="w-4 h-4"/> Lưu hồ sơ</>
              ) : (
                <><Edit2 className="w-4 h-4"/> Chỉnh sửa</>
              )}
            </button>
          </div>
        </div>
        
        {/* Error message */}
        {saveError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-3">
          {isRecruiter ? (
            <button onClick={() => setActiveTab('company')} className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}>
              Thông tin công ty
            </button>
          ) : (
            <button onClick={() => setActiveTab('info')} className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}>
              Thông tin cá nhân
            </button>
          )}
          {isRecruiter && (
            <button onClick={() => navigate('/employer/dashboard')} className="tab-button">
              Tin đã đăng
            </button>
          )}
          {!isRecruiter && (
            <button onClick={() => setActiveTab('cv')} className={`tab-button ${activeTab === 'cv' ? 'active' : ''}`}>
              CV của tôi
            </button>
          )}
        </div>

        {/* Content Tabs */}
        <div className="space-y-6">
          {!isRecruiter && activeTab === 'info' && (
            <>
              {/* Giới thiệu */}
              <div className="profile-section">
                <h3 className="section-title"><User size={18}/> Giới thiệu</h3>
                {isEditing ? (
                  <textarea rows={4} className="input-field text-sm" value={profile.about} onChange={(e) => handleProfileChange(setProfile, 'about', e.target.value)} placeholder="Viết một vài dòng giới thiệu..."/>
                ) : (
                  <p className="section-content whitespace-pre-line">
                    {profile.about || <span className="placeholder-text">Chưa cập nhật giới thiệu.</span>}
                  </p>
                )}
              </div>

              {/* Học vấn */}
              <div className="profile-section">
                <h3 className="section-title"><GraduationCap size={18}/> Học vấn</h3>
                <div className="space-y-4">
                  {(profile.education || []).map((edu) => (
                    <div key={edu.id} className="relative border-l-2 border-indigo-100 pl-4 py-1 group">
                      {isEditing ? (
                        <div className="edit-item-box">
                          <button onClick={() => removeArrayItem(setProfile, 'education', edu.id)} className="delete-item-button">
                            <Trash2 size={14}/>
                          </button>
                          <input type="text" value={edu.school} onChange={(e) => handleArrayChange(setProfile, 'education', edu.id, 'school', e.target.value)} placeholder="Tên trường *" className="input-field mb-2"/>
                          <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setProfile, 'education', edu.id, 'major', e.target.value)} placeholder="Chuyên ngành *" className="input-field mb-2"/>
                          <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setProfile, 'education', edu.id, 'period', e.target.value)} placeholder="Niên khóa (VD: 2021 - 2025)" className="input-field mb-2"/>
                          <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setProfile, 'education', edu.id, 'gpa', e.target.value)} placeholder="GPA (VD: 3.5/4.0)" className="input-field"/>
                        </div>
                      ) : (
                        <div className="view-item-box">
                          <h4 className="item-title">{edu.school || <span className="placeholder-text">Chưa cập nhật</span>}</h4>
                          <p className="item-subtitle">{edu.major || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                          <div className="item-meta">
                            <span className="text-gray-500">{edu.period || <span className="placeholder-text">Chưa cập nhật</span>}</span>
                            {edu.gpa && <span className="text-indigo-600 font-medium">GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={() => addArrayItem(setProfile, 'education', { school: '', major: '', period: '', gpa: '' })} className="add-item-button">
                      <Plus size={16}/> Thêm học vấn
                    </button>
                  )}
                  {!isEditing && (!profile.education || profile.education.length === 0) && (
                    <p className="placeholder-text ml-4">Chưa cập nhật thông tin học vấn.</p>
                  )}
                </div>
              </div>

              {/* Kinh nghiệm */}
              <div className="profile-section">
                <h3 className="section-title"><Briefcase size={18}/> Kinh nghiệm làm việc</h3>
                <div className="space-y-4">
                  {(profile.experience || []).map((exp) => (
                    <div key={exp.id} className="relative border-l-2 border-indigo-100 pl-4 py-1 group">
                      {isEditing ? (
                        <div className="edit-item-box">
                          <button onClick={() => removeArrayItem(setProfile, 'experience', exp.id)} className="delete-item-button">
                            <Trash2 size={14}/>
                          </button>
                          <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setProfile, 'experience', exp.id, 'company', e.target.value)} placeholder="Tên công ty *" className="input-field mb-2"/>
                          <input type="text" value={exp.position} onChange={(e) => handleArrayChange(setProfile, 'experience', exp.id, 'position', e.target.value)} placeholder="Vị trí *" className="input-field mb-2"/>
                          <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setProfile, 'experience', exp.id, 'period', e.target.value)} placeholder="Thời gian (VD: 01/2023 - 06/2024)" className="input-field mb-2"/>
                          <textarea rows={3} value={exp.description} onChange={(e) => handleArrayChange(setProfile, 'experience', exp.id, 'description', e.target.value)} placeholder="Mô tả công việc" className="input-field"/>
                        </div>
                      ) : (
                        <div className="view-item-box">
                          <h4 className="item-title">{exp.company || <span className="placeholder-text">Chưa cập nhật</span>}</h4>
                          <p className="item-subtitle">{exp.position || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                          <p className="text-gray-500 text-xs mb-2">{exp.period || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                          {exp.description && <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={() => addArrayItem(setProfile, 'experience', { company: '', position: '', period: '', description: '' })} className="add-item-button">
                      <Plus size={16}/> Thêm kinh nghiệm
                    </button>
                  )}
                  {!isEditing && (!profile.experience || profile.experience.length === 0) && (
                    <p className="placeholder-text ml-4">Chưa cập nhật kinh nghiệm làm việc.</p>
                  )}
                </div>
              </div>

              {/* Kỹ năng */}
              <div className="profile-section">
                <h3 className="section-title"><Award size={18}/> Kỹ năng</h3>
                <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                  {(profile.skills || []).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(setProfile, skill)} className="skill-delete-button" aria-label={`Xóa ${skill}`}>
                          <X size={12}/>
                        </button>
                      )}
                    </span>
                  ))}
                  {!isEditing && (!profile.skills || profile.skills.length === 0) && (
                    <p className="placeholder-text">Chưa cập nhật kỹ năng.</p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex gap-2 border-t border-gray-100 pt-4">
                    <input type="text" placeholder="Thêm kỹ năng (VD: Photoshop)" className="input-field flex-1 text-sm" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill(profile, setProfile, newSkill, setNewSkill)}/>
                    <button onClick={() => addSkill(profile, setProfile, newSkill, setNewSkill)} type="button" className="add-skill-button">
                      <Plus size={16}/> Thêm
                    </button>
                  </div>
                )}
              </div>

              {/* Ngôn ngữ */}
              <div className="profile-section">
                <h3 className="section-title"><Languages size={18}/> Ngôn ngữ</h3>
                {(profile.languages || []).length > 0 ? (
                  <div className="space-y-2 text-sm">
                    {profile.languages.map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        {isEditing ? (
                          <>
                            <input type="text" value={lang.name || ''} onChange={(e) => handleArrayChange(setProfile, 'languages', lang.id, 'name', e.target.value)} placeholder="Tên ngôn ngữ" className="input-field mr-2 flex-1"/>
                            <input type="text" value={lang.level || ''} onChange={(e) => handleArrayChange(setProfile, 'languages', lang.id, 'level', e.target.value)} placeholder="Trình độ" className="input-field mr-2 flex-1"/>
                            <button onClick={() => removeArrayItem(setProfile, 'languages', lang.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 size={14}/>
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="font-medium">{lang.name || 'N/A'}</span>
                            <span className="text-gray-600">{lang.level || 'N/A'}</span>
                          </>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button onClick={() => addArrayItem(setProfile, 'languages', { name: '', level: '' })} className="add-item-button mt-2">
                        <Plus size={16}/> Thêm ngôn ngữ
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="placeholder-text">Chưa cập nhật ngôn ngữ.</p>
                    {isEditing && (
                      <button onClick={() => addArrayItem(setProfile, 'languages', { name: '', level: '' })} className="add-item-button mt-2">
                        <Plus size={16}/> Thêm ngôn ngữ
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {!isRecruiter && activeTab === 'cv' && (
            <div className="profile-section space-y-5">
              <h3 className="section-title"><FileText size={18}/> CV Tạo Từ Hồ Sơ</h3>
              <p className="section-content">Xem trước CV được tạo tự động từ thông tin hồ sơ của bạn.</p>
              <button onClick={handleViewGeneratedCV} className="button-primary w-full sm:w-auto">
                <Eye size={16}/> Xem CV tạo từ hồ sơ
              </button>
              <p className="text-xs text-gray-400 mt-2">Lưu ý: Chức năng tạo file PDF đang được phát triển.</p>
            </div>
          )}

          {isRecruiter && activeTab === 'company' && (
            <>
              {/* Ảnh công ty */}
              <div className="profile-section">
                <h3 className="section-title"><Camera size={18}/> Ảnh công ty (tối đa 6 ảnh)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Ảnh hiện có */}
                  {profile.companyImages?.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={img} alt={`Company ${index + 1}`} className="w-full h-48 object-cover rounded-lg border-2 border-gray-200" />
                      {isEditing && (
                        <button
                          onClick={() => removeExistingCompanyImage(img)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {/* Ảnh preview mới */}
                  {companyImagePreviews.map((img, index) => (
                    <div key={`preview-${index}`} className="relative group">
                      <img src={img} alt={`Preview ${index + 1}`} className="w-full h-48 object-cover rounded-lg border-2 border-indigo-300" />
                      {isEditing && (
                        <button
                          onClick={() => removeCompanyImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {/* Nút thêm ảnh */}
                  {isEditing && (profile.companyImages?.length || 0) + companyImagePreviews.length < 6 && (
                    <button
                      onClick={() => companyImageInputRef.current?.click()}
                      className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">Thêm ảnh</span>
                    </button>
                  )}
                </div>
                <input
                  ref={companyImageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleCompanyImageChange}
                  className="hidden"
                />
              </div>

              {/* Thông tin cơ bản */}
              <div className="profile-section">
                <h3 className="section-title"><Building size={18}/> Thông tin công ty</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên công ty *</label>
                        <input type="text" className="input-field" value={profile.companyName} onChange={(e) => handleProfileChange(setProfile, 'companyName', e.target.value)} placeholder="Tên công ty" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực hoạt động</label>
                        <input type="text" className="input-field" value={profile.companyIndustry} onChange={(e) => handleProfileChange(setProfile, 'companyIndustry', e.target.value)} placeholder="VD: Công nghệ thông tin, Marketing..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quy mô công ty</label>
                        <input type="text" className="input-field" value={profile.companySize} onChange={(e) => handleProfileChange(setProfile, 'companySize', e.target.value)} placeholder="VD: 10-50 nhân viên" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Năm thành lập</label>
                        <input type="number" className="input-field" value={profile.companyFoundedYear} onChange={(e) => handleProfileChange(setProfile, 'companyFoundedYear', e.target.value)} placeholder="VD: 2020" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ công ty</label>
                        <input type="text" className="input-field" value={profile.companyAddress} onChange={(e) => handleProfileChange(setProfile, 'companyAddress', e.target.value)} placeholder="Địa chỉ chi tiết" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input type="url" className="input-field" value={profile.companyWebsite} onChange={(e) => handleProfileChange(setProfile, 'companyWebsite', e.target.value)} placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                        <input type="url" className="input-field" value={profile.companyFacebook} onChange={(e) => handleProfileChange(setProfile, 'companyFacebook', e.target.value)} placeholder="https://facebook.com/..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input type="url" className="input-field" value={profile.companyLinkedIn} onChange={(e) => handleProfileChange(setProfile, 'companyLinkedIn', e.target.value)} placeholder="https://linkedin.com/company/..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giờ làm việc</label>
                        <input type="text" className="input-field" value={profile.companyWorkingHours} onChange={(e) => handleProfileChange(setProfile, 'companyWorkingHours', e.target.value)} placeholder="VD: Thứ 2 - Thứ 6: 8:00 - 17:00" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Lĩnh vực</p>
                        <p className="font-medium">{profile.companyIndustry || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Quy mô</p>
                        <p className="font-medium">{profile.companySize || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Năm thành lập</p>
                        <p className="font-medium">{profile.companyFoundedYear || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Giờ làm việc</p>
                        <p className="font-medium">{profile.companyWorkingHours || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
                        <p className="font-medium">{profile.companyAddress || <span className="placeholder-text">Chưa cập nhật</span>}</p>
                      </div>
                      {profile.companyFacebook && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Facebook</p>
                          <a href={profile.companyFacebook} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                            {profile.companyFacebook}
                          </a>
                        </div>
                      )}
                      {profile.companyLinkedIn && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                          <a href={profile.companyLinkedIn} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                            {profile.companyLinkedIn}
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Giới thiệu công ty */}
              <div className="profile-section">
                <h3 className="section-title"><Building size={18}/> Giới thiệu công ty</h3>
                {isEditing ? (
                  <textarea rows={6} className="input-field text-sm"
                            value={profile.companyDescription}
                            onChange={(e) => handleProfileChange(setProfile, 'companyDescription', e.target.value)}
                            placeholder="Mô tả về công ty, văn hóa, lợi ích khi làm việc tại đây..."/>
                ) : (
                  <p className="section-content whitespace-pre-line">
                    {profile.companyDescription || <span className="placeholder-text">Chưa cập nhật giới thiệu công ty.</span>}
                  </p>
                )}
              </div>

              {/* Văn hóa công ty */}
              <div className="profile-section">
                <h3 className="section-title"><Award size={18}/> Văn hóa công ty</h3>
                {isEditing ? (
                  <textarea rows={4} className="input-field text-sm"
                            value={profile.companyCulture}
                            onChange={(e) => handleProfileChange(setProfile, 'companyCulture', e.target.value)}
                            placeholder="Mô tả văn hóa công ty, giá trị cốt lõi, môi trường làm việc..."/>
                ) : (
                  <p className="section-content whitespace-pre-line">
                    {profile.companyCulture || <span className="placeholder-text">Chưa cập nhật văn hóa công ty.</span>}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .input-header {
          width: 100%;
          padding: 0.375rem 0.5rem;
          background: rgba(255,255,255,0.1);
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          border-radius: 0.25rem;
          outline: none;
          color: white;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .input-header::placeholder {
          color: rgba(255,255,255,0.6);
        }
        .input-header:focus {
          background: rgba(255,255,255,0.15);
          border-bottom-color: white;
        }
        .tab-button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
          background: transparent;
          color: #6b7280;
        }
        .tab-button:hover {
          background: #f3f4f6;
          color: #4f46e5;
        }
        .tab-button.active {
          background: #4f46e5;
          color: white;
        }
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
        .input-field {
          width: 100%;
          padding: 0.625rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .placeholder-text {
          color: #9ca3af;
          font-style: italic;
        }
        .edit-item-box {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
        .view-item-box {
          padding: 0.5rem 0;
        }
        .item-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        .item-subtitle {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        .item-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }
        .add-item-button {
          width: 100%;
          padding: 0.625rem;
          background: #f3f4f6;
          color: #4f46e5;
          border: 1px dashed #d1d5db;
          border-radius: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .add-item-button:hover {
          background: #e0e7ff;
          border-color: #4f46e5;
        }
        .delete-item-button {
          position: absolute;
          right: 0;
          top: 0.5rem;
          padding: 0.25rem 0.5rem;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .group:hover .delete-item-button {
          opacity: 1;
        }
        .delete-item-button:hover {
          background: #fecaca;
        }
        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .skill-delete-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transition: all 0.2s;
        }
        .skill-delete-button:hover {
          background: rgba(255,255,255,0.3);
        }
        .add-skill-button {
          padding: 0.625rem 1rem;
          background: #4f46e5;
          color: white;
          border-radius: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .add-skill-button:hover {
          background: #4338ca;
        }
        .button-primary {
          padding: 0.75rem 1.5rem;
          background: #4f46e5;
          color: white;
          border-radius: 0.5rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .button-primary:hover {
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </div>
  );
}

export default ProfilePage;