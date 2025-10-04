import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: string;
  trialEndDate?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, _password: string) => Promise<boolean>;
  signup: (name: string, email: string, _password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isTrialActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Check if trial is active
  const isTrialActive = (): boolean => {
    if (!user || !user.trialEndDate) return false;
    return new Date() < user.trialEndDate;
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, accept any email/password
        const mockUser: User = {
          id: 'user123',
          email,
          name: 'Demo User',
          subscriptionTier: 'basic', // Default to basic, but will be upgraded if in trial
          trialEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: 'user123',
          email,
          name,
          subscriptionTier: 'basic',
          trialEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    isTrialActive: isTrialActive()
  };

  return (
    <AuthContext.Provider value={value}>
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