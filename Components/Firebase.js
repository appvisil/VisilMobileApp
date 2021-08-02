import * as firebase from 'firebase';
//import * as firebase from 'react-native-firebase'
import firestore from 'firebase/firestore'

// const firebaseConfig = {
//     apiKey: "AIzaSyADHxAJGjUmeebmXOA49O0mp2KQVE6uRRM",
//    // authDomain: "appvisilweb.firebaseapp.com",
//     databaseURL: "https://appvisilweb.firebaseio.com",
//     projectId: "appvisilweb",
//     storageBucket: "appvisilweb.appspot.com",S
//     messagingSenderId: "847990239500",
//     appId: "1:847990239500:web:fa739f47d6cf55942f5929",
//     measurementId: "G-ZKKS17JW4S"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyADHxAJGjUmeebmXOA49O0mp2KQVE6uRRM",
    authDomain: "appvisilweb.firebaseapp.com",
    databaseURL: "https://appvisilweb.firebaseio.com",
    storageBucket: "appvisilweb.appspot.com",
    projectId: "appvisilweb",
    messagingSenderId: "847990239500",
    appId: "1:847990239500:android:da97dcdfbe40fc402f5929",
    };
    //const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  firebase.initializeApp(firebaseConfig);

  firebase.firestore();

export default firebase;