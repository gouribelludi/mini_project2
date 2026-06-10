import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      if (data && data.status === 'success') {
        setUser(data);
        return data;
      }
      throw new Error(data?.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);
      if (data && data.status === 'success') {
        setUser(data);
        return data;
      }
      throw new Error(data?.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
