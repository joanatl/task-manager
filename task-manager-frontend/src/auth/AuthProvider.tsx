import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { email, password });
    console.log(res)
    const receivedToken = res.data.token;
    setToken(receivedToken);
    localStorage.setItem('token', receivedToken);
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    const receivedToken = res.data.token;
    setToken(receivedToken);
    localStorage.setItem('token', receivedToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used dentro de AuthProvider');
  return ctx;
};
