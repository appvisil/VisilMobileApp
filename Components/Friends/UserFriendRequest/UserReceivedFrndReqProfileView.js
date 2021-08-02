
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
  ImageBackground,
  Linking
} from 'react-native';


import { Image } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';




class UserReceivedFrndReqProfileView extends React.Component {
  UserData = {};

  constructor(props) {
    super(props);
    this.UserData = props.route.params;
    this.state = {
      email: '',
      password: '',
      isloading: true,
      IsActiveBtnEnable: 'Posts',
    }


  }

  TabChange = (text) => {
    this.setState({ IsActiveBtnEnable: text })
  }
  FriendsListPage = () => {
    this.props.navigation.navigate('Friends')
  }
  GoToBack = () => {
    this.props.navigation.navigate('Friends')

  }

  render() {
    this.UserData = this.props.route.params;
    return (
      <ScrollView>
        <View>
          <View className="U" style={styles.U}>
            <View className="ProfileTop" style={styles.ProfileTop}>
              <View className="ProfileTopContent" style={styles.ProfileTopContent}>
                <View style={{ flexDirection: "row", }}>
                  <View style={{ width: "15%", alignItems: 'center', }}>
                    <TouchableOpacity
                      onPress={
                        () => this.GoToBack()
                      }
                      style={{ borderWidth: 1, borderRadius: 15, }}>
                      <AntDesign name="left" size={20} style={{ margin: 10, color: "black" }} />

                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "70%", alignItems: 'center', }}>
                    <Image source={require('../../Images/user.jpg')}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 25,
                      }} />
                    <Text style={{ fontWeight: "bold", color: "black", fontSize: 30, fontStyle: 'normal', margin: 10 }}>{this.UserData.UserName}</Text>
                    {/* <Text style={{ fontSize: 20 }}>@gmail</Text> */}
                  </View>
                  <View style={{ width: "15%", alignItems: 'center', }}>
                    <TouchableOpacity
                      style={{ borderWidth: 1, borderRadius: 15 }}>
                      <Entypo name="dots-three-vertical" size={20} style={{ margin: 10, color: "black" }} />

                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ alignItems: 'center', width: "100%", marginTop: 10 }}>
                  <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
                    <View style={{ flexDirection: "row", marginLeft: 15, width: 100 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>518</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10, marginLeft: 5 }}>Posts</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginRight: 10, width: 110 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10, marginLeft: 5 }}>Friends</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: 150 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10, marginLeft: 5 }}>Followers</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', }}>
                  <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <View style={{ margin: 20, backgroundColor: '#5596e6', borderRadius: 15, width: 180, alignItems: 'center', }}>
                      <TouchableOpacity >
                        <Text style={{ color: "white", margin: 15, fontSize: 22, fontWeight: "bold", }}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ margin: 20, backgroundColor: '#5596e6', borderRadius: 15, width: 180, alignItems: 'center', }}>
                      <TouchableOpacity >
                        <Text style={{ color: "white", margin: 15, fontSize: 22, fontWeight: "bold", }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{ margin: 10, backgroundColor: '#ebecec', borderRadius: 15, alignItems: 'center', }}>
                      <TouchableOpacity >
                        <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 15 }}>
                          <Text>
                            <AntDesign name="mail" size={30} style={{ color: "#1e1f20", }} />
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: 70, width: "100%", marginBottom: 20, marginLeft: 30, flexDirection: "row", }}>
              <TouchableOpacity
                onPress={
                  () => this.TabChange("Posts")
                } style={{ margin: 15 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveText : styles.TabText]}>Posts</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => this.TabChange('Photos')
                } style={{ margin: 15 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.TabActiveText : styles.TabText]}>Photos</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => this.TabChange('Videos')
                } style={{ margin: 15 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Videos') ? styles.TabActiveText : styles.TabText]}>Videos</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Videos') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => this.TabChange('Events')
                } style={{ margin: 15 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveText : styles.TabText]}>Events</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </View >
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  U: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  Posts: {
    width: "100%",
    alignItems: 'center',
  },
  PostsBlocks: {
    width: "90%",
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginBottom: 20
  },
  ProfileTop: {
    height: 420,
    width: "100%",
    backgroundColor: '#ffffff',
  },

  ProfileTopContent: {
    width: "100%",
    top: 50,
  },

  ProfileBottom: {
    width: "100%",
    alignItems: 'center',
    top: 600
  },

  TabText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  TabDot: {
    display: "none"
  },
  TabActiveText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  TabActiveDot: {
    fontWeight: "bold",
    fontSize: 50,
    marginLeft: 20,
    marginTop: -30,
    color: "black"
  },

  HashTags: {
    color: "#ea0f38",
    margin: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  Msg: {
    color: "black",
    margin: 20,
    marginTop: 0,
    fontSize: 20,
    fontWeight: "bold",
  },
  LinkStyle: {
    color: "blue",
    margin: 20,
    marginTop: 0,
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default UserReceivedFrndReqProfileView;
