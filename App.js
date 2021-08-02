
import ReactNative from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import Amplify, { Auth } from 'aws-amplify';

//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import RegistrationTypes from './Components/RegistrationTypes';
import BusinessRegistration from './Components/BusinessRegistration';
import Registration from './Components/Registration';
import RegistrationOTP from './Components/RegistrationOTP';
import PasswordReg from './Components/Password';
import Otp from './Components/OTP';

import Profile from './Components/Profile Pages/profile';
import Posts from './Components/Profile Pages/Posts';
import Comments from './Components/Profile Pages/comments';
import Questions from './Components/Profile Pages/Questions';
import LikesList from './Components/Profile Pages/likelist';
import PostDetails from './Components/Profile Pages/PostDetails';
import CreatPost from './Components/Profile Pages/CreatePost';

//shared pages
import SelectFriends from './Components/Shared Pages/SelectFriends';
import SelectAudience from './Components/Shared Pages/SelectAudience';

//Questions pages
// import QAHomepage from './Components/QuestionAndAnswers/QAHomePage';
// import QuestionDetailsPage from './Components/QuestionAndAnswers/QuestionDetailsPage';
// import AskOrEditQuestion from './Components/QuestionAndAnswers/AskOrEditQuestion';
// import PostQuestionAnswerPage from './Components/QuestionAndAnswers/PostQuestionAnswerPage';

import HomePage from './Components/HomePage/HomePage';

import TextEditor from './Components/RichText/TextEditor'

//GuidPages
import GuideHomepage from './Components/Guide/GuideHomepage';
import GuideDetailsPage from './Components/Guide/GuideDetailsPage';
import PostOrEditGuide from './Components/Guide/PostOrEditGuide';

//friends pages
import UserSuggestFriendsListView from './Components/Friends/UserSuggestFriendsList/UserSuggestFriendsListView';
import UserFriendRequestsList from './Components/Friends/UserFriendRequest/UserFriendRequestMainPage';
import UserSendFrndReqProfileView from './Components/Friends/UserFriendRequest/UserSendFrndReqProfileView';
import UserReceivedFrndReqProfileView from './Components/Friends/UserFriendRequest/UserReceivedFrndReqProfileView';
import UserSuggFrndsListProfileView from './Components/Friends/UserSuggestFriendsList/UserSuggFrndsListProfileView';
import UserFriendsList from './Components/Friends/UserFriends/UserFriendsList';

//import HomePage from './Components/HomePage/HomePage';

//Q&A
import QAHomePage from './Components/QuestionAndAnswers/QAHomePage';
import AnswerReply from './Components/QuestionAndAnswers/AnswerReply';
import AskOrEditQuestion from './Components/QuestionAndAnswers/AskOrEditQuestion';
import DeleteModel from './Components/QuestionAndAnswers/DeleteModel';
import PostQuestionAnswerPage from './Components/QuestionAndAnswers/PostQuestionAnswerPage';
import QuestionDetailsPage from './Components/QuestionAndAnswers/QuestionDetailsPage';


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

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function Home() {
  return (
    <Stack.Navigator initialRouteName="Login">
       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
       <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
       <Stack.Screen name="RegistrationTypes" component={RegistrationTypes} options={{ headerShown: false }}/>
       <Stack.Screen name="RegistrationOTP" component={RegistrationOTP} options={{ headerShown: false }}/>
       <Stack.Screen name="BusinessRegistration" component={BusinessRegistration} options={{ headerShown: false }}/>
       <Stack.Screen name="PasswordReg" component={PasswordReg} options={{ headerShown: false }}/>
       <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }}/>
       <Stack.Screen name="Questions" component={Questions} options={{ headerShown: false }}/>
       <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }}/>
       <Stack.Screen name="CreatPost" component={CreatPost} options={{ headerShown: false }}/>

       <Stack.Screen name="UserSuggFrndsListProfileView" component={UserSuggFrndsListProfileView} options={{ headerShown: false }}/>
       <Stack.Screen name="UserReceivedFrndReqProfileView" component={UserReceivedFrndReqProfileView} options={{ headerShown: false }}/>
       <Stack.Screen name="UserSendFrndReqProfileView" component={UserSendFrndReqProfileView} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}

function QA() {
  return (
    <Stack.Navigator initialRouteName="QAHomePage">
       <Stack.Screen name="QAHomePage" component={QAHomePage} options={{ headerShown: false }}/>
       <Stack.Screen name="AnswerReply" component={AnswerReply} options={{ headerShown: false }}/>
       <Stack.Screen name="AskOrEditQuestion" component={AskOrEditQuestion} options={{ headerShown: false }}/>
       <Stack.Screen name="DeleteModel" component={DeleteModel} options={{ headerShown: false }}/>
       <Stack.Screen name="PostQuestionAnswerPage" component={PostQuestionAnswerPage} options={{ headerShown: false }}/>
       <Stack.Screen name="QuestionDetailsPage" component={QuestionDetailsPage} options={{ headerShown: false }}/>
     
    </Stack.Navigator>
  );
}

