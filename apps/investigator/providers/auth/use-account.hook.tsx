import React, { useState, useContext, createContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { getHeaders } from '../graphql/use-user.hook';
import { useFirebase } from './use-firebase.hook';

type Account = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Role = 'INVESTIGATOR' | 'CANDIDATE';

const AccountContext = createContext<{
  account: Account | null;
  loading: boolean;
  error: Error;
  role: Role | null;
  getAccount: () => void;
}>({
  account: null,
  role: null,
  getAccount: null,
  loading: true,
  error: null,
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
  const { user, token, isAuthenticated } = useFirebase();
  const [getAccount, { data, loading, error }] = useLazyQuery<Account | null>(
    query
  );
  const [account, setAccount] = useState<Account | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (data) {
      setRole('INVESTIGATOR');
      // @ts-ignore
      setAccount(data.getInvestigator);
    }
  }, [data]);

  useEffect(() => {
    if (!!user && !!token) {
      getAccount({
        context: { ...getHeaders(user, token) },
      });
    }
  }, [isAuthenticated, getAccount, user, token]);

  return (
    <AccountContext.Provider
      value={{ account, role, getAccount, loading, error }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
