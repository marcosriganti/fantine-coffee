import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
