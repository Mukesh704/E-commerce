import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister, getUserProfile } from '../services/api';
import { getToken, setToken, removeToken } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await getUserProfile();
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          removeToken();
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [isAuthenticated]);

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials);
    setToken(data.token);
    setIsAuthenticated(true);
  };

  const register = async (userData) => {
    const { data } = await apiRegister(userData);
    setToken(data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};