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

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';
import Moment from 'moment';

let guides = [];
class GuideHomepage extends React.Component {
    services = new FireBaseFunctions();
    userObj = {}
    constructor(props) {
        super(props)
        this.userObj = props.route.params;
        console.log(this.userObj);
        this.state = {
            email: '',
            password: '',
            isloading: false,
        }
        this.getAllGuides();
    }

    getAllGuides = async () => {
        this.setState({ isloading: true });
        await firestore().collection('Guides').where('IsDelete', "==", false).orderBy('CreatedTime', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                guides = [];
                snapshot.docs.forEach(function (doc) {
                    guides.push(doc.data());
                });
                this.setState({ isloading: false })
            });
    }


    GuideExpand = () => {
        this.props.navigation.navigate('GuideDetailsPage')
    }

    addGuidClick=()=>{
        this.props.navigation.navigate('PostOrEditGuide',this.state)
    }
    render() {
        Moment.locale('en');
        let guidesGrid;
        if (guides.length > 0) {
            guidesGrid = guides.map((item, index) => (
                <View style={styles.GuideHomePageView}>
                    <View style={{ flexDirection: "row", marginBottom: 10, width: "100%" }}>
                        <View style={{ flexDirection: "row", width: "70%" }}>
                            <View>
                                <Image source={require('../Images/user.jpg')}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 50,
                                    }} />
                            </View>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>{item.UserName}</Text>
                                <Text style={{ fontSize: 15, color: "black" }}>{Moment(item.CreatedTime).fromNow()}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "30%", textAlign: "right" }}>
                            <TouchableOpacity>
                                <Text><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ paddingLeft: 10 }} ><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        (() => {
                            if (item.ImageURL.length > 0) {
                                return (
                                    item.ImageURL.map((c) => {
                                        return (
                                            <View>
                                                <Image source={c.url}
                                                    style={{
                                                        height: 200,
                                                        width: "100%",
                                                        borderRadius: 20
                                                    }} />
                                            </View>
                                        )
                                    })
                                )
                            }
                        })()
                    }

                    <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 5 }}>
                        <Text style={{ margin: 3 }}><FontAwesome5 name="book" size={20} style={{ margin: 20, color: "#5596e6" }} /></Text>
                        <Text style={{ fontSize: 20, color: "#5596e6", }}>Guide</Text>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => this.GuideExpand()}>
                            <Text style={{ fontSize: 25, color: "black", fontWeight: "500" }}>{item.Guide}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", flexDirection: "row", paddingTop: 10, marginBottom: 5, marginTop: 5, borderTopColor: "#f3f1f1", borderTopWidth: 1 }}>
                        <View style={{ width: "80%", flexDirection: "row", }}>
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#b5b5b7" }} /> </Text>
                                    <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>{item.Count.likeCount}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.GuideExpand()}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={20} style={{ margin: 20, color: "#b5b5b7" }} /></Text>
                                    <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>{item.Count.commentCount}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.GuideExpand()}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ margin: 3 }}><FontAwesome name="question" size={20} style={{ margin: 20, color: "#b5b5b7" }} /></Text>
                                    <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>{item.Count.questionCount}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "20%", flexDirection: "row", }}>
                            <TouchableOpacity style={{ width: "50%" }}>
                                <Text ><Entypo name="share" size={25} style={{ color: "#b5b5b7" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "50%" }}>
                                <Text ><FontAwesome name="bookmark" size={25} style={{ color: "#b5b5b7" }} /> </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))
        } else {
            guidesGrid = <Text>No Guides</Text>
        }
        return (
            <View style={{ backgroundColor: "#f5f9fc", height: "100%" }}>
                <View style={{height:"95%"}}>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "25%", margin: 20, }}>
                        <TouchableOpacity>
                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 17, }}>Guides (1)</Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View>
                            <View>
                                <Text style={{ fontSize: 17, color: "black", fontWeight: "bold", margin: 10, paddingTop: 5 }}>Discover Guides</Text>
                            </View>
                        </View>


                        <View>
                            {guidesGrid}
                        </View>


                    </View>
                </ScrollView>
            </View>
            <View style={{ height: "5%", backgroundColor: "white" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.addGuidClick()
                            }
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
    GuideHomePageView: {
        margin: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

});

export default GuideHomepage;
