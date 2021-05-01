import firebaseClient from 'firebase/app';
import 'firebase/auth';

const clientConfig = Object.freeze({
  apiKey: 'AIzaSyArixZy8ZhIl71SoxT9h2kxMLmWpypiRFE',
  authDomain: 'neurobranch-b28f8.firebaseapp.com',
  projectId: 'neurobranch-b28f8',
  storageBucket: 'neurobranch-b28f8.appspot.com',
  messagingSenderId: '1007229779897',
  appId: '1:1007229779897:web:ca0bed0a838ae3ef2b4068',
  measurementId: 'G-ZTNWF8ML6M',
});

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(clientConfig);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
