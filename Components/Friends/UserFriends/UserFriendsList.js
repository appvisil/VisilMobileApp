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
import { SearchBar } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import firestore from '@react-native-firebase/firestore';
import FireBaseFunctions from "../../APIs/FireBaseFunctions";
import SyncStorage from 'sync-storage';

class UserFriendsList extends React.Component {
    services = new FireBaseFunctions();

    userObj = {};
    FriendsList=[];
    constructor(props) {
        super(props);
        //this.userObj = props.route.params;
        //this.userObj = this.services.userData;
        this.userObj = JSON.parse(SyncStorage.get('userData'));
        console.log(this.userObj);
        this.state = {
            email: '',
            password: '',
            isDisplay: '1',
            isLoading:false
        }
        this.getFriendsList();
    }

    getFriendsList=async()=>{
            this.setState({ isLoading: true });
            this.FriendsList = [];
            let FriendsList = [];
            await firestore().collection("Friends").where('UserId', '==', this.userObj.UserId).get().then((querySnapshot) => {
                querySnapshot.docs.forEach(doc => {
                    FriendsList.push(doc.data());
                });

                this.FriendsList = FriendsList;
                this.setState({ isLoading: false });
    
                });
    }

    SelectFollowersTab = () => {
        this.setState({ isDisplay: '1' });
    }
    SelectFollowingTab = () => {
        this.setState({ isDisplay: '2' });
    }
    BacktoUserProfilePage = () => {
        this.props.navigation.navigate('Suggest Friends')
    }

    render() {
        let FollowersTabFeild;
        let FollowingTabFeild;
        if (this.FriendsList.length > 0) {
            FollowersTabFeild = this.FriendsList.map((item, index) => (
                    <View style={styles.FriendListView}>
                        <View style={{ width: "20%" }}>
                            <Image source={require('../../Images/user.jpg')}
                                style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 20,
                                }} />
                        </View>
                        <View style={{ width: "70%", paddingLeft: 10 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>{item.UserName}</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>2 Mutual friends</Text>
                        </View>
                        <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
                                    <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            ))
        } else {
            FollowersTabFeild = <Text>List not found</Text>
        }

        if (this.FriendsList.length > 0) {
            FollowingTabFeild = this.FriendsList.map((item, index) => (
                    <View style={styles.FriendListView}>
                        <View style={{ width: "20%" }}>
                            <Image source={require('../../Images/user.jpg')}
                                style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 20,
                                }} />
                        </View>
                        <View style={{ width: "70%", paddingLeft: 10 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>{item.UserName}</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>2 Mutual friends</Text>
                        </View>
                        <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
                            <TouchableOpacity>
                                <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
                                    <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            ))
        } else {
            FollowingTabFeild = <Text>List not found</Text>
        }

        // const FollowersTabFeild = <View style={{ marginBottom: 100 }}>
        //     <ScrollView>
        //         <View style={styles.FriendListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 70,
        //                         width: 70,
        //                         borderRadius: 20,
        //                     }} />
        //             </View>
        //             <View style={{ width: "70%", paddingLeft: 10 }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>Ajay</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>2 Mutual friends</Text>
        //             </View>
        //             <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
        //                         <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
        //                     </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>

        //         <View style={styles.FriendListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 70,
        //                         width: 70,
        //                         borderRadius: 20,
        //                     }} />
        //             </View>
        //             <View style={{ width: "70%", paddingLeft: 10 }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>Prasad</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>12 Mutual friends</Text>
        //             </View>
        //             <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
        //                         <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
        //                     </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>

        //     </ScrollView>
        // </View>;

        // const FollowingTabFeild = <View style={{ marginBottom: 100 }}>
        //     <ScrollView>
        //         <View style={styles.FollowerListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 70,
        //                         width: 70,
        //                         borderRadius: 20,
        //                     }} />
        //             </View>
        //             <View style={{ width: "50%", paddingLeft: 10 }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>Ramana</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>5 Mutual friends</Text>
        //             </View>
        //             <View style={{ width: "30%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, fontSize: 25, fontWeight: "bolod", color: "white", padding: 5 }}>
        //                         Following
        //                 </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //         <View style={styles.FollowerListView}>
        //             <View style={{ width: "20%" }}>
        //                 <Image source={require('../../Images/user.jpg')}
        //                     style={{
        //                         height: 70,
        //                         width: 70,
        //                         borderRadius: 20,
        //                     }} />
        //             </View>
        //             <View style={{ width: "50%", paddingLeft: 10 }}>
        //                 <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>Prem</Text>
        //                 <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>2 Mutual friends</Text>
        //             </View>
        //             <View style={{ width: "30%", textAlign: "center", paddingTop: 5 }}>
        //                 <TouchableOpacity>
        //                     <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, fontSize: 25, fontWeight: "bolod", color: "white", padding: 5 }}>
        //                         Following
        //                 </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>


        //     </ScrollView>
        // </View>;

        const FollowersTab = <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={
                    () => this.SelectFollowersTab()
                }>
                <Text style={styles.SelectedTabBtn}> Followers </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectFollowingTab()
                }>
                <Text style={styles.TabBtn}> Following </Text>
            </TouchableOpacity>

        </View>;

        const FollowingTab = <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={
                    () => this.SelectFollowersTab()
                }>
                <Text style={styles.TabBtn}> Followers </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectFollowingTab()
                }>
                <Text style={styles.SelectedTabBtn}> Following </Text>
            </TouchableOpacity>
        </View>;
        return (
            <View style={{ backgroundColor: "black", height: "100%" }}>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "25%", margin: 20, }}>
                        <TouchableOpacity onPress={
                            () => this.BacktoUserProfilePage()}>
                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 20, }}>Friends List</Text>
                    </View>
                </View>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.email}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white', }}
                        inputContainerStyle={{ backgroundColor: 'white', height: 40 }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 5, width: "90%", margin: 10, marginLeft: 20, borderWidth: 1, height: 55 }}
                    />
                </View>

                <View style={{ marginTop: 20, }}>
                    <View style={styles.TabsBlock}>
                        {this.state.isDisplay <= 1 ? FollowersTab : FollowingTab}
                    </View>
                    <View>
                        {this.state.isDisplay <= 1 ? FollowersTabFeild : FollowingTabFeild}
                    </View>
                </View>


            </View>
        );
    };
}

const styles = StyleSheet.create({
    FriendListView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,

    },
    FollowerListView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
    },
    TabBtn: {
        padding: 15,
        paddingTop: 5,
        //margin: 20,
        //marginLeft: 50,
        marginBottom: 5,
        fontSize: 20,
        color: "gray",
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
        color: "white",
        width: 200,
        textAlign: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
});

export default UserFriendsList;
