
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
    Linking
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
//import Posts from './Posts';

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';


import RNUrlPreview from 'react-native-url-preview';
import Moment from 'moment';

import SyncStorage from 'sync-storage';


class HomePage extends React.Component {
     services = new FireBaseFunctions();
    userObj = {}
    posts = [];
    pictures = [];
    constructor(props) {
        super(props);
        //this.userObj = props.route.params;
        this.userObj = JSON.parse(SyncStorage.get('userData'));
        //console.log("ProfileData" + this.userObj);
        //console.log(this.userObj);
        this.state = {
            email: '',
            password: '',
            isloading: true,
            IsActiveBtnEnable: 'Posts',
        }

        this.getAllPosts();

    }

    //post functions start

    PostClick = async (item) => {
        //console.log(item.ImageURL);
        this.props.navigation.navigate('PostDetails', item)
    }

    GoToPostCretePage = async () => {
        //console.log(item.ImageURL);
        //this.props.navigation.navigate('CreatPost', this.userObj)
        this.props.navigation.navigate('CreatPost',this.userObj)
    }


    getAllPosts = async () => {
        this.setState({ isLoading: true });
        await firestore().collection('PostBlock').orderBy('CreatedTime', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                posts = [];
                snapshot.docs.forEach(function (doc) {
                    //console.log(doc.data());
                    posts.push(doc.data());
                });
                this.posts = posts;
                this.setState({ isLoading: false })

            });
    }

    GoToMSG = (Item) => {
        var obj = {
            UserData: this.userObj,
            postData: Item
        }
        this.props.navigation.navigate('Comments', obj);
    }

    GoToQuestion = (Item) => {
        var obj = {
            UserData: this.userObj,
            postData: Item
        }
        this.props.navigation.navigate('Questions',obj)
    }

    SharePost=()=>{
        this.props.navigation.navigate('SelectAudience',this.userObj)
    }

    likeClick = async (postData) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'POSTLIKE',
            ParentId: postData.PostId,
            PostId: postData.PostId,
            UserId: this.userObj.UserId,
            UserimageURL: '',
            UserName: this.userObj.UserName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22"
        }
        await this.addLike('Likes', postData, obj);
    }

    addLike = async (collectionName, postData, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        postData.LikeList.push(obj.UserId);
        postData.Count.likeCount = postData.Count.likeCount + 1;
        postData.TopFiveLikes.push(this.userObj);

        await firestore().collection('PostBlock').doc(postData.PostId).set(postData);
    }

    dislikeClick = async (postData) => {
        var i = postData.LikeList.indexOf(this.userObj.UserId);
        if (i != -1) {
            postData.LikeList.splice(i, 1);
        }
        const indx = postData.TopFiveLikes.findIndex(v => v.UserId === this.userObj.UserId);
        postData.TopFiveLikes.splice(indx, indx >= 0 ? 1 : 0);
        await firestore().collection("Likes").where("UserId", "==", postData.UserId).where("PostId", "==", postData.PostId).where("ParentId", "==", postData.PostId).where("Type", "==", "POSTLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        postData.Count.likeCount = postData.Count.likeCount - 1;
        await firestore().collection('PostBlock').doc(postData.PostId).set(postData);
    }

    //post functions end

    // TabChange = (text) => {
    //     this.setState({ IsActiveBtnEnable: text })
    // }

    // GoToQuestion = () => {
    //     this.props.navigation.navigate('Questions')
    // }

    onPress = (url, index, e) => {
       // console.log(url, index, e)
        //url and index of the image you have clicked alongwith onPress event.
    }

    render() {
        Moment.locale('en');
        let postsGrid;
        if (this.posts.length > 0) {
            postsGrid = this.posts.map((item, index) => (
                < View style={styles.PostsBlocks} >
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", width: "90%" }}>
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
                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{Moment(item.CreatedTime).fromNow()}</Text>
                            </View>
                        </View>
                        <View style={{ width: "20%" }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.ChangePage('Friends')
                                } style={{ margin: 0, marginTop: 30, }}>
                                {/* <Text style={{ margin: 5, color: "#ea0f38", fontSize: 20, fontWeight: "bold", }}>Follow</Text> */}
                                <Text><Entypo name="dots-three-vertical" size={30} style={{ margin: 20, color: "grey" }} /></Text>

                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ width: "100%", }}>
                        {(() => {
                            if (item.isLink != undefined && item.isLink == true) {
                                return (
                                    <Text style={styles.LinkStyle}
                                        onPress={() => Linking.openURL(item.Message)}>
                                        {item.Message}
                                    </Text>
                                )
                            } else {
                                return (
                                    <Text style={styles.Msg}>
                                        {item.Message}
                                    </Text>
                                )
                            }
                        })()}

                    </View>
                    { (() => {
                        if (item.ImageURL.length > 0) {
                            return (
                                <View style={{ width: "100%", height: 200, }} onStartShouldSetResponder={() => this.PostClick(item)}>


                                    {

                                        (() => {
                                            if (item.ImageURL.length == 1) {
                                                return (
                                                    item.ImageURL.map((c, i) => (
                                                        <View style={{ width: "98%", margin: "1%" }}>
                                                            <TouchableOpacity
                                                                onPress={
                                                                    () => this.PostClick(item)
                                                                }>
                                                                <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                            </TouchableOpacity>
                                                        </View>
                                                    ))
                                                )
                                            }
                                            else if (item.ImageURL.length == 2) {
                                                return (
                                                    <View style={{ flexDirection: "row" }}>
                                                        {item.ImageURL.map((c, i) => (
                                                            <View style={{ width: "48%", margin: "1%" }}>
                                                                <TouchableOpacity
                                                                    onPress={
                                                                        () => this.PostClick(item)
                                                                    }>
                                                                    <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                </TouchableOpacity>
                                                            </View>
                                                        ))}
                                                    </View>
                                                )
                                            }
                                            else if (item.ImageURL.length == 3) {
                                                return (
                                                    <View>
                                                        {item.ImageURL.map((c, i) => {
                                                            //console.log(i);
                                                            if (i == 1) {
                                                                return (
                                                                    <View style={{ flexDirection: "row", height: "48%" }}>
                                                                        <View style={{ alignSelf: "flex-end", width: "48%", margin: "1%" }}>
                                                                            <TouchableOpacity
                                                                                onPress={
                                                                                    () => this.PostClick(item)
                                                                                }>
                                                                                <Image source={{ uri: item.ImageURL[0].url }} style={{ height: "100%", width: "100%", }} />

                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{ alignSelf: "flex-end", width: "48%", margin: "1%" }}>
                                                                            <TouchableOpacity
                                                                                onPress={
                                                                                    () => this.PostClick(item)
                                                                                }>
                                                                                <Image source={{ uri: item.ImageURL[1].url }} style={{ height: "100%", width: "100%", }} />

                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            }
                                                            else if (i == 2) {
                                                                return (
                                                                    <View style={{ alignSelf: "flex-start", width: "98%", height: "50%", margin: "1%" }}>
                                                                        <TouchableOpacity
                                                                            onPress={
                                                                                () => this.PostClick(item)
                                                                            }>
                                                                            <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            }
                                                        }


                                                        )
                                                        }
                                                    </View>
                                                )

                                            } else if (item.ImageURL.length == 4) {
                                                return (
                                                    <View style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
                                                        {item.ImageURL.map((c, i) => {
                                                            //console.log(i);
                                                            // if (i == 1) {
                                                            return (
                                                                // <View style={{ flexDirection: "row",height: "48%" }}>
                                                                <View style={{ width: "48%", height: "48%", margin: "1%" }}>
                                                                    <TouchableOpacity
                                                                        onPress={
                                                                            () => this.PostClick(item)
                                                                        }>
                                                                        <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                    </TouchableOpacity>
                                                                </View>
                                                            )

                                                        }


                                                        )
                                                        }
                                                    </View>
                                                )

                                            }
                                            else if (item.ImageURL.length == 5) {
                                                return (
                                                    <View style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
                                                        {item.ImageURL.map((c, i) => {
                                                            if (i <= 1) {
                                                                return (
                                                                    // <View style={{ flexDirection: "row",height: "48%" }}>
                                                                    <View style={{ width: "48%", height: "48%", margin: "1%" }}>
                                                                        <TouchableOpacity
                                                                            onPress={
                                                                                () => this.PostClick(item)
                                                                            }>
                                                                            <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            } else if (i <= 4) {
                                                                return (
                                                                    <View style={{ width: "31%", height: "48%", margin: "1%" }}>
                                                                        <TouchableOpacity
                                                                            onPress={
                                                                                () => this.PostClick(item)
                                                                            }>
                                                                            <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            }


                                                        }


                                                        )
                                                        }
                                                    </View>
                                                )

                                            } else if (item.ImageURL.length > 5) {
                                                return (
                                                    <View style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
                                                        {item.ImageURL.map((c, i) => {
                                                            if (i <= 1) {
                                                                return (
                                                                    // <View style={{ flexDirection: "row",height: "48%" }}>
                                                                    <View style={{ width: "48%", height: "48%", margin: "1%" }}>
                                                                        <TouchableOpacity
                                                                            onPress={
                                                                                () => this.PostClick(item)
                                                                            }>
                                                                            <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            } else if (i <= 3) {
                                                                return (
                                                                    <View style={{ width: "31%", height: "48%", margin: "1%" }}>
                                                                        <TouchableOpacity
                                                                            onPress={
                                                                                () => this.PostClick(item)
                                                                            }>
                                                                            <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            } else if (i == 4) {
                                                                return (
                                                                    <View style={{ width: "31%", height: "48%", margin: "1%" }}>
                                                                        <View>
                                                                            <TouchableOpacity
                                                                                onPress={
                                                                                    () => this.PostClick(item)
                                                                                }>
                                                                                <Image source={{ uri: c.url }} style={{ height: "100%", width: "100%", }} />

                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "black", opacity: 0.5, }}>
                                                                            <Text style={{ color: "white", textAlign: "center", marginTop: "25%", fontSize: 25 }}>+{item.ImageURL.length - 5}</Text>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            }


                                                        }


                                                        )
                                                        }
                                                    </View>
                                                )

                                            }

                                        })()
                                    }


                                </View>
                            )
                        }
                        else if (item.isLink != undefined && item.isLink == true) {
                            return (
                                <View style={{ width: "98%", margin: "1%" }}>
                                    <RNUrlPreview text={item.Message} />
                                </View>
                            )

                        }
                    })()

                    }

                    {/* <View style={{ width: "100%", }}>
                    <Text style={styles.HashTags}>
                        #relax,#travel
           </Text>
                </View> */}
                    <View style={{ width: "100%", flexDirection: "row", margin: 10, marginLeft: 10 }}>

                        <View style={{ flexDirection: "row", }}>
                            {
                                (() => {
                                    if (item.Count.likeCount != undefined && item.Count.likeCount > 0) {
                                        let likeDiv = <TouchableOpacity
                                            onPress={
                                                () => this.likeClick(item)
                                            } style={{}}>
                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                        </TouchableOpacity>
                                        //console.log(item)
                                        if (item.LikeList != undefined) {
                                            //console.log(item.UserId)
                                            item.LikeList.map(item1 => {
                                               // console.log(item1,this.userObj.UserId)
                                                if (item1 == this.userObj.UserId) {
                                                    likeDiv = <TouchableOpacity
                                                        onPress={
                                                            () => this.dislikeClick(item)
                                                        } style={{}}>
                                                        <Text style={{ margin: 3 }}><AntDesign name="heart" size={30} style={{ margin: 20, color: "red" }} /> </Text>
                                                    </TouchableOpacity>;
                                                }
                                            })
                                        } else {
                                            likeDiv = <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item)
                                                } style={{}}>
                                                <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>;
                                                </TouchableOpacity>;

                                        }

                                        return likeDiv
                                    }
                                    else {
                                        //console.log(item.Counts.likeCount)
                                        return (
                                            <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item)
                                                } style={{}}>
                                                <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            </TouchableOpacity>
                                            //<Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                        )
                                    }
                                })()
                            }

                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", marginRight: 15 }}>{item.Count.likeCount} </Text>
                        </View>


                        <TouchableOpacity
                            onPress={
                                () => this.GoToMSG(item)
                            } style={{ marginRight: 15 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Count.commentCount}  </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.GoToQuestion(item)
                                //() => navigate('Comments')
                            } style={{ marginRight: 10 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><AntDesign name="questioncircleo" size={25} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Count.questionCount}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.SharePost()
                            } style={{}}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="share-outline" size={30} style={{ margin: 20, color: "black" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>Share </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View >
            ))
        } else {
            postsGrid = <Text>No Posts</Text>
        }
        return (
            <View>

                <View className="U" style={styles.U}>
                    <View className="ProfileTop" style={styles.ProfileTop}>
                        <View className="ProfileTopContent" style={styles.ProfileTopContent}>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ width: "20%", alignItems: 'center', }}>
                                    <TouchableOpacity
                                        style={{borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>
                                        <Entypo name="menu" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "55%", alignItems: 'center', }}>

                                    <Text style={{ fontWeight: "bold", color: "black", fontSize: 20, marginTop: 10, fontStyle: 'normal', }}>HOME</Text>

                                </View>
                                <View style={{ width: "25%", alignItems: 'center', flexDirection: "row", }}>
                                <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec",marginRight:5 }}>
                                        <MaterialIcons name="search" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec", }}>
                                        <FontAwesome name="bell-o" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>
                                        <FontAwesome name="bell-o" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </View>
                    <View style={styles.AddPost}>
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec", padding: 10, margin: 10, height: 50 }}
                            onPress={
                                () => this.GoToPostCretePage()
                            }>

                            <Text style={{ color: "white", fontSize: 20 }}><AntDesign name="plus" size={20} style={{ margin: 10, color: "white" }} /> Add Post</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.FuturedStories}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 20, margin: 20 }}>Featured Stories</Text>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: "20%", alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#d5effb", borderColor: "#46b7ec" }}>
                                    <AntDesign name="plus" size={30} style={{ margin: 10, color: "#05a3ec" }} />

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "20%", alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 15,
                                        }} />

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "20%", alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>

                                    <Image source={require('../Images/profileimage.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 15,
                                        }} />

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "20%", alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 15,
                                        }} />

                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "20%", alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "#46b7ec", borderColor: "#46b7ec" }}>

                                    <Image source={require('../Images/profileimage.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 15,
                                        }} />

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.HomeBottom}>

                        <ScrollView>

                            <View style={styles.Posts}>
                                {postsGrid}
                            </View>
                        </ScrollView>
                    </View>
                    <View className="Footer" style={styles.Footer}>

                        <ImageBackground source={require('../Images/Rectangle.png')} style={{ width: 500, }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', marginLeft: 20, marginTop: 50, marginBottom: 20, backgroundColor: "#00000003" }}>
                                <View style={{ flex: 1, alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Timeline')
                                        }>
                                        <MaterialCommunityIcons name="crown" size={30} style={{ marginTop: 1, }} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('About')
                                        }>
                                        <MaterialIcons name="date-range" size={30} style={{ marginTop: 1, }} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        }>
                                        <EvilIcons name="bell" size={30} style={{ marginTop: 1, marginLeft: 50 }} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Photos')
                                        }>
                                        <EvilIcons name="user" size={30} style={{ marginTop: 1, }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>

                    </View>
                </View>

            </View >

        );
    };
}

