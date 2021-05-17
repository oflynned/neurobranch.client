import React from 'react';
import { AppProps } from 'next/app';
import { FirebaseProvider } from '../providers/auth';
import { Reset } from 'styled-reset';
import { RouteGuard } from '../design-system/components/route';

import './reset.scss';
import './app.scss';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../providers/graphql/apollo-client';
import { AccountProvider } from '../providers/auth/use-account.hook';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Reset />
      <ApolloProvider client={apolloClient}>
        <FirebaseProvider>
          <AccountProvider>
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
          </AccountProvider>
        </FirebaseProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
