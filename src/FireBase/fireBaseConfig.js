import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxyp1015N4zn08p55G19dcUd9oIQaoBDg",
  authDomain: "react-app-journal-b7fd3.firebaseapp.com",
  projectId: "react-app-journal-b7fd3",
  storageBucket: "react-app-journal-b7fd3.appspot.com",
  messagingSenderId: "619240223461",
  appId: "1:619240223461:web:332d75c1709a89b8e95a0c",
};
// Your web app's Firebase configuration test
const firebaseConfigTest = {
  apiKey: "AIzaSyBD3Xm_fYAd9jygyO5O0f-XVjfh7JJQky0",
  authDomain: "react-jornal-app-testing.firebaseapp.com",
  projectId: "react-jornal-app-testing",
  storageBucket: "react-jornal-app-testing.appspot.com",
  messagingSenderId: "317704425168",
  appId: "1:317704425168:web:c88432d0f3a3d6f09ad8d5",
  measurementId: "G-6S9650Y4G4",
};

if (process.env.NODE_ENV === "test") {
  // Initialize Firebase test enviroment
  firebase.initializeApp(firebaseConfigTest);
} else {
  // Initialize Firebase prod
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { db, googleAuthProvider, firebase };
