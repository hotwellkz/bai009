import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  tokens: number;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'profiles', user.uid);
        const unsubscribeTokens = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setTokens(doc.data().tokens || 0);
          }
        });

        return () => unsubscribeTokens();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setTokens(0);
    // Clear all lesson states from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('lesson_')) {
        localStorage.removeItem(key);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, tokens, signOut }}>
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