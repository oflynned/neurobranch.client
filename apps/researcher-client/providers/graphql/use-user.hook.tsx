import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { FirebaseAccount, useFirebase } from '../auth';

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

const base64Encode = (value: string) => Buffer.from(value).toString('base64');

export const getHeaders = (user: FirebaseAccount, token: string) => {
  return {
    headers: {
      'x-firebase-uid': base64Encode(user.uid),
      Authorization: `Bearer ${base64Encode(token)}`,
    },
  };
};

export const useUser = () => {
  const { user, token } = useFirebase();
  const { data, loading, error } = useQuery(query, {
    context: { ...getHeaders(user, token) },
  });

  return { user: data, loading, error };
};
