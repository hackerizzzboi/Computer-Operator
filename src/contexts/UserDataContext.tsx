import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface UserStats {
  mcqCompleted: number;
  typingMinutes: number;
  subjectiveAnswers: number;
  lastActive: string;
}

interface UserDataContextType {
  stats: UserStats;
  updateStats: (updates: Partial<UserStats>) => void;
}

const defaultStats: UserStats = {
  mcqCompleted: 0,
  typingMinutes: 0,
  subjectiveAnswers: 0,
  lastActive: new Date().toISOString(),
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const getStorageKey = (userId: string) => `loksewa_stats_${userId}`;

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(defaultStats);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(getStorageKey(user.id));
      if (stored) {
        try {
          setStats(JSON.parse(stored));
        } catch {
          setStats(defaultStats);
        }
      } else {
        setStats(defaultStats);
      }
    }
  }, [user]);

  const updateStats = (updates: Partial<UserStats>) => {
    if (!user) return;
    
    const newStats = { ...stats, ...updates, lastActive: new Date().toISOString() };
    setStats(newStats);
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(newStats));
  };

  return (
    <UserDataContext.Provider value={{ stats, updateStats }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}
