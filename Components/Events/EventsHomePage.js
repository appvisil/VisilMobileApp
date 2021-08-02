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
import DatePicker from 'react-native-datepicker';

import moment from 'moment';

import EventsList from './EventsList';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';

let Events = [];
let EventsByToday = [];
let EventsByTomorrow = [];
let EventsByThisWeek = [];
let EventsByThisMonth = [];
let EventsByCustomDate = [];
class EventsHomePage extends React.Component {
  services = new FireBaseFunctions();
  constructor(props) {
    super(props);
    this.state = {
      userProfileId: '+918465981839',
      userName: 'Ajay',
      userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
      userIP: '103.117.238.130',
      isloading: true,
      IsActiveBtnEnable: 'AnyTime',
    }
    this.getAllEvents();
  }
  TabChange = (text) => {
    // this.setState({ IsActiveBtnEnable: text })
    if (text == 'AnyTime') {
      this.setState({ IsActiveBtnEnable: text })
      this.getAllEvents();
    } else if (text == 'Today') {
      this.setState({ IsActiveBtnEnable: text })
      this.getAllEventsByToday();
    } else if (text == 'Tomorrow') {
      this.setState({ IsActiveBtnEnable: text })
      this.getAllEventsByTomorrow();
    } else if (text == 'ThisWeek') {
      this.setState({ IsActiveBtnEnable: text })
      this.getAllEventsByThisWeek();
    } else if (text == 'ThisMonth') {
      this.setState({ IsActiveBtnEnable: text })
      this.getAllEventsByThisMonth();
    } else if (text == 'Select') {
      this.setState({ IsActiveBtnEnable: text })
    }
  }

  dateChange = (dateValue) => {
    console.log(dateValue);
    this.setState({ Eventdate: dateValue });
    this.getAllEventsByCustomDate(Eventdate);
  }
  GotoCreateEventPage = () => {
    this.props.navigation.navigate('CreateorEditEventPage');
  }

  getAllEvents = async () => {
    this.setState({ isloading: true });
    await firestore()
      .collection('Events').limit(10)
      .onSnapshot((snapshot) => {
        Events = [];
        snapshot.docs.forEach(function (doc) {
          doc.data().showPopover=false;
          Events.push(doc.data());
        });
        // console.log(Events[0]);
        this.setState({ isloading: false })
      });
  }

