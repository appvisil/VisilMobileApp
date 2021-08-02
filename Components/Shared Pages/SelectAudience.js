
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


class SelectAudience extends React.Component {
    //services = services = new FireBaseFunctions();
    userObj = {};
    constructor(props) {
        super(props);
        this.userObj = props.route.params;
        this.state = {
            isloading: true,
        }


    }

    ShareFriends = () => {
        this.props.navigation.navigate('SelectFriends',this.userObj)

    }

    GoBack = () => {
        this.props.navigation.navigate('HomePage',this.userObj)

    }


    render() {
        return (
            <View style={styles.Audience}>
                <View style={styles.AudienceTop}>
                    <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                        <TouchableOpacity onPress={
                                    () => this.GoBack()
                                }style={{}}>
                            <AntDesign name="arrowleft" size={30} style={{ color: "black" }} />

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "90%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: -50, color: "black" }}>Select Audience</Text>
                    </View>
                </View>
                <View style={styles.AudienceBottom}>
                    <View style={styles.AudienceBottomCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "80%", }}>
                                <View style={{ width: "20%" }}>
                                    {/* <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                            margin: 10
                                        }} /> */}
                                        <Text  style={{height: 50,width: 50,borderRadius: 25,margin: 10,backgroundColor:"#c1c1c1",padding:10,paddingLeft:12}}>
                                        <FontAwesome name="globe" size={30} style={{ color: "black", }} />
                                        </Text>

                                </View>
                                <View style={{ marginLeft: 10, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>Public</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>Any one can see your post</Text>
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
                    <View style={styles.AudienceBottomCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "80%", }}>
                                <View style={{ width: "20%" }}>
                                    {/* <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                            margin: 10
                                        }} /> */}
                                        <Text  style={{height: 50,width: 50,borderRadius: 25,margin: 10,backgroundColor:"#c1c1c1",padding:9,}}>
                                        <FontAwesome5 name="user-friends" size={25} style={{ color: "black", }} />
                                        </Text>
                                </View>
                                <View style={{ marginLeft: 10, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>Friends</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>Friends can see your post</Text>
                                </View>
                            </View>
                            <View style={{ width: "20%" }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.ShareFriends()
                                    } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, alignItems: 'center', }}>
                                    <AntDesign name="right" size={30} style={{ color: "black" }} />
                                    <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}></Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View style={styles.AudienceBottomCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "80%", }}>
                                <View style={{ width: "20%" }}>
                                    {/* <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                            margin: 10
                                        }} /> */}
                                        <Text  style={{height: 50,width: 50,borderRadius: 25,margin: 10,backgroundColor:"#c1c1c1",padding:10,}}>
                                        <FontAwesome name="group" size={30} style={{ color: "black", }} />
                                        </Text>
                                </View>
                                <View style={{ marginLeft: 10, width: "80%" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>Community</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, }}>Community people can see your post</Text>
                                </View>
                            </View>
                            <View style={{ width: "20%" }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.ShareFriends()
                                    } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, alignItems: 'center', }}>
                                    <AntDesign name="right" size={30} style={{ color: "black" }} />
                                    <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}></Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({

    Audience: {
        width: "100%",
        height: "100%",
        backgroundColor:"white"
    },
    AudienceTop: {
        flexDirection: "row",
        width: "100%",
        height: "10%",
        borderBottomColor: "#1f1f21",
        borderBottomWidth: 1,
        backgroundColor: "white",
    },
    AudienceBottom: {
        //flexDirection: "row",
        width: "100%",
        //height: "95%",
        marginTop:20,
        backgroundColor: "white",
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,

    },
    AudienceBottomCard: {
        flexDirection: "row",
        //margin: 5,
        width: "100%",
    }
});

export default SelectAudience;
