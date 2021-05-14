import { FC } from 'react';
import firebase from 'firebase';
import { Button } from '../../../design-system';
import { FirebaseRepo } from './firebase.repo';
import { CredentialSignInErrorException } from './exceptions';

interface Props {
  onSuccess: () => void;
  repo: FirebaseRepo;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const GoogleLoginButton: FC<Props> = ({ onSuccess, repo }) => {
  return (
    <Button
      icon={'/static/images/google-icon.svg'}
      text={'Login with Google'}
      onClick={async () => {
        try {
          await repo.signInWithOAuth(provider);
          onSuccess();
        } catch (e) {
          throw new CredentialSignInErrorException();
        }
      }}
    />
  );
};
