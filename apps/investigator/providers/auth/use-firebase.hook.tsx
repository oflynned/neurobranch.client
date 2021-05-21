import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseClient } from './firebase.client';
import firebase from 'firebase';

export type FirebaseAccount = Pick<
  firebase.User,
  'uid' | 'displayName' | 'email' | 'emailVerified' | 'photoURL' | 'providerId'
>;

const FirebaseContext = createContext<{
  user: FirebaseAccount | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
});

// TODO store these in a cookie so that it doesn't have to be fetched every time
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseAccount | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(!!user && !!token);
  }, [user, token]);

  useEffect(() => {
    setIsLoading(true);

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      setIsLoading(true);
      setUser(user);

      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{ user, token, isLoading, isAuthenticated }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
