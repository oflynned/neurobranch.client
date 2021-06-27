import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import 'tailwindcss/tailwind.css';
import { ConfigService } from '../config/config.service';
import { RouteGuard } from '../design-system';
import { FirebaseProvider } from '../providers/auth';
import { AccountProvider } from '../providers/auth/use-account.hook';
import { ConfigProvider } from '../providers/config/config.provider';
import { GlobalStyle } from '../theme/global.theme';
import { lightTheme } from '../theme/light.theme';

const App = ({ Component, pageProps }: AppProps) => {
  const config = new ConfigService();
  const client = new ApolloClient({
    uri: `${config.getApiEndpoint()}/v1/gql`,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Reset />
      <GlobalStyle />
      <ConfigProvider>
        <ThemeProvider theme={lightTheme}>
          <ApolloProvider client={client}>
            <FirebaseProvider>
              <AccountProvider>
                <RouteGuard>
                  <Component {...pageProps} />
                </RouteGuard>
              </AccountProvider>
            </FirebaseProvider>
          </ApolloProvider>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
