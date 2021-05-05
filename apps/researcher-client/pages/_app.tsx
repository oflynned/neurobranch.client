import React from 'react';
import { AppProps } from 'next/app';
import './styles.css';
import { AuthProvider } from '../auth';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
