import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './mainStackNavigator';
import AboutMain from '../Profile/About';
import Login from '../screens/login';
import DrawerContent from './CoustomDrawerContent';
import Profile from './Components/Profile/Profile';



//const Drawer = createDrawerNavigator();

//const MainDrawerNavigator = () => { 
//  return (
    // <NavigationContainer>
     // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} > 
     // {/* <Drawer.Screen name="MainStackNavigator" component={MainStackNavigator} /> */}
    //  <Drawer.Screen name="About" component={AboutMain} />
   // </Drawer.Navigator>
    //</NavigationContainer>
 // );
//}
//export default MainDrawerNavigator;



