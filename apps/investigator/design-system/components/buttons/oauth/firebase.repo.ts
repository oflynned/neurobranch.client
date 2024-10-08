import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseClient } from '../../../../providers/auth/firebase.client';

type OAuthProvider = firebase.auth.GoogleAuthProvider;
type UserCredential = firebase.auth.UserCredential;

export class FirebaseRepo {
  constructor(private readonly client: typeof firebaseClient) {}

  async signInWithOAuth(provider: OAuthProvider): Promise<UserCredential> {
    return this.client.auth().signInWithPopup(provider);
  }

  async createNewCredentialsAccount(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return this.client.auth().createUserWithEmailAndPassword(email, password);
  }

  async signInWithCredentials(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return this.client.auth().signInWithEmailAndPassword(email, password);
  }
}
