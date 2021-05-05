import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import { FirebaseUser, firebaseClient } from './firebase.client';

const AuthContext = createContext<{
  user: FirebaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
}>({
  user: null,
  token: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: never) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      const token = await user.getIdToken();

      setUser(user);
      setToken(token);

      setIsAuthenticated(!!user && !!token);

      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;

      if (user) {
        const token = await user.getIdToken(true);
        setUser(user);
        setToken(token);
      }

      setIsAuthenticated(!!user && !!token);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
