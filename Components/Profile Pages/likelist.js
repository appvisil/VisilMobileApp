
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
    TouchableHighlight,
    Modal,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

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


import FireBaseFunctions from "../APIs/FireBaseFunctions";

class LikesList extends React.Component {
    services = services = new FireBaseFunctions();
    posts = [];
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isloading: true,
            IsActiveBtnEnable: 'Timeline',
            modalVisible: false,
        }

        // this.posts = this.services.getAllData("PostBlock");
        // console.log(this.posts.ImageURL);
    }

    // setModalVisible = (visible) => {
    //     this.setState({ modalVisible: visible });
    // }

    onPress = (url, index, event) => {
        // url and index of the image you have clicked alongwith onPress event.
    }

    updateSearch = (text) => {
        console.log(text);
        this.setState({ email: false });
    }

    render() {
        return (
            <View style={{ backgroundColor: "#e5e9f7", height: "100%" }}>
                <View style={styles.CommentsTop}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "20%", }}>
                            <TouchableOpacity
                                style={{ margin: 20 }}>
                                <AntDesign name="left" size={30} style={{ margin: 10, color: "black", }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "55%", }}>
                            <Text style={styles.HeadingText}>Likes(4)</Text>
                        </View>


                    </View>

                </View>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.email}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{backgroundColor: 'white',}}
                        inputContainerStyle={{backgroundColor: 'white',height:40}}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 5,width:"90%",margin:10,marginLeft:20,borderWidth: 1,height:55 }}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", margin: 5, borderRadius: 10, }}>
                    <View style={{ flexDirection: "row", width: "80%" }}>
                        <View style={{ margin: 5 }}>
                            <Image source={require('../Images/user.jpg')}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 10,
                                }} />
                        </View>
                        <View style={{ margin: 5, marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>User Name</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>@UserName</Text>
                        </View>
                    </View>
                    <View style={{ width: "20%" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.ChangePage('Friends')
                            } style={{ width: 50, margin: 20, borderColor: "black", borderWidth: 1, borderRadius: 10, alignItems: 'center', }}>
                            <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold", }}><AntDesign name="heart" size={30} style={{ margin: 20, color: "red" }} /></Text>

                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: "row", backgroundColor: "white", margin: 5, borderRadius: 10, }}>
                    <View style={{ flexDirection: "row", width: "80%" }}>
                        <View style={{ margin: 5 }}>
                            <Image source={require('../Images/user.jpg')}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 10,
                                }} />
                        </View>
                        <View style={{ margin: 5, marginLeft: 10, }}>
                            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>User Name</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>@UserName</Text>
                        </View>
                    </View>
                    <View style={{ width: "20%" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.ChangePage('Friends')
                            } style={{ width: 50, margin: 20, borderColor: "#f1033a", borderWidth: 1, borderRadius: 10, alignItems: 'center', }}>
                            <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold", }}><AntDesign name="heart" size={30} style={{ margin: 20, color: "#f1033a" }} /></Text>

                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: "row", backgroundColor: "white", margin: 5, borderRadius: 10, }}>
                    <View style={{ flexDirection: "row", width: "80%" }}>
                        <View style={{ margin: 5 }}>
                            <Image source={require('../Images/user.jpg')}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 10,
                                }} />
                        </View>
                        <View style={{ margin: 5, marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>User Name</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>@UserName</Text>
                        </View>
                    </View>
                    <View style={{ width: "20%" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.ChangePage('Friends')
                            } style={{ width: 50, margin: 20, alignItems: 'center', }}>
                            <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold", }}><AntDesign name="heart" size={30} style={{ margin: 20, color: "#f1033a" }} /></Text>

                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: "row", backgroundColor: "white", margin: 5, borderRadius: 10, }}>
                    <View style={{ flexDirection: "row", width: "85%" }}>
                        <View style={{ margin: 10 }}>
                            <Image source={require('../Images/user.jpg')}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 10,
                                }} />
                        </View>
                        <View style={{ margin: 10, marginLeft: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>User Name</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>@UserName</Text>
                        </View>
                    </View>
                    <View style={{ width: "15%" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.ChangePage('Friends')
                            } style={{ width: 50, margin: 5, marginTop: 10, alignItems: 'center', }}>
                            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold", }}><AntDesign name="heart" size={30} style={{ margin: 20, color: "#f1033a" }} /></Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        );
    };
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        height: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: "20%"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        //textAlign: "center"
    },
    HeadingText: {
        color: "black",
        margin: 30,
        fontSize: 20,
        fontWeight: "bold",
    },
    CommentsTop: {
        width: "100%",
        height: "10%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginBottom: 10
    },


});

export default LikesList;