  getAllEventsByToday = async () => {
    var today = moment().toDate();
    console.log('today', today)
    let date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    let timeStamp = date.getTime() / 1000;
    let dateMDY = await `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    console.log('newDate', new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`));
    console.log('newDate', timeStamp);
    this.setState({ isEventPageLoading: true });
    const db = firestore();
    await db.collection('Events')
      .where('IsDelete', "==", false)
      .where('UserId', "==", this.state.userProfileId)
      .where('EventDate', "==", timeStamp)
      .orderBy('Dateofevent', 'asc')
      .limit(10)
      .onSnapshot((snapshot) => {
        EventsByToday = [];
        snapshot.forEach(function (doc) {
          doc.data().showPopover=false;
          EventsByToday.push(doc.data());
        });
        console.log('EventsByToday', EventsByToday)
        this.setState({ isEventPageLoading: false, EventsByToday });
      });
  }
  getAllEventsByTomorrow = async () => {
    let tomorrow = moment().add(1, 'days');
    console.log(tomorrow);
    let date = new Date(tomorrow);
    console.log(date);
    let dateMDY = '"' + date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate() + '"';
    console.log('tomorrow', new Date(dateMDY))
    // const d = new Date("2021-07-14");
    // console.log('today',d) 
    this.setState({ isEventPageLoading: true });
    const db = firestore();
    await db.collection('Events')
      .where('IsDelete', "==", false)
      .where('UserId', "==", this.state.userProfileId)
      .where('EventDate', "==", new Date(dateMDY))
      .orderBy('Datetime', 'desc').limit(10)
      .onSnapshot((snapshot) => {
        EventsByTomorrow = [];
        snapshot.forEach(function (doc) {
          doc.data().showPopover=false;
          EventsByTomorrow.push(doc.data());
        });
        console.log('EventsByToday', EventsByTomorrow)
        this.setState({ isEventPageLoading: false, EventsByTomorrow });
      });
  }
  getAllEventsByThisWeek = async () => {
    var startDate = moment().startOf('week');
    var endDate = moment().endOf('week');
    let strtDate = startDate.format('LL');
    let edDate = endDate.format('LL');
    this.setState({ isEventPageLoading: true });
    const db = firestore();
    await db.collection('Events')
      .where('IsDelete', "==", false)
      .where('UserId', "==", this.state.userProfileId)
      .where('EventDate', ">=", new Date(strtDate))
      .where('EventDate', "<=", new Date(edDate))
      .orderBy('EventDate', 'asc').limit(10)
      .onSnapshot((snapshot) => {
        EventsByThisWeek = [];
        snapshot.forEach(function (doc) {
          doc.data().showPopover=false;
          EventsByThisWeek.push(doc.data());
          console.log('EventsByThisWeek', EventsByThisWeek)
        });
        console.log('EventsByThisWeek', EventsByThisWeek)
        this.setState({ isEventPageLoading: false, EventsByThisWeek });
      });
  }
  getAllEventsByThisMonth = async () => {
    const startOfMonth = moment().clone().startOf('month');
    const endOfMonth = moment().clone().endOf('month');
    console.log('Start Date:' + startOfMonth.format('LL'));
    console.log('End Date:' + endOfMonth.format('LL'));

    let strtDate = startOfMonth.format('LL');
    let edDate = endOfMonth.format('LL');
    this.setState({ isEventPageLoading: true });
    const db = firestore();
    await db.collection('Events')
      .where('IsDelete', "==", false)
      .where('UserId', "==", this.state.userProfileId)
      .where('EventDate', ">=", new Date(strtDate))
      .where('EventDate', "<=", new Date(edDate))
      .orderBy('EventDate', 'asc').limit(10)
      .onSnapshot((snapshot) => {
        EventsByThisMonth = [];
        snapshot.forEach(function (doc) {
          doc.data().showPopover=false;
          EventsByThisMonth.push(doc.data());
        });
        console.log('EventsByThisMonth', EventsByThisMonth)
        this.setState({ isEventPageLoading: false, EventsByThisMonth });
      });
  }
  getAllEventsByCustomDate = async (date) => {
    let date1 = new Date(date);
    let dateMDY = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
    this.setState({ isEventPageLoading: true });
    const db = firestore();
    await db.collection('Events')
      .where('IsDelete', "==", false)
      .where('UserId', "==", this.state.userProfileId)
      .where('EventDate', "==", new Date(dateMDY))
      .orderBy('Datetime', 'desc').limit(10)
      .onSnapshot((snapshot) => {
        EventsByCustomDate = [];
        snapshot.forEach(function (doc) {
          doc.data().showPopover=false;
          EventsByCustomDate.push(doc.data());
        });
        this.setState({ isEventPageLoading: false, EventsByCustomDate });
      });
  }
  render() {
    let EventtabContent;
    // EventtabContent = <View>
    //   <EventsList eventList={Events} />
    // </View>;
    return (
      <View style={{ height: "100%", paddingBottom: 200 }}>

        <View style={{ flexDirection: "row", backgroundColor: "white", width: "100%", padding: 10 }}>
          <View style={{ width: "10%" }}>
            <Text style={{ borderColor: "#a3a4a7", borderWidth: 1, padding: 5, borderRadius: 10, fontWeight: "bold" }}>
              <AntDesign name="search1" size={25} style={{ textAlign: "center", fontWeight: "bold", color: "black" }} /></Text>
          </View>
          <View style={{ textAlign: "center", width: "80%" }}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", paddingTop: 5 }}>EVENTS</Text>
          </View>
          <View style={{ width: "10%", }}>
            <Text style={{ borderColor: "#a3a4a7", borderWidth: 1, padding: 5, borderRadius: 10, fontWeight: "bold", backgroundColor: "black" }}>
              <MaterialCommunityIcons name="filter-variant" size={25} style={{ textAlign: "center", fontWeight: "bold", color: "white" }} />
            </Text>
          </View>
        </View>

        <View>
          <View style={{ width: "100%", flexDirection: "row", paddingTop: 10 }}>
            <ScrollView horizontal={true} >
              <TouchableOpacity
                onPress={() => this.TabChange("AnyTime")} style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'AnyTime') ? styles.TabActiveText : styles.TabText]}>AnyTime</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'AnyTime') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.TabChange('Today')
                } style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Today') ? styles.TabActiveText : styles.TabText]}>Today</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Today') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.TabChange('Tomorrow')
                } style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Tomorrow') ? styles.TabActiveText : styles.TabText]}>Tomorrow</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Tomorrow') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.TabChange('ThisWeek')
                } style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'ThisWeek') ? styles.TabActiveText : styles.TabText]}>This Week</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'ThisWeek') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.TabChange('ThisMonth')
                } style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'ThisMonth') ? styles.TabActiveText : styles.TabText]}>This Month</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'ThisMonth') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => this.TabChange('Select')
                } style={{ margin: 5 }}>
                <Text style={[(this.state.IsActiveBtnEnable == 'Select') ? styles.TabActiveText : styles.TabText]}>Select</Text>
                <Text style={[(this.state.IsActiveBtnEnable == 'Select') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

              </TouchableOpacity>
            </ScrollView>
          </View>

          <View>
            {
              (() => {
                if (this.state.IsActiveBtnEnable == 'AnyTime') {
                  return (
                    <View style={{ height: "100%" }}>
                      <EventsList eventList={Events} />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Today') {
                  return (
                    <View style={{ height: "100%" }}>
                      <EventsList eventList={EventsByToday} />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Tomorrow') {
                  return (
                    <View style={{ height: "100%" }}>
                      <EventsList eventList={EventsByTomorrow} />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'ThisWeek') {
                  return (
                    <View style={{ height: "100%" }}>
                      <EventsList eventList={EventsByThisWeek} />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'ThisMonth') {
                  return (
                    <View style={{ height: "100%" }}>
                      <EventsList eventList={EventsByThisMonth} />
                    </View>
                  )
                }
                else if (this.state.IsActiveBtnEnable == 'Select') {
                  return (
                    <View style={{ height: "100%" }}>
                      <View style={{ padding: 10 }}>
                        <DatePicker
                          style={{ width: "100%", backgroundColor: "white", paddingTop: 5, paddingBottom: 5, borderColor: "black", borderWidth: 1, borderRadius: 10 }}
                          date={this.state.Eventdate}
                          mode="date"
                          // placeholder="select date"
                          format="YYYY-MM-DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateInput: {
                              borderWidth: 0
                            },
                            placeholderText: {
                              fontSize: 20,
                              color: "black",
                              fontWeight: "bold,"
                            },
                            dateText: {
                              fontSize: 20,
                              color: "black",
                              // textAlign: "left",
                              fontWeight: "bold,"
                            }

                            // ... You can check the source to find the other keys.
                          }}
                          // onDateChange={this.EventDateChnage}
                          // onDateChange={(Eventdate) => { this.setState({ date: Eventdate }) }}
                          onDateChange={(Eventdate) => this.dateChange(Eventdate)}
                        />
                      </View>
                      <View>
                        <EventsList eventList={EventsByCustomDate} />
                      </View>
                    </View>
                  )
                }
              })()
            }
          </View>

          <View>
            {/* {EventtabContent} */}
          </View>

        </View>

        <View>
          <TouchableOpacity
            onPress={
              () => this.GotoCreateEventPage()}
            style={{ height: 60, width: 60, borderRadius: 25, position: 'absolute', bottom: 10, right: 20, backgroundColor: '#537cee', alignItems: 'center', }}>
            <View>
              <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    );
  };
}

const styles = StyleSheet.create({
  TabText: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 20,
    paddingRight: 5,
    paddingLeft: 5
  },
  TabDot: {
    display: "none"
  },
  TabActiveText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    paddingRight: 5,
    paddingLeft: 5
  },
  TabActiveDot: {
    fontWeight: "bold",
    fontSize: 50,
    // marginLeft: 25,
    marginTop: -40,
    color: "black",
    textAlign: "center"
  },

});

export default EventsHomePage;
