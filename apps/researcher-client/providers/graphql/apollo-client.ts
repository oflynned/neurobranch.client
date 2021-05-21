import { ApolloClient, InMemoryCache } from '@apollo/client';

export const getApolloClient = (endpoint: string) =>
  new ApolloClient({
    uri: `${endpoint}/v1/gql`,
    cache: new InMemoryCache(),
  });
