

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

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Svg, { Path } from "react-native-svg";
import { RadioButton } from 'react-native-paper';

import Amplify, { Auth } from 'aws-amplify';

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
import firestore from '@react-native-firebase/firestore';


class PostDetails extends React.Component {
    services = services = new FireBaseFunctions();
    posts = [];
    pictures = [];
    constructor(props, navigation) {
       // console.log("postData", props.route.params.ImageURL);
        super(props);
        this.state = {
            email: '',
            password: '',
            isloading: true,
            IsActiveBtnEnable: 'Timeline',
        }

        this.posts = props.route.params.ImageURL;
       // console.log("posts",this.posts);

    }



    GoToQuestion = (ItemId) => {
        this.props.navigation.navigate('Questions')
    }


    render() {
        let postsGrid;
        console.log(this.posts[0]);
        if (this.posts != undefined) {
            postsGrid = this.posts.map((item, index) => (
                <View style={styles.PostsBlocks} >
                    <View style={{ flexDirection: "row" }}>
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
                                <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>{item.UserName}</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>5min ago</Text>
                            </View>
                        </View>
                        <View style={{ width: "40%" }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.ChangePage('Friends')
                                } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, borderWidth: 3, borderRadius: 10, alignItems: 'center', }}>
                                <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}>Follow</Text>

                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ width: "100%", }}>

                        {/* <Text style={styles.Msg}>
                            hai
                                    </Text> */}
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', height: 200 }}>
                        <Image source={{ uri:item.url }}
                            style={{
                                height: 200,
                                width: "90%",
                                borderRadius: 10,
                            }} />

                    </View>
                    <View style={{ width: "100%", }}>
                        {/* <Text style={styles.HashTags}>
                            #relax,#travel
           </Text> */}
                    </View>
                    <View style={{ width: "100%", flexDirection: "row", margin: 20, marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={
                                () => this.likeClick()
                            } style={{ marginRight: 15 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>0 </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.GoToMSG()
                            } style={{ marginRight: 15 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>0  </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.GoToQuestion()
                                //() => navigate('Comments')
                            } style={{ marginRight: 10 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><AntDesign name="questioncircleo" size={25} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>0</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.ChangePage('Friends')
                            } style={{}}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="share-outline" size={30} style={{ margin: 20, color: "black" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>Share </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View >
            ))
        }
        return (
            <View>
                <ScrollView>
                    <View>

                        <View style={styles.Posts}>
                            {postsGrid}
                            {/* <View style={styles.PostsBlocks} >
                                <View style={{ flexDirection: "row" }}>
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
                                            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>hanuman</Text>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>5min ago</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "40%" }}>
                                        <TouchableOpacity
                                            onPress={
                                                () => this.ChangePage('Friends')
                                            } style={{ borderColor: '#ea0f38', margin: 20, marginTop: 30, borderWidth: 3, borderRadius: 10, alignItems: 'center', }}>
                                            <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}>Follow</Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={{ width: "100%", }}>

                                    <Text style={styles.Msg}>
                                        hai
                                    </Text>
                                </View>
                                <View style={{ width: "100%", alignItems: 'center', height: 200 }}>
                                    <Image source={require('../Images/profilebg.png')}
                                        style={{
                                            height: 200,
                                            width: "90%",
                                            borderRadius: 10,
                                        }} />
                                </View>
                                <View style={{ width: "100%", }}>
                                    <Text style={styles.HashTags}>
                                        #relax,#travel
           </Text>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", margin: 20, marginLeft: 10 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.likeClick()
                                        } style={{ marginRight: 15 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>555 </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={
                                            () => this.GoToMSG()
                                        } style={{ marginRight: 15 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>555  </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={
                                            () => this.GoToQuestion()
                                            //() => navigate('Comments')
                                        } style={{ marginRight: 10 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><AntDesign name="questioncircleo" size={25} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>555</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        } style={{}}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="share-outline" size={30} style={{ margin: 20, color: "black" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>Share </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View > */}
                        </View>

                    </View>
                </ScrollView>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    Posts: {
        width: "100%",
        alignItems: 'center',
        //borderRadius: 25
    },
    PostsBlocks: {
        width: "90%",
        backgroundColor: '#ffffff',
        borderRadius: 25,
        margin: "5%",
        marginBottom: 5,
        marginTop: 5
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
    }

});

export default PostDetails;
