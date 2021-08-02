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


import Communityposts from './Communityposts';
import CommunityQuestions from './CommunityQuestions';
import CommunityGuide from './CommunityGuide';
import CommunityEvents from './CommunityEvents';
import CommunityRecommendations from './CommunityRecommendations';
import CommunityFriends from './CommunityFriends';

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IsActiveBtnEnable: 'Posts',
    }
  }
  TabChange = (text) => {
    this.setState({ IsActiveBtnEnable: text })
  }
  render() {
    return (
      <ScrollView>
        <View>
          <View className="U" style={styles.U}>
            <View className="ProfileTop" style={styles.ProfileTop}>
              <View className="ProfileTopContent" style={styles.ProfileTopContent}>
                <View style={{ flexDirection: "row", }}>
                  <View style={{ width: "15%", alignItems: 'center', }}>
                    <TouchableOpacity
                      style={{ borderWidth: 1, borderRadius: 15, }}>
                      <AntDesign name="left" size={20} style={{ margin: 10, color: "black" }} />

                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "70%", alignItems: 'center', }}>
                    <Image source={require('../Images/user.jpg')}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 25,
                      }} />
                    <Text style={{ fontWeight: "bold", color: "black", fontSize: 30, fontStyle: 'normal', margin: 10 }}>Community</Text>
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
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", marginRight: 10 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>518</Text>
                      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Posts</Text>
                    </View>
                    {/* <View style={{ flexDirection: "row", marginRight: 10 }}>
                      <TouchableOpacity style={{ flexDirection: "row", }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Following</Text>
                      </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={{ flexDirection: "row", }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Followers</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', }}>
                  <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <View style={{ margin: 10, backgroundColor: '#5596e6', borderRadius: 15, alignItems: 'center', }}>
                      <TouchableOpacity >
                        <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 15 }}>
                          <Text>
                            <MaterialIcons name="add" size={30} style={{ color: "white", }} />
                          </Text>
                          <Text style={{ marginLeft: 10, fontSize: 22, color: "white", fontWeight: "bold", }}>
                            Invite
                                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: 70, width: "100%", marginBottom: 20, flexDirection: "row", }}>
              <ScrollView horizontal={true} >
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Posts")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveText : styles.TabText]}>Posts</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Questions")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Questions') ? styles.TabActiveText : styles.TabText]}>Questions</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Questions') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Guide")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Guide') ? styles.TabActiveText : styles.TabText]}>Guide</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Guide') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Following")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Following') ? styles.TabActiveText : styles.TabText]}>Followers</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Following') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Events")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveText : styles.TabText]}>Events</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    () => this.TabChange("Recommendations")
                  } style={{ margin: 10 }}>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Recommendations') ? styles.TabActiveText : styles.TabText]}>Recommendations</Text>
                  <Text style={[(this.state.IsActiveBtnEnable == 'Recommendations') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          </View>
          <View>
            {
              (() => {
                if (this.state.IsActiveBtnEnable == 'Posts') {
                  return (
                    <View style={{ height: "100%" }}>
                      <Communityposts />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Questions') {
                  return (
                    <View style={{ height: "100%" }}>
                      <CommunityQuestions />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Guide') {
                  return (
                    <View style={{ height: "100%" }}>
                      <CommunityGuide />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Following') {
                  return (
                    <View style={{ height: "100%" }}>
                     <CommunityFriends/>
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Events') {
                  return (
                    <View style={{ height: "100%" }}>
                      <CommunityEvents />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Recommendations') {
                  return (
                    <View style={{ height: "100%" }}>
                      <CommunityRecommendations />
                    </View>
                  )
                }
              })()
            }
          </View>
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
    height: 350,
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
    display: "none",

  },
  TabActiveText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  TabActiveDot: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: -30,
    color: "black",
    textAlign: "center"
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

export default CommunityProfile;
