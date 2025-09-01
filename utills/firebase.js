

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth , GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "logincoursecloud.firebaseapp.com",
  projectId: "logincoursecloud",
  storageBucket: "logincoursecloud.firebasestorage.app",
  messagingSenderId: "1049710654484",
  appId: "1:1049710654484:web:c047601ce81517bb13a301"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}