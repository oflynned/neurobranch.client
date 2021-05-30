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
  role: Role | null;
  getAccount: () => void;
}>({
  account: null,
  role: null,
  getAccount: null,
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
  const [account, setAccount] = useState<Account | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  useEffect(() => {
    if (isAuthenticated) {
      const context = getHeaders(uid, token);
      getAccount({ context });
    }
  }, [isAuthenticated, getAccount, uid, token]);

  return (
    <AccountContext.Provider value={{ account, role, getAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
