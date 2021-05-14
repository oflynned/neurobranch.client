import { firebaseClient } from '../../../providers/auth/firebase.client';
import firebase from 'firebase';

type OAuthProvider = firebase.auth.GoogleAuthProvider;

export class FirebaseRepo {
  constructor(private readonly client: typeof firebaseClient) {}

  async signInWithOAuth(provider: OAuthProvider): Promise<void> {
    await this.client.auth().signInWithPopup(provider);
  }

  async createNewCredentialsAccount(
    email: string,
    password: string
  ): Promise<void> {
    await this.client.auth().createUserWithEmailAndPassword(email, password);
  }

  async signInWithCredentials(email: string, password: string): Promise<void> {
    await this.client.auth().signInWithEmailAndPassword(email, password);
  }
}
