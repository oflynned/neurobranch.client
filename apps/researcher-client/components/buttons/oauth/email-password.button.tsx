import { FC } from 'react';
import { Button } from '../../../design-system';
import { FirebaseRepo } from './firebase.repo';
import {
  CredentialSignInErrorException,
  EmailTooShortException,
  PasswordTooShortException,
} from './exceptions';

interface Props {
  email: string;
  password: string;
  onSuccess: () => void;
  repo: FirebaseRepo;
}

export const EmailPasswordLoginButton: FC<Props> = ({
  email,
  password,
  repo,
  onSuccess,
}) => {
  return (
    <Button
      text={'Login'}
      onClick={async () => {
        if (email?.length < 3) {
          throw new EmailTooShortException();
        }

        if (password?.length < 3) {
          throw new PasswordTooShortException();
        }

        try {
          await repo.signInWithCredentials(email, password);
          onSuccess();
        } catch (e) {
          throw new CredentialSignInErrorException();
        }
      }}
    />
  );
};
