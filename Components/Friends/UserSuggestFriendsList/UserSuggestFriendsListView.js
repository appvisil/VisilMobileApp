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
import { SearchBar } from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/AntDesign';


import firestore from '@react-native-firebase/firestore';

import Filter from '../../APIs/model';
import FireBaseFunctions from "../../APIs/FireBaseFunctions";

import SyncStorage from 'sync-storage';

class UserSuggestFriendsListView extends React.Component {
    services = new FireBaseFunctions();
    FriendsList = [];
    userObj = {};
    constructor(props) {
        super();
        //this.userObj = props.route.params;
        //this.userObj = this.services.userData;
        this.userObj = JSON.parse(SyncStorage.get('userData'));

        console.log(this.userObj);
        this.state = {
            searchValue: '',
            isloading: true,
            IsSearch: 'Name',
        }
        this.getUserData();
    }

    TabChange = (text) => {
        this.setState({ IsSearch: text });
        this.setState({ searchValue: "" })
    }

    getUserData = async () => {
        this.setState({ isLoading: true });
        await firestore().collection('users').limit(5)
            .onSnapshot((snapshot) => {
                let FriendsList = [];
                snapshot.docs.forEach(function (doc) {
                    console.log(doc.data());
                    FriendsList.push(doc.data());
                });
                this.FriendsList = FriendsList;
                this.setState({ isLoading: false })

            });
    }

    updateSearch = async (text) => {
        this.setState({ searchValue: text })
        this.setState({ isLoading: true });

        if (this.state.IsSearch == "Name") {
            this.FriendsList = [];
            let FriendsList = [];
            await firestore().collection('users').where('UserName', '>=', text).where('UserName', '<=', text + '\uf8ff').get().then((querySnapshot) => {
                querySnapshot.docs.forEach(doc => {
                    FriendsList.push(doc.data());
                });

                this.FriendsList = FriendsList;
                this.setState({ isLoading: false });

            });
        } else if (this.state.IsSearch == "Mobile Number") {
            this.FriendsList = [];
            let FriendsList = [];
            firestore().collection('users').orderBy('Mobile', "asc").startAt(text).endAt(text + "\uf8ff").get().then((querySnapshot) => {
                querySnapshot.docs.forEach(doc => {
                    FriendsList.push(doc.data());
                });
                this.FriendsList = FriendsList;
                this.setState({ isLoading: false });

            });
        } else if (this.state.IsSearch == "E-mail") {
            this.FriendsList = [];
            let FriendsList = [];
            firestore().collection('users').orderBy('Email', "asc").startAt(text).endAt(text + "\uf8ff").get().then((querySnapshot) => {
                querySnapshot.docs.forEach(doc => {
                    FriendsList.push(doc.data());
                });
                this.FriendsList = FriendsList;
                this.setState({ isLoading: false });

            });
        }

    }

