// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCyR7k4u8Nmh9E18DWXp3DpBlzquwi4a8k',
  authDomain: 'itss-std-react-todo-k63.firebaseapp.com',
  projectId: 'itss-std-react-todo-k63',
  storageBucket: 'itss-std-react-todo-k63.appspot.com',
  messagingSenderId: '472291787111',
  appId: '1:472291787111:web:8277890b148da9cc7defc2',
  measurementId: 'G-SN073F5N88',
};

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore(app);
export const auth = firebase.auth();

export default firebase;
