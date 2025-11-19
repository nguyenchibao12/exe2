import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function: Đảm bảo cấu trúc chuẩn VÀ giữ lại role chính xác
const ensureProfileDefaults = (userData) => {
    if (!userData) return null;

    // Lấy role từ userData trước tiên, nếu không có mới mặc định là student
    const role = userData.role || 'student';

    // Tạo object mới chỉ chứa các trường profile chuẩn + role đã xác định
    const profileData = {
        name: userData.name || '',
        phone: userData.phone || '',
        location: userData.location || '',
        avatar: userData.avatar || null,
        about: userData.about || '',
        education: Array.isArray(userData.education) ? userData.education : [],
        experience: Array.isArray(userData.experience) ? userData.experience : [],
        skills: Array.isArray(userData.skills) ? userData.skills : [],
        languages: Array.isArray(userData.languages) ? userData.languages : [],
        companyName: userData.companyName || (role === 'recruiter' ? userData.name : ''),
        companyDescription: userData.companyDescription || (role === 'recruiter' ? userData.about : ''),
        companyWebsite: userData.companyWebsite || '',
        companyImages: Array.isArray(userData.companyImages) ? userData.companyImages : [], // ✅ THÊM
        _id: userData._id || userData.id,
    };

    // Tạo user cuối cùng bao gồm role và các trường profile đã chuẩn hóa
    const finalUser = {
        ...profileData,
        role: role,
        email: userData.email || '',
    };

    console.log("[AuthContext] ensureProfileDefaults produced:", finalUser);
    return finalUser;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect load từ localStorage
  useEffect(() => {
    console.log("[AuthContext] useEffect running: Reading localStorage...");
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    let initialUser = null;

    if (savedUser && savedToken) {
      try {
        initialUser = JSON.parse(savedUser);
        const validatedUser = ensureProfileDefaults(initialUser);
        if (validatedUser) {
            console.log("[AuthContext] Restoring user from localStorage:", validatedUser);
            setUser(validatedUser);
            setToken(savedToken);
        } else {
             localStorage.removeItem('user'); 
             localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("[AuthContext] Failed to parse localStorage:", error);
        localStorage.removeItem('user'); 
        localStorage.removeItem('token');
      }
    } else {
        localStorage.removeItem('user'); 
        localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  // Hàm login
  const login = (userData, receivedToken) => {
    console.log("[AuthContext] login received userData:", userData);
    const userWithDefaults = ensureProfileDefaults(userData);
    if (!userWithDefaults || !receivedToken) { 
      console.error("Invalid data for login"); 
      return; 
    }
    console.log("[AuthContext] Setting user state in login:", userWithDefaults);
    setUser(userWithDefaults);
    setToken(receivedToken);
    try {
        localStorage.setItem('user', JSON.stringify(userWithDefaults));
        localStorage.setItem('token', receivedToken);
        console.log("[AuthContext] User and Token saved to localStorage.");
    } catch (error) {
        console.error("[AuthContext] Failed to save to localStorage:", error);
    }
  };

  // Hàm logout
  const logout = () => {
    setUser(null); 
    setToken(null);
    localStorage.removeItem('user'); 
    localStorage.removeItem('token');
    console.log("[AuthContext] Logout: User and Token removed.");
  };

  // Hàm register
  const register = () => { 
    console.log("Register called (API handles it)"); 
  };

  // Hàm update user
  const updateUser = (updatedUserData) => {
     console.log("[AuthContext] updateUser called with:", updatedUserData);
     const userWithDefaults = ensureProfileDefaults(updatedUserData);
     const currentToken = localStorage.getItem('token');
     if(userWithDefaults && currentToken) {
         const finalUpdateData = {
             ...user,
             ...userWithDefaults
         };
         console.log("[AuthContext] Setting updated user state:", finalUpdateData);
         setUser(finalUpdateData);
         localStorage.setItem('user', JSON.stringify(finalUpdateData));
     } else {
         console.error("[AuthContext] Cannot update user - invalid data or no token.");
     }
  };

  // Giá trị context
  const contextValue = {
    user, 
    token, 
    login, 
    logout, 
    register, 
    updateUser,
    isAuthenticated: !!user && !!token,
    loading
  };

  if (loading) { 
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[999]">
        Đang tải...
      </div>
    ); 
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};