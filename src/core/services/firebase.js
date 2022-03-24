import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtppN0hkCs5dUDLrZiO_kq0WPSOKCp-sk",
  authDomain: "react-capability-demo.firebaseapp.com",
  projectId: "react-capability-demo",
  storageBucket: "react-capability-demo.appspot.com",
  messagingSenderId: "681432223894",
  appId: "1:681432223894:web:ae1a766925c43f248e72b7",
  measurementId: "G-XNLRJQHPR6",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const firestore = firebase.firestore();
