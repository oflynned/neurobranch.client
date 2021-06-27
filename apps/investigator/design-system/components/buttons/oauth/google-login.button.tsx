import firebase from 'firebase/app';
import 'firebase/auth';
import { FC } from 'react';
import { Button } from '../../../index';
import { CredentialSignInException } from './exceptions';
import { FirebaseRepo } from './firebase.repo';

interface Props {
  label: string;
  onClick?: () => Promise<void> | void;
  onSignedIn?: (user: firebase.User, token: string) => Promise<void> | void;
  repo: FirebaseRepo;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const GoogleLoginButton: FC<Props> = ({
  onSignedIn,
  repo,
  onClick,
  label,
}) => {
  return (
    <Button
      icon={'/static/images/google-icon.svg'}
      text={label}
      onClick={async () => {
        if (onClick) {
          await onClick();
        }

        try {
          const { user } = await repo.signInWithOAuth(provider);
          const token = await user.getIdToken(true);

          if (onSignedIn) {
            await onSignedIn(user, token);
          }
        } catch (e) {
          throw new CredentialSignInException();
        }
      }}
    />
  );
};
