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
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import FireBaseFunctions from "../../APIs/FireBaseFunctions";
import SyncStorage from 'sync-storage';

class UserFriendRequestsList extends React.Component {
   services = new FireBaseFunctions();

    ReceivedList = [];
    sendList = [];
    userObj = {};
    constructor(props) {
        super(props);
        //this.userObj = props.route.params;
        //this.userObj = this.services.userData;
        this.userObj = JSON.parse(SyncStorage.get('userData'));
        console.log(this.userObj);
        this.state = {
            email: '',
            password: '',
            isDisplayReq: '1',
            isLoading: false
        }
         this.getReceivedFriendRequests();
         this.getSendFriendRequests();
    }

    getReceivedFriendRequests = async () => {
        this.setState({ isLoading: true });
        await firestore().collection('FriendRequests')
            .where('ReceiverData.UserId', "==", this.userObj.UserId)
            .limit(10)
            .onSnapshot((snapshot) => {
                let ReceivedList = [];
                snapshot.docs.forEach(function (doc) {
                    console.log(doc.data());
                    ReceivedList.push(doc.data());
                });
                this.ReceivedList = ReceivedList;
                this.setState({ isLoading: false })

            });
    }

    getSendFriendRequests = async () => {
        this.setState({ isLoading: true });
        await firestore().collection('FriendRequests')
            .where('SenderData.UserId', "==", this.userObj.UserId)
            .limit(10)
            .onSnapshot((snapshot) => {
                let sendList = [];
                snapshot.docs.forEach(function (doc) {
                    console.log(doc.data());
                    sendList.push(doc.data());
                });
                this.sendList = sendList;
                console.log(this.sendList);
                this.setState({ isLoading: false })

            });
    }

    SelecFrndReqTab = () => {
        this.setState({ isDisplayReq: '1' });
    }
    SelectFrndSentReqTab = () => {
        this.setState({ isDisplayReq: '2' });
    }

    GoToSentUserProfile = (UserData) => {
        console.log(UserData);
        this.props.navigation.navigate('UserSendFrndReqProfileView', UserData)
    }

    GoToReceiveUserProfile = (UserData) => {
        console.log(UserData);
        this.props.navigation.navigate('UserReceivedFrndReqProfileView', UserData)
    }

    AddFriend = async(friendData) => {
        console.log(friendData);
        await firestore().collection("Friends").doc(friendData.UserId).set(this.userObj);
        await firestore().collection("Friends").doc(this.userObj.UserId).set(friendData);
        this.props.navigation.navigate('Friends', this.userObj)

    }

    BackToFriendSuggestions=()=>{
        this.props.navigation.navigate('Suggest Friends', this.userObj)
    }

