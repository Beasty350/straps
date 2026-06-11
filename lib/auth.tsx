import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'COACH' | 'CLIENT';

interface User {
  id: string;
  email?: string | null;
  name: string;
  role: UserRole;
  age?: number | null;
  gender?: string | null;
  patient_id?: string | null;
  coach_id?: string | null;
  coach?: {
    id: string;
    name: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<User | null>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => null,
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('straps_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string): Promise<User | null> => {
    setIsLoading(true);
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            sessionStorage.setItem('straps_user', JSON.stringify(userData));
            return userData;
        }
        return null;
    } catch (error) {
        console.error("Login failed", error);
        return null;
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('straps_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);