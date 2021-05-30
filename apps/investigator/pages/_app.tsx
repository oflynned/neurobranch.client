import React from 'react';
import { AppProps } from 'next/app';
import { FirebaseProvider } from '../providers/auth';
import { Reset } from 'styled-reset';
import { RouteGuard } from '../design-system';

import './reset.scss';
import './app.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AccountProvider } from '../providers/auth/use-account.hook';
import { ConfigService } from '../config/config.service';
import { ConfigProvider } from '../providers/config/config.provider';

const App = ({ Component, pageProps }: AppProps) => {
  const config = new ConfigService();
  const client = new ApolloClient({
    uri: `${config.getApiEndpoint()}/v1/gql`,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Reset />
      <ConfigProvider>
        <ApolloProvider client={client}>
          <FirebaseProvider>
            <AccountProvider>
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
            </AccountProvider>
          </FirebaseProvider>
        </ApolloProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
