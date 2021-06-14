import { MinimalInvestigatorFragment, useGetLoginAccountLazyQuery } from '@gql';
import firebase from 'firebase';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { useLocalStorage } from '../local-storage/local-storage.provider';
import { useFirebase } from './use-firebase.hook';

type FirebaseUser = Pick<firebase.User, 'email' | 'displayName'>;

const AccountContext = createContext<{
  firebaseUser: FirebaseUser;
  isFirebaseAuthenticated: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetched: boolean;
  account: MinimalInvestigatorFragment | null;
  getAccount: () => void;
  logout: () => Promise<void> | void;
  jwt: string | null;
  uid: string | null;
}>({
  firebaseUser: null,
  isFirebaseAuthenticated: false,
  isAuthenticated: false,
  isLoading: false,
  isFetched: false,
  account: null,
  getAccount: null,
  logout: () => null,
  jwt: null,
  uid: null,
});

export const AccountProvider = ({ children }) => {
  const {
    firebaseUser,
    uid: firebaseUid,
    token: jwtToken,
    isAuthenticated: isFirebaseAuthenticated,
    isLoading: isFirebaseLoading,
    logout: firebaseLogout,
  } = useFirebase();

  const [
    getAccount,
    { data, loading: isAccountLoading, called: isAccountFetched },
  ] = useGetLoginAccountLazyQuery({
    context: {
      headers: {
        'x-firebase-uid': firebaseUid,
        authorization: `Bearer ${jwtToken}`,
      },
    },
  });

  const [
    account,
    setLocalStorageAccount,
    deleteLocalStorageAccount,
  ] = useLocalStorage('account');

  const logoutAccount = useCallback(async (): Promise<void> => {
    await firebaseLogout();
    deleteLocalStorageAccount();
  }, [deleteLocalStorageAccount, firebaseLogout]);

  const isLoading = isAccountLoading || isFirebaseLoading;

  useEffect(() => {
    if (isLoading || !isAccountFetched) {
      return;
    }

    if (data?.getInvestigatorByProviderUid) {
      setLocalStorageAccount(JSON.stringify(data.getInvestigatorByProviderUid));
    } else {
      // otherwise the returned payload is nullish
      logoutAccount();
    }
  }, [
    isFirebaseAuthenticated,
    data,
    setLocalStorageAccount,
    logoutAccount,
    isLoading,
    isAccountFetched,
  ]);

  return (
    <AccountContext.Provider
      value={{
        firebaseUser,
        account: account
          ? (JSON.parse(account) as MinimalInvestigatorFragment)
          : null,
        isFirebaseAuthenticated,
        isAuthenticated: !!account && isFirebaseAuthenticated,
        isLoading: isFirebaseLoading || isAccountLoading,
        isFetched: isAccountFetched,
        getAccount,
        logout: logoutAccount,
        jwt: jwtToken,
        uid: firebaseUid,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
