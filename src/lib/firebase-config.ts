import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDV2Jna2xMyiBhoREVgcogsdJNyhbIQmy4',
  authDomain: 'lang-sys.firebaseapp.com',
  projectId: 'lang-sys',
  storageBucket: 'lang-sys.appspot.com',
  messagingSenderId: '910518977614',
  appId: '1:910518977614:web:c6e9cad026fc1a74cdaf1f',
  measurementId: 'G-V16D4JE4N2',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

export { auth };
