
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { User } from '../types';

interface StoredUser extends User {
  password_plaintext: string; // NOTE: In a real app, NEVER store plaintext passwords. This is for demo purposes only.
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password_plaintext: string) => boolean;
  register: (name: string, email: string, password_plaintext: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<StoredUser[]>('nhc_users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('nhc_session', null);

  const login = (email: string, password_plaintext: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password_plaintext === password_plaintext);
    if (user) {
      const { password_plaintext, ...userToStore } = user;
      setCurrentUser(userToStore);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password_plaintext: string): boolean => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false; // User already exists
    }
    const newUser: StoredUser = {
      id: new Date().toISOString() + Math.random(),
      name,
      email,
      password_plaintext,
    };
    setUsers([...users, newUser]);
    const { password_plaintext: _, ...userToStore } = newUser;
    setCurrentUser(userToStore);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
