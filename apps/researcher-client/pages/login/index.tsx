import React from 'react';
import { firebaseClient } from '../../auth/firebase.client';
import firebase from 'firebase';

const Login = (_props: any) => {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider());
          window.location.href = '/';
        }}
      >
        Login with Google
      </button>
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signInWithPopup(new firebase.auth.EmailAuthProvider());
          window.location.href = '/';
        }}
      >
        Login with email/password
      </button>
    </div>
  );
};

export default Login;
