import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyD81K_DK_6tGVL482R-oUg_8HbXnL8fwmw",
    authDomain: "cursoreact-44015.firebaseapp.com",
    projectId: "cursoreact-44015",
    storageBucket: "cursoreact-44015.appspot.com",
    messagingSenderId: "1000498167783",
    appId: "1:1000498167783:web:91ddbb197dacfa8c368742",
    measurementId: "G-4TC8Y5QZ2B"
  };
  

if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);

}

export default firebase;