    getDetailsByQuery(searchText) {
        return firestore().collection('users').orderBy('UserName').startAt(searchText).endAt(searchText + "\uf8ff").get().then(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
                let docData = doc.data();
                docData['id'] = doc.id;
                data.push(docData);
            });
            console.log(data);
            return data;
        })
            .catch(err => {
                console.log('err', err);
            });


        // let filters = [
        //     new Filter("UserName", null, 'orderBy'),
        //     new Filter("", searchText, 'startAt'),
        //     new Filter("", searchText, 'endAt'),
        // ];
        // return firestore().collection('users', ref => {
        //     let query = ref;
        //     if (filters && filters.length) {
        //       filters.forEach(filter => {
        //         if (filter.operation === 'orderBy') {
        //           if (filter.fieldValue != null)
        //               query = query.orderBy(filter.modelFieldName, filter.fieldValue);
        //           else
        //               query = query.orderBy(filter.modelFieldName);
        //       }
        //       else if (filter.operation === 'limit') {
        //           query = query.limit(filter.fieldValue);
        //       }
        //       else if (filter.operation === 'startAt') {
        //           query = query.startAt(filter.fieldValue)
        //       }
        //       else if (filter.operation === 'endAt') {
        //           query = query.endAt(filter.fieldValue + "\uf8ff")
        //       }
        //       else {
        //           query = query.where(filter.modelFieldName, filter.operation, filter.fieldValue);
        //       }
        //       });
        //     }
        //     return query;
        //   })
        //   .get().then(querySnapshot => {
        //     let data = [];
        //     console.log(querySnapshot);
        //     querySnapshot.forEach(doc => {
        //       let docData = doc.data();
        //       docData['id'] = doc.id;
        //       data.push(docData);
        //     });
        //     return data;
        //   })
        //   .catch(err => {
        //     console.log('err', err);
        //   });
    }

    AddFriend = async (item) => {
        const friendReqId = this.services.getGuid();
        console.log(item);
        let friendReqData = {
            id: friendReqId,
            ReceiverData: item,
            SenderData: this.userObj
        };
        await firestore().collection("FriendRequests").doc(friendReqData.id).set(friendReqData);
        this.props.navigation.navigate('Friend Requests', this.userObj)
    }

    GoToUserProfile = (UserData) => {
        console.log(UserData);
        this.props.navigation.navigate('UserSuggFrndsListProfileView',UserData)

    }

    render() {
        let FriendsGrid;
        if (this.FriendsList.length > 0) {
            FriendsGrid = this.FriendsList.map((item, index) => (
                <View>
                    <View style={styles.SuggFriendListView}>
                        <TouchableOpacity style={{ width: "75%", flexDirection: "row" }}
                            onPress={
                                () => this.GoToUserProfile(item)
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
                                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item.UserName}</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>5 Mutual Friends</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", width: "25%", textAlign: "center", paddingTop: 10 }}>
                            <TouchableOpacity onPress={
                                () => this.AddFriend(item)
                            } >
                                <Text style={{ borderColor: '#5596e6', borderWidth: 1, borderRadius: 10, backgroundColor: "#5596e6", padding: 5, fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", }}>
                                    Add Friend
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>

                </View >
            ))
        } else {
            FriendsGrid = <Text>List not found</Text>
        }
        return (
            <View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "20%", margin: 20, }}>
                        {/* <TouchableOpacity>
                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ width: "80%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 20, }}>Suggested Friends</Text>
                    </View>
                </View>


                <View>
                    <View style={{ width: "100%", flexDirection: "row", margin: 20, marginBottom: 0 }}>
                        <ScrollView horizontal={true} >
                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange("Name")
                                } style={{ margin: 5, marginBottom: 0 }}>
                                <Text style={[(this.state.IsSearch == 'Name') ? styles.TabActiveText : styles.TabText]}>Name</Text>
                                <Text style={[(this.state.IsSearch == 'Name') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('Mobile Number')
                                } style={{ margin: 5, marginBottom: 0 }}>
                                <Text style={[(this.state.IsSearch == 'Mobile Number') ? styles.TabActiveText : styles.TabText]}>Mobile Number</Text>
                                <Text style={[(this.state.IsSearch == 'Mobile Number') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('E-mail')
                                } style={{ margin: 5, marginBottom: 0 }}>
                                <Text style={[(this.state.IsSearch == 'E-mail') ? styles.TabActiveText : styles.TabText]}>E-mail</Text>
                                <Text style={[(this.state.IsSearch == 'E-mail') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>

                        </ScrollView>
                    </View>

                    {/* <Text style={{ color:"#5596e6",fontSize:20,margin:20,marginBottom:0,fontWeight: "bold", }}>Name | Mobile Number | E-mail</Text> */}
                    <SearchBar
                        placeholder={"Enter " + this.state.IsSearch}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white', }}
                        onChangeText={this.updateSearch}
                        value={this.state.searchValue}
                        inputContainerStyle={{ backgroundColor: 'white', height: 40 }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 5, width: "90%", margin: 10, marginLeft: 20, borderWidth: 1, height: 55 }}
                    />
                </View>
                <View style={{ padding: 20, marginBottom: 100 }}>
                    <ScrollView>
                        {FriendsGrid}
                    </ScrollView>
                    {/* <View style={styles.SuggFriendListView}>
                            <View style={{ width: "20%" }}>
                                <Image source={require('../../Images/user.jpg')}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 50,
                                    }} />
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Kiran</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>5 Mutual Friends</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "30%", textAlign: "center", paddingTop: 10 }}>
                                <TouchableOpacity>
                                    <Text style={{ borderColor: '#5596e6', borderWidth: 1, borderRadius: 10, backgroundColor: "#5596e6", padding: 5, fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", }}>
                                        Add Friend
                         </Text>
                                </TouchableOpacity>


                            </View>
                        </View>

                        <View style={styles.SuggFriendListView}>
                            <View style={{ width: "20%" }}>
                                <Image source={require('../../Images/user.jpg')}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 50,
                                    }} />
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ajay</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>10 Mutual Friends</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "30%", textAlign: "center", paddingTop: 10 }}>
                                <TouchableOpacity>
                                    <Text style={{ borderColor: '#5596e6', borderWidth: 1, borderRadius: 10, backgroundColor: "#5596e6", padding: 5, fontSize: 20, fontWeight: "bolod", color: "white", textAlign: "center", }}>
                                        Add Friend
                         </Text>
                                </TouchableOpacity>


                            </View>
                        </View> */}
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    SuggFriendListView: {
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
        borderBottomWidth: 2,
        borderBottomColor: "#5596e6",
        //textDecorationLine: 'underline',
        color: "#5596e6",
        paddingRight: 5,
        paddingLeft: 5
    },
    // TabActiveDot: {
    //     fontWeight: "bold",
    //     fontSize: 50,
    //     marginTop: -40,
    //     color: "black",
    //     textAlign: "center"
    // },
});

export default UserSuggestFriendsListView;