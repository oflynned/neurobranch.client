import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { FirebaseUser, firebaseClient } from './firebase.client';
import { log } from 'util';

const AuthContext = createContext<{
  user: FirebaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = async (): Promise<void> => {
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    nookies.destroy(null, 'token');
    nookies.set(null, 'token', '', { path: '/' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    setIsLoading(true);

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        await logout();
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      setIsLoading(false);

      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      setIsLoading(true);

      const currentUser = firebaseClient.auth().currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        setUser(currentUser);
        setToken(token);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