export default function App() {

  return (

    <NavigationContainer>
    {/* <Drawer.Navigator drawerContent={props=> <Content {...props}/>}>  */}
    <Drawer.Navigator> 
    <Drawer.Screen name="Home" component={Home} />
    
    <Drawer.Screen name="HomePage" component={HomePage} options={{ headerVisible: false }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ headerVisible: false }} />
      <Drawer.Screen name="Suggest Friends" component={UserSuggestFriendsListView} options={{ headerVisible: false }} />
      <Drawer.Screen name="Friend Requests" component={UserFriendRequestsList} options={{ headerVisible: false }} />
      <Drawer.Screen name="Friends" component={UserFriendsList} options={{ headerVisible: false }} />
      <Drawer.Screen name="Q & A" component={QA} options={{ headerVisible: false }} />

    </Drawer.Navigator>
   </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator>
     
    //     <Stack.Screen
    //       name="Login"
    //       component={Login}
    //       options={{ headerShown: false }}
    //     />
    //      <Stack.Screen
    //       name="Registration"
    //       component={Registration}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen name="RegistrationTypes" component={RegistrationTypes} options={{ headerVisible: false }} />
        
    //     <Stack.Screen name="BusinessRegistration" component={BusinessRegistration} options={{ headerVisible: false }} />
       
    //     <Stack.Screen name="RegistrationOTP" component={RegistrationOTP} options={{ headerVisible: false }} />
    //     <Stack.Screen name="PasswordReg" component={PasswordReg} options={{ headerVisible: false }} />
    //     <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/> 
      
    //     <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }} />
    //     <Stack.Screen name="Questions" component={Questions} options={{ headerShown: false }} />
       
    //     <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
    //     <Stack.Screen name="CreatPost" component={CreatPost} options={{ headerShown: false }} />
    //     <Stack.Screen name="SelectFriends" component={SelectFriends} options={{ headerShown: false }} />
    //     <Stack.Screen name="SelectAudience" component={SelectAudience} options={{ headerShown: false }} />
        
    //     <Stack.Screen name="QAHomepage" component={QAHomepage} options={{ headerShown: false }} />
    //     <Stack.Screen name="QuestionDetailsPage" component={QuestionDetailsPage} options={{ headerShown: false }} />
    //     <Stack.Screen name="AskOrEditQuestion" component={AskOrEditQuestion} options={{ headerShown: false }} />
    //     <Stack.Screen name="PostQuestionAnswerPage" component={PostQuestionAnswerPage} options={{ headerShown: false }} />
        
    //     <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        
    //     <Stack.Screen name="PostOrEditGuide" component={PostOrEditGuide} options={{ headerShown: false }} />
    //     <Stack.Screen name="GuideHomepage" component={GuideHomepage} options={{ headerShown: false }} />
    //     <Stack.Screen name="GuideDetailsPage" component={GuideDetailsPage} options={{ headerShown: false }} />

    //      <Stack.Screen name="UserSuggestFriendsListView" component={UserSuggestFriendsListView} options={{ headerShown: false }} /> 
    //      <Stack.Screen name="UserFriendRequestsList" component={UserFriendRequestsList} options={{ headerShown: false }} /> 
    //      <Stack.Screen name="UserSendFrndReqProfileView" component={UserSendFrndReqProfileView} options={{ headerShown: false }} /> 
    //      <Stack.Screen name="UserReceivedFrndReqProfileView" component={UserReceivedFrndReqProfileView} options={{ headerShown: false }} /> 
    //      <Stack.Screen name="UserSuggFrndsListProfileView" component={UserSuggFrndsListProfileView} options={{ headerShown: false }} /> 
    //      <Stack.Screen name="UserFriendsList" component={UserFriendsList} options={{ headerShown: false }} /> 
        
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function UserAdd() {
  console.log('saving ..........................')
  try {
    console.log("hai");
    firestore()
      .collection('user')
      .add({
        name: 'hanuman',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      }).catch(e => {
        console.log("error:" + e);
      });
  } catch (error) {
    console.log(' Error signing up...', error);
  }
}

function signUp(name, email, password) {
  // this.setState({ errorMsg: '' })
  console.log(email, password);
  try {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        name,
        email,
      }
    })
      .then(data =>
        console.log('success', data)
      ).catch(err => {
        console.log(err)
        // alert(err)
      }
      );
  } catch (error) {
    console.log(' Error signing up...', error);
  }
  // Auth.signUp(
  //   'gopisetti.bhargav@gmail.com',
  //   'Bhargav@1989',
  // )
  //   .then(data =>
  //     console.log('success', data)
  //   ).catch(err => {
  //     console.log(err)
  //     alert(err)
  //   }
  //   );
}
function getUser() {
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
