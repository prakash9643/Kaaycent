import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { uid: string; email: string } | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ uid: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    // Mock login for now since user wants to move to Shopify
    setUser({ uid: 'mock-user-id', email: 'user@example.com' });
  };

  const logOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
