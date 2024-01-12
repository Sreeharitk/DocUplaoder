// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firestore
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkK7Jn87mPjl2MdNkH2lWlH3AYZU71uoA",
  authDomain: "docs-uploader-c7bce.firebaseapp.com",
  projectId: "docs-uploader-c7bce",
  storageBucket: "docs-uploader-c7bce.appspot.com",
  messagingSenderId: "148450825631",
  appId: "1:148450825631:web:6b1d530d9f77468ed199aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//initialize firestore
export const db = getFirestore(app)