import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
 /* .apiKey: <API_KEY>,
  authDomain: <AUTH_DOMAIN>,
  databaseURL: <DATABASE_URL>,
  projectId: <PROJECT_ID>,
  storageBucket: <STORAGE_BUCKET>,
  messagingSenderId: <MESSAGING_SENDER_ID>,
  appId: <APP_ID> */
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


export {auth}
