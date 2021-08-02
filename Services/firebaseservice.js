import React, { useState } from 'react';

import Amplify, { Auth } from 'aws-amplify';

//import firebase from 'firebase'
import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2GP95GNWdprOIRR-7NADRUMQ-E1Duw8s',
  authDomain: '5172822690-0mpogp4u4tvklk1fvqkci8iko0uh74fr.apps.googleusercontent.com',
  databaseURL: 'https://app-visil.firebaseio.com',
  projectId: 'app-visil',
  storageBucket: 'app-visil.appspot.com',
  messagingSenderId: '5172822690'
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

class firebaseFunctions extends React.Component {
  constructor(props) {
    super(props);
  }

  //firebase = require('firebase/app');

  AddData = (collectionName,DataObj) => {
    //const db = firebase.firestore();
    const userRef = firestore().collection(collectionName).doc(DataObj.id).set(DataObj);
    console.log(userRef);
  }

  async getAllData(collectionName) {
    //const db = firebase.firestore();
    //db.settings({ timestampsInSnapshots: true });
    let items = [];
    await firestore().collection(collectionName).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        items.push(doc.data());
        console.log(items);
        // items = JSON.stringify(items);
        // console.log(items);
      });

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

}

export default firebaseFunctions;