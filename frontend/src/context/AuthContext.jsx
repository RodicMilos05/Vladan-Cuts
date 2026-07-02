import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('vladanCutsUserInfo');

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/api/users/login', {
      email,
      password,
    });

    localStorage.setItem('vladanCutsUserInfo', JSON.stringify(data));
    setUserInfo(data);

    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await api.post('/api/users/register', {
      name,
      email,
      password,
      phone,
    });

    localStorage.setItem('vladanCutsUserInfo', JSON.stringify(data));
    setUserInfo(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('vladanCutsUserInfo');
    setUserInfo(null);
  };

  const value = {
    userInfo,
    authLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}