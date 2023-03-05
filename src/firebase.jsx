// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAPxgaNdk9eiD56XLEHZVLlVO4W-4rz2W4",
  authDomain: "community-platform-67c59.firebaseapp.com",
  projectId: "community-platform-67c59",
  storageBucket: "community-platform-67c59.appspot.com",
  messagingSenderId: "946754728863",
  appId: "1:946754728863:web:129583f105b14d1ee503aa"
};

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB6kPaa7JDIJKCyGrEkLJp2S7Q3QHlKFWs",
//   authDomain: "community-platform-fb5c5.firebaseapp.com",
//   projectId: "community-platform-fb5c5",
//   storageBucket: "community-platform-fb5c5.appspot.com",
//   messagingSenderId: "291596203061",
//   appId: "1:291596203061:web:a8cbffac9d1e43892bad7c"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage();

export {auth, storage};
export default db;


