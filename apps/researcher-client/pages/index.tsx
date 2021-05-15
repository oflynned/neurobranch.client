import React from 'react';
import Link from 'next/link';
import { useAuth, firebaseClient } from '../providers/auth';

export function Index() {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  if (!!user && !!token) {
    return (
      <div>
        <p>Authenticated!</p>
        <button onClick={async () => firebaseClient.auth().signOut()}>
          Log out
        </button>

        <div>
          <p>Uid</p>
          <code>{user.uid}</code>
          <p>Base64 encoded</p>
          <code>{Buffer.from(user.uid).toString('base64')}</code>
        </div>
        <div>
          <p>Refresh token</p>
          <code>{token}</code>
          <p>Base64 encoded</p>
          <code>{Buffer.from(token).toString('base64')}</code>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Please login</p>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}

export default Index;
