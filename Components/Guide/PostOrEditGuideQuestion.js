
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

import Ionicons from 'react-native-vector-icons/Ionicons';
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


class PostOrEditGuideQuestion extends React.Component {
    // services = services = new FireBaseFunctions();
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            PostMsg: "",

        }
    }
    GoBacktoGuideDetailsPage = () => {
        this.props.navigation.navigate('GuideDetailsPage')
    }


    render() {

        return (
            <View style={styles.PostMain}>
                <View style={styles.PostTop}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                            <TouchableOpacity  onPress={() => this.GoBacktoGuideDetailsPage()}   style={{ borderWidth: 1, borderRadius: 15, }}>
                                <AntDesign name="arrowleft" size={20} style={{ margin: 10, color: "black" }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", width: "60%" }}>
                            <View style={{ margin: 20 }}>
                                <Image source={require('../Images/user.jpg')}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 10,
                                    }} />
                            </View>
                            <View style={{ margin: 20, marginLeft: 0 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 10, color: "black" }}>Hanuman</Text>
                                {/* <Text style={{ fontWeight: "bold", fontSize: 20 }}>5min ago</Text> */}
                            </View>
                        </View>


                    </View>
                    <View style={{ width: "90%", margin: "5%", marginTop: 10 }}>
                        <TextInput
                            style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                            value={this.state.PostMsg}
                            placeholder="write your Question"
                            onChangeText={text => this.setState({ PostMsg: text })}
                            multiline={true}
                            numberOfLines={6}
                        />
                    </View>

                </View>
                <View style={styles.PostBottom}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ margin: 10, marginLeft: 20 }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                    <MaterialIcons name="camera-alt" size={20} style={{ margin: 10, color: "white" }} />

                                </TouchableOpacity>

                            </View>
                            <View style={{ margin: 10, }}>
                                <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Add Photo/Video</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.PostFooter}>
                  
                        <TouchableOpacity onPress={() => this.SharePost()} style={{ borderRadius: 25, margin: 20, marginTop: 35, backgroundColor: '#1e74f5', padding:10,paddingRight:25,paddingLeft:25 }}>
                            <Text style={{ fontSize: 20, color: "white",}}>Post Question</Text>
                            {/* <Text style={{ fontSize: 25, margin: 5, color: "#1e74f5" }}><Entypo name="emoji-happy" size={25} style={{ margin: 10, color: "#1e74f5" }} /> Friends <AntDesign name="down" size={20} style={{ margin: 10, color: "#1e74f5" }} /></Text> */}
                        </TouchableOpacity>
                   
                </View>

            </View>

        );
    };
}

const styles = StyleSheet.create({
    PostTop: {
        width: "100%",
        height: "50%",
        paddingTop: 10
    },
    PostMain: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        //alignItems: 'center',
    },
    PostBottom: {
        width: "100%",
        height: "35%",
        backgroundColor: 'white',
        //borderBottomColor: "grey",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        //alignItems: 'center',

    },
    PostFooter: {
        //flexDirection: "row",
        width: "100%",
        height: "15%",
        alignItems:"center",
        //backgroundColor: '#1e74f5',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        //textAlign:"center"
    },
    HeadingText: {
        color: "white",
        margin: 30,
        fontSize: 20,
        fontWeight: "bold",
    },
    BackBtn: {
        color: "white",
        margin: 20,
        marginTop: 0,
        fontSize: 20,
    },

    RightBtn: {
        color: "white",
        // margin: 20,
        // marginTop: 0,
        right: 0,
        fontSize: 20,
    },
    input: {
        color: "black",
        fontSize: 20
    },
    Replyinput: {
        color: "white",
        fontSize: 20
    },




});

export default PostOrEditGuideQuestion;
