import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
  login: (token: string) => Promise<void>;
};
const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {
    throw new Error('setIsAuth function not implemented');
  },
  logout: () => {
    throw new Error('logout function not implemented');
  },
  login: () => {
    throw new Error('login function not implemented');
  },
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      setIsAuth(value !== null);
    } catch (error) {
      console.error('Error checking token:', error);
      setIsAuth(false);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsAuth(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      setIsAuth(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuth(false);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
