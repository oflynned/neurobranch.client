import { firebaseClient } from '../../../providers/auth/firebase.client';
import firebase from 'firebase';

type OAuthProvider = firebase.auth.GoogleAuthProvider;
type UserCredential = firebase.auth.UserCredential;

export class FirebaseRepo {
  constructor(private readonly client: typeof firebaseClient) {}

  async signInWithOAuth(provider: OAuthProvider): Promise<UserCredential> {
    return this.client.auth().signInWithPopup(provider);
  }

  async createNewCredentialsAccount(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.client.auth().createUserWithEmailAndPassword(email, password);
  }

  async signInWithCredentials(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.client.auth().signInWithEmailAndPassword(email, password);
  }
}
