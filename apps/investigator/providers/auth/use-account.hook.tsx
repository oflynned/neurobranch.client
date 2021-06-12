import React, { useContext, createContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { getHeaders } from '../graphql/use-user.hook';
import { useFirebase } from './use-firebase.hook';
import { useLocalStorage } from '../local-storage/local-storage.provider';

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

const query = gql`
  query {
    getInvestigator {
      id
      name
      email
      createdAt
    }
  }
`;

export const AccountProvider = ({ children }) => {
  const { uid, token, isAuthenticated } = useFirebase();
  const [getAccount, { data }] = useLazyQuery<Account | null>(query);
  const [account, setAccount, deleteAccount] = useLocalStorage('account');

  const logout = async (): Promise<void> => {
    deleteAccount();
  };

  useEffect(() => {
    if (data) {
      // TODO generate gql types
      setAccount(JSON.stringify(data['getInvestigator']));
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
