import React from 'react';
import Link from 'next/link';
import { useAuth, firebaseClient } from '../auth';

export function Index() {
  const { user, token, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Authenticated!</p>
        <button onClick={() => firebaseClient.auth().signOut()}>Log out</button>

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
      <p>User id n/a</p>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}

export default Index;
