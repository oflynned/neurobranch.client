import React from 'react';
import { useAuth } from '../auth/auth';
import Link from 'next/link';

export function Index() {
  const { user } = useAuth();

  if (user?.uid) {
    return (
      <div>
        <p>Authenticated!</p>
        <p>User id {user.uid}</p>
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
