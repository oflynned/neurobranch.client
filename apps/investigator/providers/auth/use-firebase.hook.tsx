import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase';
import { firebaseClient } from './firebase.client';
import { useLocalStorage } from '../local-storage/local-storage.provider';

export type FirebaseUser = Pick<
  firebase.User,
  'uid' | 'displayName' | 'email' | 'emailVerified' | 'photoURL' | 'providerId'
>;

const FirebaseContext = createContext<{
  firebaseUser: FirebaseUser | null;
  uid: string | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}>({
  firebaseUser: null,
  uid: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => null,
});

export const FirebaseProvider = ({ children }) => {
  const [uid, setUid, deleteUid] = useLocalStorage('uid');
  const [firebaseUser, setFirebaseUser, deleteFirebaseUser] = useLocalStorage(
    'firebaseUser'
  );
  const [token, setToken, deleteToken] = useLocalStorage('token');
  const logout = async () => {
    await firebaseClient.auth().signOut();
    deleteUid();
    deleteToken();
    deleteFirebaseUser();
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsAuthenticated(!!uid && !!token);

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      setIsLoading(true);
      setFirebaseUser(user.toJSON().toString);
      setUid(user.uid);

      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      }

      setIsLoading(false);
    });
  }, [uid, setUid, token, setToken]);

  return (
    <FirebaseContext.Provider
      value={{
        firebaseUser: (firebaseUser as unknown) as FirebaseUser,
        uid,
        token,
        isLoading,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