const styles = StyleSheet.create({
    U: {
        width: "100%",
        height: "100%",
        // flex: 1,
        //flexDirection: 'row',
    },
    Footer: {
        width: "100%",
        alignItems: 'center',
        marginTop: "-25%",
        // backgroundColor:"#00000003"
        //top: 600
        //   bottom: 0,
        //   flexDirection:"column-reverse"
    },
    Posts: {
        //height:610,
        width: "100%",
        alignItems: 'center',
    },
    PostsBlocks: {
        width: "90%",
        //backgroundColor: '#ffffff',
        borderRadius: 25,
        //height:100
        //width: "100%",
        backgroundColor: '#ffffff',
        marginBottom: 20
    },

    ProfileTop: {
        height: "10%",
        width: "100%",
        backgroundColor: '#ffffff',

    },
    AddPost: {
        height: "5%",
        width: "100%",
        alignItems: 'flex-end'
        //textAlign: "right"
    },
    FuturedStories: {
        height: "20%",
        width: "100%",
    },
    HomeBottom: {
        height: "65%",
        //backgroundColor:"grey",
        //paddingTop: 50,
        width: "100%",
        alignItems: 'center',
        paddingBottom: 80,
    },

    ProfileTopContent: {
        width: "100%",
        //alignItems: 'center',
        top: 10,
    },

    TabText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    TabDot: {
        display: "none"
    },
    TabActiveText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    TabActiveDot: {
        //width:"100%",
        fontWeight: "bold",
        //alignItems: 'center',
        fontSize: 50,
        marginLeft: 20,
        marginTop: -30,
        color: "black"
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
    },

    LinkStyle: {
        color: "blue",
        margin: 20,
        marginTop: 0,
        fontSize: 20,
        fontWeight: "bold",
    }








});

export default HomePage;
