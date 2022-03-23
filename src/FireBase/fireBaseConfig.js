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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { db, googleAuthProvider, firebase };
