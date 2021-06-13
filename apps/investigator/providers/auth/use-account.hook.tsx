import { useContext, createContext, useEffect, useState } from 'react';
import { useFirebase } from './use-firebase.hook';
import { useLocalStorage } from '../local-storage/local-storage.provider';
import { Investigator, useGetInvestigatorLazyQuery } from '@gql';
import { getHeaders } from '../graphql/gql.headers';

const AccountContext = createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  account: Investigator | null;
  getAccount: () => void;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  isLoading: false,
  account: null,
  getAccount: null,
  logout: () => null,
});

export const AccountProvider = ({ children }) => {
  const {
    uid: firebaseUid,
    token: jwtToken,
    isAuthenticated: isFirebaseAuthenticated,
    isLoading: isFirebaseLoading,
    logout: firebaseLogout,
  } = useFirebase();
  const [getAccount, { data }] = useGetInvestigatorLazyQuery();
  const [
    account,
    setLocalStorageAccount,
    deleteLocalStorageAccount,
  ] = useLocalStorage('account');
  const [isAccountLoading, setIsAccountLoading] = useState(false);

  const logoutAccount = async (): Promise<void> => {
    setIsAccountLoading(true);
    await firebaseLogout();
    deleteLocalStorageAccount();
    setIsAccountLoading(false);
  };

  useEffect(() => {
    if (data) {
      setLocalStorageAccount(JSON.stringify(data.getInvestigator));
    }

    setIsAccountLoading(false);
  }, [data, setLocalStorageAccount]);

  useEffect(() => {
    if (isFirebaseAuthenticated) {
      setIsAccountLoading(true);

      getAccount({ context: getHeaders(firebaseUid, jwtToken) });
    }
  }, [isFirebaseAuthenticated, getAccount, firebaseUid, jwtToken]);

  return (
    <AccountContext.Provider
      value={{
        account: account ? (JSON.parse(account) as Investigator) : null,
        isAuthenticated: !!account && isFirebaseAuthenticated,
        isLoading: isFirebaseLoading || isAccountLoading,
        getAccount,
        logout: logoutAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
