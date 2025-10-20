import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Helper function to ensure user object has default profile fields
const ensureProfileDefaults = (userData) => {
    if (!userData) return null;
    return {
        ...userData,
        name: userData.name || '',
        phone: userData.phone || '',
        location: userData.location || '',
        avatar: userData.avatar || null,
        about: userData.about || '',
        // Luôn đảm bảo đây là array
        education: Array.isArray(userData.education) ? userData.education : [],
        experience: Array.isArray(userData.experience) ? userData.experience : [],
        skills: Array.isArray(userData.skills) ? userData.skills : [],
        languages: Array.isArray(userData.languages) ? userData.languages : [],
    };
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    let initialUser = null;
    if (savedUser) {
      try {
        initialUser = JSON.parse(savedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
    // Đảm bảo user có đủ trường trước khi set state
    setUser(ensureProfileDefaults(initialUser));
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithDefaults = ensureProfileDefaults(userData);
    setUser(userWithDefaults);
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (userData) => {
     const userWithDefaults = ensureProfileDefaults(userData);
    setUser(userWithDefaults);
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
  };

  const updateUser = (updatedUserData) => {
     // Khi update cũng đảm bảo cấu trúc
     const userWithDefaults = ensureProfileDefaults(updatedUserData);
    setUser(userWithDefaults);
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
     console.log("AuthContext updated user:", userWithDefaults);
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user,
    loading
  };

  // Đợi loading xong mới render
  if (loading) {
      return <div className="text-center py-20">Đang tải ứng dụng...</div>; // Hoặc spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};