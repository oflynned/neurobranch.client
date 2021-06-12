import { useFirebase } from '../../../providers/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Paragraph } from '../../building-blocks';

const unprotectedRoutes = ['/login', '/register', '/forgot-password'];

const isPathProtected = (path: string): boolean =>
  !unprotectedRoutes.includes(path);

export const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { firebaseUser, token, isLoading } = useFirebase();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const isAuthenticated = !!firebaseUser && !!token;

    if (router.pathname === '/') {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }

    if (!isAuthenticated && isPathProtected(router.pathname)) {
      router.push('/login');
    }
  }, [isLoading, router, token, firebaseUser]);

  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return children;
};
