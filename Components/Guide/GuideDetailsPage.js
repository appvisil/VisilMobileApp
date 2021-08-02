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


class GuideDetailsPage extends React.Component {
    state = {
        email: '',
        password: ''
    }
    BacktoGuideHomePage = () => {
        this.props.navigation.navigate('GuideHomepage')
    }

    GotoPostCommentPage = () => {
        this.props.navigation.navigate('PostOrEditGuideComment')
        //this.setState({ isDisplay: '2' });
    }

    GotoPostQuestionPage = () => {
        this.props.navigation.navigate('PostOrEditGuideQuestion')
        //this.setState({ isDisplay: '2' });
    }

    render() {
        return (
            <View style={{ marginBottom: 100 }}>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "25%", margin: 20, }}>
                        <TouchableOpacity onPress={() => this.BacktoGuideHomePage()}>
                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 17, }}>Guide</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ margin: 20 }}>
                        <View>
                            <View View style={{ flexDirection: "row", marginBottom: 15, width: "100%" }}>

                                <View style={{ flexDirection: "row", width: "75%" }}>
                                    <View>
                                        <Image source={require('../Images/user.jpg')}
                                            style={{
                                                height: 50,
                                                width: 50,
                                                borderRadius: 50,
                                            }} />
                                    </View>
                                    <View style={{ paddingLeft: 15 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>User Name</Text>
                                        <Text style={{ fontSize: 15, color: "black" }}>2 hours ago</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", width: "25%", textAlign: "right", marginTop: 10 }}>
                                    <TouchableOpacity>
                                        <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={{ paddingLeft: 10 }} ><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Image source={require('../Images/profilebg.png')}
                                    style={{
                                        height: 200,
                                        width: "100%",
                                        borderRadius: 20
                                    }} />
                            </View>

                            <View style={{ flexDirection: "row", paddingTop: 10, }}>
                                <Text style={{ margin: 3 }}><FontAwesome5 name="book" size={20} style={{ margin: 20, color: "#5596e6" }} /></Text>
                                <Text style={{ fontSize: 20, color: "#5596e6", }}>Guide</Text>
                            </View>

                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ fontSize: 25, color: "#282829", fontWeight: "bold" }}>World Meetup Week 2019 - Video and PicturesWe were happy to announce the third annual Quora World Meetup that happened in June ?</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, }}>To celebrate the great meetup week we all had, we wanted to share videos and photos people shared with us from different meetups. We hope you like it! Thank you to all who organized and participated, and thanks for helping us share and grow the world's knowledge!</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20, }}>
                                {/* <TouchableOpacity style={{ marginRight: 20 }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 20 }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                    </View>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={{ marginRight: 15 }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#b5b5b7" }} /> </Text>
                                        <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>0</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.GotoPostCommentPage()}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>0</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.GotoPostQuestionPage()}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><FontAwesome name="question" size={20} style={{ margin: 20, color: "#b5b5b7" }} /></Text>
                                        <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>0</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginRight: 20 }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><Entypo name="share" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><FontAwesome name="bookmark" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ borderBottomColor: "#aaaaab", borderBottomWidth: 1 }}>
                            <Text style={{ color: "black", fontSize: 20 }}>Comments (2)</Text>
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <View style={styles.CommentBlock}>
                                <View style={{ flexDirection: "row", marginBottom: 10, width: "100%" }}>
                                    <View style={{ flexDirection: "row", width: "75%" }}>
                                        <View >
                                            <Image source={require('../Images/user.jpg')}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 50,
                                                }} />
                                        </View>
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ fontSize: 20, color: "#282829", fontWeight: "bold" }}>Ajay</Text>
                                            <Text style={{ fontSize: 15, color: "black" }}>2 hours ago</Text>

                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", width: "25%", textAlign: "right", marginTop: 10 }}>
                                        <TouchableOpacity>
                                            <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={{ paddingLeft: 10 }} ><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", marginBottom: 10, }}>
                                    <Text style={{ fontSize: 18, color: "black" }}>
                                        In over 100 different meetups.
                                        </Text>
                                </View>

                                <View style={{ width: "100%", flexDirection: "row", marginTop: 10, }}>
                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Reply</Text> */}
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><Entypo name="share" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Share </Text> */}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><FontAwesome name="bookmark" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Save </Text> */}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <View style={styles.CommentBlock}>
                                <View style={{ flexDirection: "row", marginBottom: 10, width: "100%" }}>
                                    <View style={{ flexDirection: "row", width: "75%" }}>
                                        <View >
                                            <Image source={require('../Images/user.jpg')}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 50,
                                                }} />
                                        </View>
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ fontSize: 20, color: "#282829", fontWeight: "bold" }}>Ajay</Text>
                                            <Text style={{ fontSize: 15, color: "black" }}>2 hours ago</Text>

                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", width: "25%", textAlign: "right", marginTop: 10 }}>
                                        <TouchableOpacity>
                                            <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={{ paddingLeft: 10 }} ><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", marginBottom: 10, }}>
                                    <Text style={{ fontSize: 18, color: "black" }}>
                                        people came together to celebrate their passion .
                                        </Text>
                                </View>

                                <View style={{ width: "100%", flexDirection: "row", marginTop: 10, }}>
                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Reply</Text> */}
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>0</Text>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><Entypo name="share" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Share </Text> */}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 20 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><FontAwesome name="bookmark" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            {/* <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>Save </Text> */}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    CommentBlock: {

        borderRadius: 20,
        padding: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});

export default GuideDetailsPage;
