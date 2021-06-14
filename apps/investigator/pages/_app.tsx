import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app';
import { Reset } from 'styled-reset';
import { ConfigService } from '../config/config.service';
import { RouteGuard } from '../design-system';
import { FirebaseProvider } from '../providers/auth';
import { AccountProvider } from '../providers/auth/use-account.hook';
import { ConfigProvider } from '../providers/config/config.provider';
import './app.scss';
import './reset.scss';

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
