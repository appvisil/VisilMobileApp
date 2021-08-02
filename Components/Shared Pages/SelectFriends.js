
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
    ImageBackground
} from 'react-native';


import { Image } from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';


class SelectFriends extends React.Component {
    //services = services = new FireBaseFunctions();
    userObj = {};
    constructor(props) {
        super(props);
        console.log(props.route.params);
        this.userObj = props.route.params;
        this.state = {
            isloading: true,
        }


    }

    GoBack = () => {
        this.props.navigation.navigate('SelectAudience',this.userObj);

    }

    SaveFriends=()=>{
        this.props.navigation.navigate('CreatPost',this.userObj);
    }

    render() {
        return (
            <View style={styles.Friends}>
                <View style={styles.FriendsTop}>
                    <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                        <TouchableOpacity onPress={
                            () => this.GoBack()
                        }
                            style={{}}>
                            <AntDesign name="arrowleft" size={30} style={{ color: "black" }} />

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "90%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: -50, color: "black" }}>Select Friends</Text>
                    </View>
                </View>
                <View style={styles.FriendsBottom}>
                    <View style={styles.FriendsBottomCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "80%", }}>
                                <View style={{ width: "20%" }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                            margin: 10
                                        }} />

                                </View>
                                <View style={{ marginLeft: 10, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>User Name</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>USA</Text>
                                </View>
                            </View>
                            <View style={{ width: "20%" }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.ChangePage('Friends')
                                    } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, alignItems: 'center', }}>
                                    <Entypo name="circle" size={30} style={{ color: "black" }} />
                                    <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}></Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={styles.FriendsBottomCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "80%", }}>
                                <View style={{ width: "20%" }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                            margin: 10
                                        }} />

                                </View>
                                <View style={{ marginLeft: 10, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>User Name</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>USA</Text>
                                </View>
                            </View>
                            <View style={{ width: "20%" }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.ChangePage('Friends')
                                    } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, alignItems: 'center', }}>
                                    <Entypo name="circle" size={30} style={{ color: "black" }} />
                                    <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}></Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.FriendsFooter}>
                    <View style={{ margin: 15, marginLeft: 20,width:"40%" }}>
                        <TouchableOpacity onPress={
                            () => this.SaveFriends()
                        }
                            style={{ borderWidth: 1, borderRadius: 15,padding:10,alignItems:"center" }}>
                                <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}>
                                    Save
                                </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ margin: 15, marginLeft: 20,width:"40%" }}>
                        <TouchableOpacity onPress={
                            () => this.GoBack()
                        }
                            style={{ borderWidth: 1, borderRadius: 15,padding:10,alignItems:"center"  }}>
                                <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}>
                                    Cancel
                                </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({

    Friends: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    FriendsTop: {
        flexDirection: "row",
        width: "100%",
        height: "10%",
        borderBottomColor: "#1f1f21",
        borderBottomWidth: 1,
        backgroundColor: "white",
    },
    FriendsBottom: {
        //flexDirection: "row",
        width: "100%",
        height: "80%",
        //margin: "5%",
        backgroundColor: "white",
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,

    },
    FriendsBottomCard: {
        flexDirection: "row",
        //margin: "5%",
        width: "90%",
    },
    FriendsFooter: {
        flexDirection: "row",
        width: "100%",
        height: "10%",
        borderTopColor: "#1f1f21",
        borderTopWidth: 1,
    },

});

export default SelectFriends;