    render() {
        let FrndReqTabFeild;
        let FrndSentReqTabFeild;
        if (this.ReceivedList.length > 0) {
            FrndReqTabFeild = this.ReceivedList.map((item, index) => (
                <View>

                    <View style={{ padding: 10, marginBottom: 100 }}>

                        <ScrollView>
                            <View style={styles.FriendReqListView}>

                                <TouchableOpacity style={{ width: "70%", flexDirection: "row" }}
                                    onPress={
                                        () => this.GoToReceiveUserProfile(item.SenderData)
                                    }>
                                    <View style={{ width: "30%" }}>
                                        <Image source={require('../../Images/user.jpg')}
                                            style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 50,
                                            }} />
                                    </View>
                                    <View style={{ width: "70%" }}>
                                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item.SenderData.UserName}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>5 Mutual Friends</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", width: "30%", textAlign: "center", paddingTop: 5 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.AddFriend(item.SenderData)
                                        }>
                                        <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, marginRight: 10 }}>
                                            <MaterialIcons name="person-add" size={35} style={{ color: "black" }} />
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5 }}>
                                            <MaterialCommunityIcons name="account-remove" size={35} style={{ color: "black" }} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </View >
            ))
        } else {
            FrndReqTabFeild = <Text>List not found</Text>
        }

        if (this.sendList.length > 0) {
            FrndSentReqTabFeild = this.sendList.map((item, index) => (
                <View>

                    <View>

                        <ScrollView>
                            <View style={styles.SentFriendReqListView}>
                                <TouchableOpacity style={{ width: "70%", flexDirection: "row" }}
                                    onPress={
                                        () => this.GoToSentUserProfile(item.ReceiverData)
                                    }>
                                    <View style={{ width: "30%" }}>
                                        <Image source={require('../../Images/user.jpg')}
                                            style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 50,
                                            }} />
                                    </View>
                                    <View style={{ width: "70%" }}>
                                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item.ReceiverData.UserName}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>2 Mutual Friends</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: "30%", textAlign: "center", paddingTop: 5 }}>
                                    <TouchableOpacity>
                                        <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, fontSize: 25, fontWeight: "bolod", color: "black", textAlign: "center" }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </View >
            ))
        } else {
            FrndSentReqTabFeild = <Text>List not found</Text>
        }
        //         const FrndReqTabFeild = <View style={{ padding: 20, marginBottom: 100 }}>

        // <ScrollView>
        //                 <View style={styles.FriendReqListView}>
        //                     <View style={{ width: "20%" }}>
        //                         <Image source={require('../../Images/user.jpg')}
        //                             style={{
        //                                 height: 60,
        //                                 width: 60,
        //                                 borderRadius: 50,
        //                             }} />
        //                     </View>
        //                     <View style={{ width: "50%" }}>
        //                         <Text style={{ fontSize: 25, fontWeight: "bold" }}>Kiran</Text>
        //                         <Text style={{ fontSize: 20, fontWeight: "bold" }}>5 Mutual Friends</Text>
        //                     </View>
        //                     <View style={{ flexDirection: "row", width: "30%", textAlign: "center", paddingTop: 5 }}>
        //                         <TouchableOpacity  >
        //                             <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, marginRight: 10 }}>
        //                                 <MaterialIcons name="person-add" size={35} style={{ color: "black" }} />
        //                             </Text>
        //                         </TouchableOpacity>

        //                         <TouchableOpacity>
        //                             <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5 }}>
        //                                 <MaterialCommunityIcons name="account-remove" size={35} style={{ color: "black" }} />
        //                             </Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>

        //                 <View style={styles.FriendReqListView}>
        //                     <View style={{ width: "20%" }}>
        //                         <Image source={require('../../Images/user.jpg')}
        //                             style={{
        //                                 height: 60,
        //                                 width: 60,
        //                                 borderRadius: 50,
        //                             }} />
        //                     </View>
        //                     <View style={{ width: "50%" }}>
        //                         <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ravi</Text>
        //                         <Text style={{ fontSize: 20, fontWeight: "bold" }}>3 Mutual Friends</Text>
        //                     </View>
        //                     <View style={{ flexDirection: "row", width: "30%", textAlign: "center", paddingTop: 5 }}>
        //                         <TouchableOpacity  >
        //                             <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, marginRight: 10 }}>
        //                                 <MaterialIcons name="person-add" size={35} style={{ color: "black" }} />
        //                             </Text>
        //                         </TouchableOpacity>

        //                         <TouchableOpacity>
        //                             <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5 }}>
        //                                 <MaterialCommunityIcons name="account-remove" size={35} style={{ color: "black" }} />
        //                             </Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </View>

        //             </ScrollView>
        //         </View>;

        // const FrndSentReqTabFeild = <View style={{ padding: 20, marginBottom: 100 }}>

        //     <ScrollView>
        //         <View style={styles.SentFriendReqListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 60,
        //                         width: 60,
        //                         borderRadius: 50,
        //                     }} />
        //             </View>
        //             <View style={{ width: "55%" }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ajay</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>2 Mutual Friends</Text>
        //             </View>
        //             <View style={{ width: "25%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, fontSize: 25, fontWeight: "bolod", color: "black" }}>
        //                         Cancel
        //                     </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>

        //         <View style={styles.SentFriendReqListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 60,
        //                         width: 60,
        //                         borderRadius: 50,
        //                     }} />
        //             </View>
        //             <View style={{ width: "55%" }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Kumar</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>10 Mutual Friends</Text>
        //             </View>
        //             <View style={{ width: "25%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 5, fontSize: 25, fontWeight: "bolod", color: "black" }}>
        //                         Cancel
        //                     </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </ScrollView>
        // </View>;

        const FrndReqTab = <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
                onPress={
                    () => this.SelecFrndReqTab()
                }>
                <Text style={styles.SelectedTabBtn}> Received ({this.ReceivedList.length}) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectFrndSentReqTab()
                }>
                <Text style={styles.TabBtn}> Sent ({this.sendList.length}) </Text>
            </TouchableOpacity>

        </View>;

        const FrndSentReqTab = <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={
                    () => this.SelecFrndReqTab()
                }>
                <Text style={styles.TabBtn}> Received ({this.ReceivedList.length}) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectFrndSentReqTab()
                }>
                <Text style={styles.SelectedTabBtn}> Sent ({this.sendList.length})</Text>
            </TouchableOpacity>
        </View>;
        return (
            <View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "25%", margin: 20, }}>
                        <TouchableOpacity
                         onPress={
                            () => this.BackToFriendSuggestions()
                        }
                        >

                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 20, }}>Friend Requests</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, }}>
                    <View style={styles.TabsBlock}>
                        {this.state.isDisplayReq <= 1 ? FrndReqTab : FrndSentReqTab}
                    </View>
                    <View>
                        {this.state.isDisplayReq <= 1 ? FrndReqTabFeild : FrndSentReqTabFeild}
                    </View>
                </View>


            </View>
        );
    };
}

const styles = StyleSheet.create({
    FriendReqListView: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    SentFriendReqListView: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    TabBtn: {
        padding: 15,
        paddingTop: 5,
        //margin: 20,
        //marginLeft: 50,
        marginBottom: 5,
        fontSize: 20,
        color: "black",
        width: 200,
        textAlign: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    SelectedTabBtn: {
        padding: 15,
        paddingTop: 5,
        marginBottom: 5,
        //margin: 20,
        fontSize: 20,
        color: "blue",
        width: 200,
        textAlign: 'center',
        borderBottomColor: '#4d089e',
        borderBottomWidth: 2
    },
});

export default UserFriendRequestsList;
