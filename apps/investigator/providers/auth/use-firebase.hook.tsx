import firebase from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../local-storage/local-storage.provider';
import { firebaseClient } from './firebase.client';

const FirebaseContext = createContext<{
  firebaseUser: firebase.User | null;
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
    'firebaseUser',
  );
  const [token, setToken, deleteToken] = useLocalStorage('token');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = async () => {
    setIsLoading(true);
    await firebaseClient.auth().signOut();
    deleteUid();
    deleteToken();
    deleteFirebaseUser();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsAuthenticated(!!uid && !!token);

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      setIsLoading(true);

      if (user) {
        setFirebaseUser(JSON.stringify(user));
        setUid(user.uid);

        const token = await user.getIdToken();
        setToken(token);
      }

      setIsLoading(false);
    });
  }, [uid, setUid, token, setToken, setFirebaseUser]);

  const user = firebaseUser
    ? (JSON.parse(firebaseUser) as firebase.User)
    : null;

  return (
    <FirebaseContext.Provider
      value={{
        firebaseUser: user,
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
