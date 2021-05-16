import { FC } from 'react';
import firebase from 'firebase';
import { Button } from '../../../index';
import { FirebaseRepo } from './firebase.repo';
import { CredentialSignInException } from './exceptions';

interface Props {
  onClick?: () => Promise<void> | void;
  onSuccess?: () => Promise<void> | void;
  repo: FirebaseRepo;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const GoogleLoginButton: FC<Props> = ({ onSuccess, repo, onClick }) => {
  return (
    <Button
      icon={'/static/images/google-icon.svg'}
      text={'Login with Google'}
      onClick={async () => {
        await onClick();

        try {
          await repo.signInWithOAuth(provider);
          onSuccess();
        } catch (e) {
          throw new CredentialSignInException();
        }
      }}
    />
  );
};
