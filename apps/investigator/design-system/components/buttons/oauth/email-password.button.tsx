import { FC } from 'react';
import { Button } from '../../../index';
import {
  CredentialSignInException,
  EmailTooShortException,
  PasswordTooShortException,
} from './exceptions';
import { FirebaseRepo } from './firebase.repo';

interface Props {
  label: string;
  email: string;
  password: string;
  onClick?: () => Promise<void> | void;
  onSuccess?: () => Promise<void> | void;
  repo: FirebaseRepo;
}

export const EmailPasswordLoginButton: FC<Props> = ({
  label,
  email,
  password,
  repo,
  onSuccess,
  onClick,
}) => {
  return (
    <Button
      fill={'FILL_PARENT'}
      text={label}
      onClick={async () => {
        if (email?.length < 3) {
          throw new EmailTooShortException();
        }

        if (password?.length < 3) {
          throw new PasswordTooShortException();
        }

        if (onClick) {
          await onClick();
        }

        try {
          await repo.signInWithCredentials(email, password);
          onSuccess();
        } catch (e) {
          throw new CredentialSignInException();
        }
      }}
    />
  );
};
