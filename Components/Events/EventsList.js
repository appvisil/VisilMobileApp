import React, { createRef } from 'react';
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
} from 'react-native';
import { Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import Popover from 'react-native-popover-view';
import { SliderBox } from "react-native-image-slider-box";
import moment from 'moment';

import ImagesSlider from '../QuestionAndAnswers/ImagesSlider';

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';

class EventsList extends React.Component {
  services = new FireBaseFunctions();
  constructor(props) {
    super(props);
    this.touchable = createRef();
    this.state = {
      userProfileId: '918121702580',
      userName: 'Prem Kumar',
      userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
      userIP: '103.117.238.130',

      showPopover: false,
      modalVisible: false,

      images: [
        require('../Images/Flower1.jpg'),
        require('../Images/Flower2.jpg'),
        require('../Images/Flower3.jpg'),
      ]
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    this.setState({ showPopover: false });
  }

  GotoCreateorEditEventPage = () => {
    this.props.navigation.navigate('CreateorEditEventPage');
  }
  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };

  GotoShareEventpage = () => {
    this.props.navigation.navigate('ShareEvent');
  }
  MenuOpenClick = (item) => {
    // console.log(item)
    // item.showPopover = true;
    // console.log(item)
    this.setState({showPopover:item.Id})
    //console.log("abc")
    // isVisible=true;
    console.log(item.Id);
  };

  closePopover = (item) => {
    item.showPopover = false;
  }

  // MenuCloseClick = () => {
  //   this.state.showPopover = false;
  //   // isVisible=false;
  // }; 

  followEventClick = async (item) => {
    console.log(item)
    this.setState({ userIP: await publicIp.v4() })
    const likeId = this.services.getGuid();
    var obj = {
      Id: likeId,
      Type: 'EVENTFOLLOW',
      ParentId: item.Id,
      EventId: item.Id,
      UserId: this.state.userProfileId,
      UserimageURL: this.state.userIcon || '',
      UserName: this.state.userName,
      Timestamp: new Date().toLocaleString(),
      UserIPAddress: this.state.userIP || ''
    }
    item.FollowList.push(obj.UserId);
    item.Count.followCount = item.Count.followCount + 1;
    item.TopFiveFollowList.push(this.userObj);
    await firestore().collection('Events').doc(item.Id).set(item);
    await firestore().collection('EventFollow').doc(obj.Id).set(obj);
  };

  render() {
    let EventsGrids;

    if (this.props.eventList.length != undefined && this.props.eventList.length > 0) {
      EventsGrids = this.props.eventList.map((item, index) => (<View>
        <View style={styles.EventDisplayView}>
          <View style={{ flexDirection: "row", paddingBottom: 5 }}>
            <View>
              <Image source={require('../Images/user.jpg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                }} />
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>{item.UserName}</Text>
              <Text style={{ fontSize: 15, color: "black" }}>{item.CreatedTime}</Text>
            </View>
          </View>
          <View style={{ width: "100%" }} onLayout={this.onLayout}>
            <SliderBox
              images={item.Multimedia}
              sliderBoxHeight={200}
              nCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              autoplay
              circleLoop
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              parentWidth={this.state.width}
            />

          </View>
          <View style={{ flexDirection: "row", width: "100%", paddingTop: 20 }}>
            <View style={{ width: "15%", padding: 5 }}>
              <Text style={{ fontSize: 25, borderColor: "black", borderWidth: 1, borderRadius: 10, fontWeight: "bold", padding: 7, color: "black", textAlign: "center" }}>{moment(item.Dateofevent).format("D")}</Text>
            </View>
            <View style={{ width: "70%", padding: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", }}>{moment(item.Dateofevent).format("dddd")}, {moment(item.Dateofevent).format("LT")}</Text>
              <Text style={{ fontSize: 15, color: "black" }}>{moment(item.Dateofevent).format("MMMM")},{moment(item.Dateofevent).format("YYYY")}</Text>
            </View>
            <View style={{ width: "15%", padding: 15 }}>
              <TouchableOpacity ref={this.touchable} onPress={() => this.MenuOpenClick(item)}>
                <Text><Entypo name="dots-three-vertical" size={30} style={{ color: "black", textAlign: "center" }} /></Text>
              </TouchableOpacity>
              {
                (() => {
                  if (this.state.showPopover == item.Id) {
                    return (
                      <Popover
                        //from={this.touchable}  vc
                        isVisible={true}
                        // isVisible={this.state.showPopover}
                        //isVisible={item.showPopover}
                        //onRequestClose={() => this.closePopover(item)}
                       onRequestClose={() => this.setState({ showPopover: false })}
                      >
                        <View style={{ padding: 10, width: 300 }}>
                          <TouchableOpacity onPress={() => this.GotoCreateorEditEventPage()}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "thistle", }}>
                              <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>Edit this Event</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.GotoShareEventpage()}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "thistle", }}>
                              <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>Share this Event</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "thistle", }}>
                              <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>Delete this Event</Text>
                            </View>
                          </TouchableOpacity>
                          <View>
                            <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', padding: 10 }}>Report this Event</Text>
                          </View>
                        </View>
                      </Popover>
                    )
                  }
                })()
              }

            </View>
          </View>
          <View style={{ paddingTop: 10, paddingBottom: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>{item.Event}</Text>
            <Text style={{ fontSize: 17, color: "#a3a4a7", paddingTop: 5 }}>{item.Description}</Text>
          </View>
          <View style={{ flexDirection: "row", paddingBottom: 5 }}>
            <Text><Entypo name="location-pin" size={30} style={{ fontWeight: "bold", }} /></Text>
            <Text style={{ fontSize: 17, paddingBottom: 5 }}>{item.AddressLine1}, {item.AddressLine2}, {item.City}, {item.E_state}, {item.Country}, {item.Zipcode}</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>

            {
              (() => {
                if (item.Count.followCount > 0) {
                  let likeDiv =
                    <View>
                      <TouchableOpacity style={{ flexDirection: "row", borderColor: "#53d769ff", borderWidth: 1, padding: 10, backgroundColor: "#53d769ff", borderRadius: 8 }}
                        onPress={() => this.followEventClick(item)}>
                        <Text><AntDesign name="check" size={30} style={{ color: "white", textAlign: "center", fontWeight: "bold", }} /></Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingLeft: 5 }}>interested </Text>
                      </TouchableOpacity>
                    </View>
                  item.FollowList.map(item => {
                    if (item == this.state.userProfileId) {
                      likeDiv = <View>
                        <TouchableOpacity style={{ flexDirection: "row", borderColor: "#53d769ff", borderWidth: 1, padding: 10, backgroundColor: "#53d769ff", borderRadius: 8 }}
                          onPress={() => this.unfollowEventClick(item)}>
                          <Text><AntDesign name="check" size={30} style={{ color: "white", textAlign: "center", fontWeight: "bold", }} /></Text>
                          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingLeft: 5 }}>interested </Text>
                        </TouchableOpacity>
                      </View>
                    }
                  })
                  return likeDiv
                }
                else {

                  return (
                    <View>
                      <TouchableOpacity style={{ flexDirection: "row", borderColor: "#53d769ff", borderWidth: 1, padding: 10, backgroundColor: "#53d769ff", borderRadius: 8 }}
                        onClick={() => this.followEventClick(item)}>
                        <Text><AntDesign name="check" size={30} style={{ color: "white", textAlign: "center", fontWeight: "bold", }} /></Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingLeft: 5 }}>interested </Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              })()
            }

            <View style={{ flexDirection: "row" }}>
            </View>
          </View>
          <View>
            <Text style={{ paddingTop: 10, fontSize: 20, color: "#a3a4a7" }}>{item.Count.followCount} more are participating</Text>
          </View>
        </View>


      </View>))
    } else {
      EventsGrids = <View>
        <Text>No Events</Text>
      </View>
    }
    return (
      <View style={{ height: "100%" }}>
        <ScrollView>
          {EventsGrids}
        </ScrollView>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ padding: 10, textAlign: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", paddingBottom: 10 }}>Confirm Deletion</Text>
                  <Text style={{ fontWeight: "500", fontSize: 17, textAlign: "center" }}>Are you sure you want to delete this Event?</Text>
                </View>
                <View style={{ flexDirection: "row", padding: 20, alignItems: "flex-end", alignSelf: "flex-end" }}>
                  <TouchableOpacity style={{ color: "#1e74f5", padding: 10 }}>
                    <Text style={{ color: "#1e74f5", fontSize: 20 }}>DELETE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ color: "#1e74f5", padding: 10 }}>
                    <Text style={{ color: "#1e74f5", fontSize: 20 }}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  EventDisplayView: {
    margin: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%"
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    // textAlign: "center"
  }
});

export default EventsList;
