import { useRouter } from 'next/router';
import { useAccount } from '../../../providers/auth/use-account.hook';
import { Paragraph } from '../../building-blocks';
import { useEffect } from 'react';

const unprotectedRoutes = ['/login', '/register', '/forgot-password'];

const isPathProtected = (path: string): boolean =>
  !unprotectedRoutes.includes(path);

export const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAccount();

  useEffect(() => {
    if (isLoading) {
      return;
    }

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
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return children;
};
