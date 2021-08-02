//import { StatusBar } from 'expo-status-bar';
import ReactNative from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import Amplify, { Auth } from 'aws-amplify';




Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-2:642859177598:userpool/us-east-2_YxV5oZxBi',
    region: 'us-east-2',
    identityPoolRegion: 'us-east-2',
    userPoolId: 'us-east-2_YxV5oZxBi',
    userPoolWebClientId: '32q77n1ipgtr6eb1fj5epi5c8g'
    // identityPoolId:'us-east-2:642859177598:userpool/us-east-2_YxV5oZxBi',
    // region:'us-east-2',
    // identityPoolRegion:'us-east-2',
    // userPoolId:'us-east-2_YxV5oZxBi',
    // userPoolWebClientId:'32q77n1ipgtr6eb1fj5epi5c8g'
  }
});

// const firebaseConfig = {
//   apiKey: 'AIzaSyD2GP95GNWdprOIRR-7NADRUMQ-E1Duw8s',
//   authDomain: '5172822690-0mpogp4u4tvklk1fvqkci8iko0uh74fr.apps.googleusercontent.com',
//   databaseURL: 'https://app-visil.firebaseio.com',
//   projectId: 'app-visil',
//   storageBucket: 'app-visil.appspot.com',
//   messagingSenderId: '5172822690'
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

//const Stack = createStackNavigator();

 class FireBaseFunctions extends React.Component {
   userData={};
    constructor(props) {
        super(props);
      }
    
      firebase = require('firebase/app');
    
      AddData = (collectionName,DataObj) => {
        //const db = firebase.firestore();
        const userRef = firestore().collection(collectionName).doc(DataObj.id).set(DataObj);;
        console.log(userRef);
      }
    
      async getAllData(collectionName) {
        //const db = firebase.firestore();
        //db.settings({ timestampsInSnapshots: true });
        let items = [];
        return await firestore().collection(collectionName).get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            //console.log(doc.data());
            items.push(doc.data());
            //console.log(items);
            // items = JSON.stringify(items);
            // console.log(items);
          });
          //console.log(items);
          return items;
        });
      }
    
    
    
      async getData(collectionName, id) {
        let items = [];
        const userDocument = await firestore().collection(collectionName)
          .doc(id).get().then((querySnapshot) => {
            console.log(querySnapshot.data());
          });
      }
    
      async getByUserId(collectionName, Uid) {
        let items = [];
        return await firestore().collection(collectionName).where("UserId", "==", Uid).get().then((querySnapshot) => {
          console.log('querySnapshot.docs', querySnapshot.docs);
          querySnapshot.docs.forEach(doc => {
            console.log(doc.data());
            items.push(doc.data());
            console.log(items);
    
            // items = JSON.stringify(items);
            // console.log(items);
          });
          console.log(items);
          return items;
          //console.log(querySnapshot);
        });
      }
    
      async updateData(collectionName, userData) {
        const userRef = await firestore().collection(collectionName).doc(userData.id).update(userData);
        console.log(userRef);
      }
    
      async DeleteById(collectionName,id){
        const userRef = await firestore().collection(collectionName).doc(id).delete();
        console.log(userRef);
      }
    
    
      getGuid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }
// function UserAdd() {
//   console.log('saving ..........................')
//     try {
//       console.log("hai");
//       firestore()
//     .collection('user')
//     .add({
//       name: 'hanuman',
//       age: 30,
//     })
//     .then(() => {
//       console.log('User added!');
//     }).catch(e => {
//       console.log("error:" + e);
//     });
//     } catch (error) {
//       console.log(' Error signing up...', error);
//     }
// }

 getUser(){
  const userDocument = firestore()
  .collection('user')
  .doc('1BdKnzO5wb3d71jEZHz4').get().then((querySnapshot) => {
    // querySnapshot.forEach(doc => {
    //     let docData = doc.data();
    //     data.push(docData);
    //     console.log('userDocument',docData);
    // });
    console.log(querySnapshot);

  });
}

 }



export default FireBaseFunctions;