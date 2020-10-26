import firebase from "firebase";
require('firebase/auth')

const app = firebase.initializeApp({
    apiKey: "AIzaSyCDWl4DyMbNjZa9GStLFm1la52tOZG36cY",
    authDomain: "revproject-fdf61.firebaseapp.com",
    databaseURL: "https://revproject-fdf61.firebaseio.com",
    projectId: "revproject-fdf61",
    storageBucket: "revproject-fdf61.appspot.com",
    messagingSenderId: "367246486036",
    appId: "1:367246486036:web:5a7f94d8d6dda146605501",
    measurementId: "G-ZXTVL7DKB4"
  });

export default app;
