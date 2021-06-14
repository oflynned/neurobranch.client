import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from '../../../providers/auth/use-account.hook';
import { Paragraph } from '../../building-blocks';

const unprotectedRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/register/onboarding',
];

const firebaseRoutes = [...unprotectedRoutes, '/register/onboarding'];

const isPathProtected = (path: string): boolean =>
  !unprotectedRoutes.includes(path);

const isPathFirebaseProtected = (path: string): boolean =>
  !firebaseRoutes.includes(path);

export const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated, isFirebaseAuthenticated } = useAccount();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const path = router.pathname;

    if (path === '/') {
      if (isAuthenticated) {
        router.push('/dashboard');
        return;
      }

      if (isFirebaseAuthenticated) {
        router.push('/register/onboarding');
        return;
      }

      router.push('/login');
      return;
    } else {
      if (
        !(isAuthenticated || isFirebaseAuthenticated) &&
        !isPathProtected(path)
      ) {
        return;
      }

      if (!isAuthenticated && isPathProtected(path)) {
        router.push('/login');
        return;
      }

      if (!isFirebaseAuthenticated && isPathFirebaseProtected(path)) {
        router.push('/login');
        return;
      }
    }
  }, [isFirebaseAuthenticated, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return children;
};
