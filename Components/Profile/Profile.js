/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import { Image } from 'react-native';
// import { Appbar } from 'react-native-paper';
import { Avatar, Accessory } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';



import TimeLinePage from '../Profile/Timeline';
import AboutPage from '../Profile/About';
import FeiendsPage from '../Profile/Friends';
import PhotosPage from '../Profile/Photos';

// import { white } from 'react-native-paper/lib/typescript/src/styles/colors';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import ProfileBg from "../Images/profilebg";
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';


class Profile extends React.Component {
  profileData = {};
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isloading: true,
      IsActiveBtnEnable: 'Timeline',
    }

    this.getUserData();

    // Creating Global Variable.
    global.SampleVar = <View><TimeLinePage /></View>;
  }

  getUserData = async () => {
    this.setState({ isloading: true });
    await AsyncStorage.getItem('userData', (err, result) => {
      console.log(result);
      let dataObj = JSON.parse(result);
      console.log(dataObj.UserName);
      this.profileData = dataObj;
      this.setState({ isloading: false });
    });
  }

  openmenu = () => {
    //alert('hi');
    // props.navigation.openDrawer();
    //navigation.navigate('DrawerOpen');
  }
  ChangePage = (text) => {
    this.setState({ IsActiveBtnEnable: text })
    if (this.state.IsActiveBtnEnable == 'Timeline') {
      //global.SampleVar = null
      global.SampleVar = <View><TimeLinePage /></View>;
    }
    if (this.state.IsActiveBtnEnable == 'About') {
      //global.SampleVar = null
      global.SampleVar = <View><AboutPage /></View>;
    }
    if (this.state.IsActiveBtnEnable == 'Friends') {
      //global.SampleVar = null
      global.SampleVar = <View><FeiendsPage /></View>;
    }
    if (this.state.IsActiveBtnEnable == 'Photos') {
      //global.SampleVar = null
      global.SampleVar = <View><PhotosPage /></View>;
    }
    // global.SampleVar = <View><TimeLinePage /></View>;
  }

  render() {
    let profileContent;
    if (!this.state.isloading) {
      profileContent = <View><View style={styles.AppBarHeader}>
        <View style={styles.AppBarContent} >
          <TouchableOpacity
          //  onPress={
          //     () => this.openmenu()}
          >
            {/* <Ionicons name="menu" size={40} style={styles.AppIcon} style={{ marginTop: -5,marginLeft:10 }} /> */}
            <Entypo name="menu" size={40} style={{ marginTop: -5, marginLeft: 10, }} />
            {/* <Ionicons name="filter-outline" size={40} style={{ marginTop: -5, marginLeft: 10,}} /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.AppBarContent} >
          <Fontisto name="nav-icon-grid" size={20} style={{ marginTop: 5, marginLeft: 10, }} />
        </View>
        <View style={styles.AppBarContent} >
          <Ionicons name="notifications-outline" size={28} style={{ marginTop: 1, }} />
        </View>
        {/* <View style={styles.AppBarContent} >
        <AntDesign name="hearto" size={20} style={styles.AppIcon} />
      </View> */}
        {/* <View style={styles.AppBarContent} >
        <AntDesign name="mail" size={20} style={styles.AppIcon} />
      </View> */}
        {/* <View style={styles.AppBarContent} >
        <Feather name="message-square" size={20} style={styles.AppIcon} />
      </View> */}
        <View style={styles.AppBarContent} ></View>
        <View style={styles.AppBarContent} ></View>
        <View style={styles.AppBarContent} ></View>
        <View >
          <Image source={require('../Images/Logo-Tranperentbg.png')}
            style={{
              height: 70,
              width: 70
            }} />
          {/* <Image source={require('../Images/Logo.jpg')}
          style={{
            height: 70,
            width: 70
          }} /> */}

        </View>
      </View>
        <ScrollView>
          <View>
            <Image style={styles.imageaddbg} source={require('../Images/profilebg.png')} />
          </View>
          <View style={{ alignItems: "center", marginTop: -75, }}>
            <Avatar
              rounded
              size="xlarge"
              activeOpacity={0.7}
              source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 150,
                width: 150,
                borderRadius: 50,
                margin: "auto",
              }}
            />
            <Text>{this.profileData.UserName}</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            {/* <View style={[(this.state.IsActiveBtnEnable=='Timeline') ? styles.ActvieBtn : styles.NormalBtn]}></View> */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[(this.state.IsActiveBtnEnable == 'Timeline') ? styles.ActvieBtn : styles.NormalBtn]}
                onPress={
                  () => this.ChangePage('Timeline')
                }>
                <Text style={[(this.state.IsActiveBtnEnable == 'Timeline') ? styles.ActvieBtnText : styles.NormalBtnText]}>Timeline</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[(this.state.IsActiveBtnEnable == 'About') ? styles.ActvieBtn : styles.NormalBtn]}
                onPress={
                  () => this.ChangePage('About')
                }>
                <Text style={[(this.state.IsActiveBtnEnable == 'About') ? styles.ActvieBtnText : styles.NormalBtnText]}>About</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[(this.state.IsActiveBtnEnable == 'Friends') ? styles.ActvieBtn : styles.NormalBtn]}
                onPress={
                  () => this.ChangePage('Friends')
                }>
                <Text style={[(this.state.IsActiveBtnEnable == 'Friends') ? styles.ActvieBtnText : styles.NormalBtnText]}>Friends</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.ActvieBtn : styles.NormalBtn]}
                onPress={
                  () => this.ChangePage('Photos')
                }>
                <Text style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.ActvieBtnText : styles.NormalBtnText]}>Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.BasicInfiBtn}>
      <View style={{ flex: 3 }}>
        <TouchableOpacity>
          <Text style={styles.BasicInfiBtnText}> Basic Info </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity>
          <Text style={{ textAlign: "right" }}><Feather name="more-vertical" size={30} style={{ color: 'black' }} /></Text>
        </TouchableOpacity>
      </View>
      </View> */}
          <View>
            {global.SampleVar}
          </View>

        </ScrollView>
        </View>
     } else {
      profileContent = <Text className="loader">Loading ... </Text>
    }
    return (
      <View style={styles.Profilecontainer}>
        {profileContent}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  Profilecontainer: {
    backgroundColor: '#f7f3f3',
  },
  AppBarHeader: {
    marginTop: 30,
    flexDirection: "row",
    // flex: 7,
    height: 70,
    //backgroundColor: 'rgba(97, 33, 210, 0.85)',
    backgroundColor: "white",
    // borderBottomColor: "black",
    // borderBottomWidth: 1,
  },
  AppBarContent: {
    flex: 1,
    paddingTop: 20,
    // marginTop: 20,
  },
  AppIcon: {
    //  color: "#000000",
    color: '#ffffff',
    height: 20,
    width: 20,
  },
  imageaddbg: {
    marginTop: 10,
    width: "100%",
    height: 250
  },
  ActvieBtn: {
    backgroundColor: '#5596e6',
    padding: 8,
    margin: 5,
    // marginLeft: 50,
    height: 40,
    borderRadius: 25,
    color: 'white',
    textAlign: 'center',
    // width: 300
  },
  NormalBtn: {
    color: '#5596e6',
    padding: 10,
    margin: 5,
    // marginLeft: 50,
    height: 40,
    borderRadius: 25,
    // width: 300
  },
  ActvieBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  NormalBtnText: {
    color: '#5596e6',
    textAlign: 'center',
    fontSize: 17
  },
  // ProfileDetailBtnAtv: {
  //color: '#5596e6',
  //padding: 10,
  //margin: 5,
  // marginLeft: 50,
  //  height: 40,
  //  borderRadius: 25,
  // width: 300
  //},

  //ProfileDetailBtn: {
  //  backgroundColor: '#5596e6',
  //  padding: 8,
  //margin: 5,
  // marginLeft: 50,
  //height: 40,
  //borderRadius: 25,
  //color: 'white',
  // textAlign: 'center',
  // width: 300
  // },
  // ProfileDetailBtnText: {
  //   color: 'white',
  //   textAlign: 'center',
  //   fontSize: 15,
  // },
  //  BasicInfiBtn: {
  // flexDirection: "row",
  // backgroundColor: '#ffffff',
  // borderColor: '#e8e8e8',
  // borderWidth: 2,
  // borderRadius: 6,
  // width: "100%",
  // padding: 15,
  // margin: 15,
  // marginLeft: 50,
  //height: 60,
  // borderRadius:25,
  // },
  // BasicInfiBtnText: {
  //         color: 'black',
  //   textAlign: 'center',
  //   fontSize: 20,
  //   textAlign: 'left',
  //   width: 500,
  // },
});

export default Profile;
