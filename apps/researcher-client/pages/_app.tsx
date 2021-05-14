import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { AuthProvider } from '../providers/auth';
import { Reset } from 'styled-reset';

import './reset.scss';
import './app.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Reset />
      <ThemeProvider theme={{}}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
