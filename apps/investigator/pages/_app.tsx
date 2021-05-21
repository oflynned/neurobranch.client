import React from 'react';
import { AppProps } from 'next/app';
import { FirebaseProvider } from '../providers/auth';
import { Reset } from 'styled-reset';
import { RouteGuard } from '../design-system';

import './reset.scss';
import './app.scss';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../providers/graphql/apollo-client';
import { AccountProvider } from '../providers/auth/use-account.hook';
import { ConfigService } from '../config/config.service';

// TODO move this to a provider
const config = new ConfigService();
const client = getApolloClient(config.getApiEndpoint());

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Reset />
      <ApolloProvider client={client}>
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
