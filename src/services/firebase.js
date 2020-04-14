import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

 var firebaseConfig = {
    apiKey: "AIzaSyAsA8jzv5Fk7IfKhGnLSconqhsf7aMtLKg",
    authDomain: "simplechat-b2c7f.firebaseapp.com",
    databaseURL: "https://simplechat-b2c7f.firebaseio.com",
    projectId: "simplechat-b2c7f",
    storageBucket: "simplechat-b2c7f.appspot.com",
    messagingSenderId: "348181803280",
    appId: "1:348181803280:web:34d80b0b79db153ab77595",
    measurementId: "G-8ELGBW2VN2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const auth = firebase.auth;
  export const db = firebase.database();