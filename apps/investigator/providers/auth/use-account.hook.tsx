import { useContext, createContext, useEffect } from 'react';
import { useFirebase } from './use-firebase.hook';
import { useLocalStorage } from '../local-storage/local-storage.provider';
import { useGetInvestigatorLazyQuery } from '@gql';
import { getHeaders } from '../graphql/gql.headers';

type Account = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Role = 'INVESTIGATOR' | 'CANDIDATE';

const AccountContext = createContext<{
  account: Account | null;
  role: Role | null;
  getAccount: () => void;
  logout: () => Promise<void>;
}>({
  account: null,
  role: null,
  getAccount: null,
  logout: () => null,
});

export const AccountProvider = ({ children }) => {
  const { uid, token, isAuthenticated } = useFirebase();
  const [getAccount, { data }] = useGetInvestigatorLazyQuery();
  const [account, setAccount, deleteAccount] = useLocalStorage('account');

  const logout = async (): Promise<void> => {
    deleteAccount();
  };

  useEffect(() => {
    if (data) {
      setAccount(JSON.stringify(data.getInvestigator));
    }
  }, [data, setAccount]);

  useEffect(() => {
    if (isAuthenticated) {
      const context = getHeaders(uid, token);
      getAccount({ context });
    }
  }, [isAuthenticated, getAccount, uid, token]);

  return (
    <AccountContext.Provider
      value={{
        account: account ? (JSON.parse(account) as Account) : null,
        role: 'INVESTIGATOR',
        getAccount,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
