

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


class Posts extends React.Component {
    services = services = new FireBaseFunctions();
    posts = [];
    pictures = [];
    constructor(props,navigation ) {

        super(props);
        // change code below this line
        // alert(props.route.params.email);
        this.state = {
            email: '',
            password: '',
            isloading: true,
            IsActiveBtnEnable: 'Timeline',
        }
        this.getData();
        //this.getAllPosts();

    }

    // getAllPosts = async () => {
    //     this.setState({ isLoading: true });
    //     const db = firestore();
    //     await db.collection('PostBlock').orderBy('CreatedTime', 'desc').limit(5)
    //         .onSnapshot((snapshot) => {
    //             snapshot.forEach(function (doc) {
    //                 this.posts.push(doc.data());
    //             });
    //             let count = 0;
    //             this.posts.map((post) => {
    //                 (async () => {
    //                     console.log("1", count++);
    //                     count = count++
    //                     post.Likes = await this.getAllPostLikesByPostId(post);
    //                     pictures = [];
    //                     item.ImageURL.map((img) => {
    //                         pictures.push(img.url);
    //                     })
    //                     item.pictures = pictures;
    //                     console.log(this.post);
    //                     if (count == this.posts.length) {
    //                         this.setState({ isLoading: false, posts });
    //                     }
    //                 })();
    //             })
    //             return posts;
    //         });
    // }

    // getAllPostLikesByPostId = async (postData) => {
    //     let items = [];
    //     return await firebase.firestore().collection("Likes").where("PostId", "==", postData.PostId).where("Type", "==", "POSTLIKE").get().then((querySnapshot) => {
    //         querySnapshot.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }


    // getAllPosts = async () => {
    //     this.setState({ isPostLayoutLoading: true });
    //     await firestore().collection('PostBlock').orderBy('CreatedTime', 'desc').limit(5)
    //         .onSnapshot((snapshot) => {
    //             posts = [];
    //             snapshot.forEach(function (doc) {
    //                 posts.push(doc.data());
    //             });
    //             this.setState({ isPostLayoutLoading: false, posts });
    //             return posts;
    //         });

    // }


    getData = async () => {
        this.setState({ isLoading: true })
        this.posts = await this.services.getAllData("PostBlock");
        let pictures = [];
        this.posts.map(async (item) => {
            //item.Likes= await this.getAllLikesByPostId(item);
            //console.log(item.Likes);
            pictures = [];
            item.ImageURL.map((img) => {
                pictures.push(img.url);
            })
            item.pictures = pictures;
        })

        this.setState({ isLoading: false })
    }

    //onPress = (url, index, event) => {
    // url and index of the image you have clicked alongwith onPress event.
    // }

    GoToMSG = (ItemId) => {
        this.props.navigation.navigate('Comments');
    }

    GoToQuestion = (ItemId) => {
        this.props.navigation.navigate('Questions')
    }

    likeClick = async (postData) => {
        // this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'POSTLIKE',
            ParentId: postData.PostId,
            PostId: postData.PostId,
            UserId: "919642280029",
            UserimageURL: '',
            UserName: "hanuman",
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22"
        }
        await this.addLike('Likes', postData, obj);
    }

    addLike = async (collectionName, postData, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        postData.Counts.likeCount = postData.Counts.likeCount + 1;
        await firestore().collection('PostBlock').doc(postData.PostId).set(postData);
        this.setState({ loading: true });
        const result = await this.getAllLikesByPostId(obj);
        postData.Likes = result;
        this.setState({ loading: false });
    }

    getAllLikesByPostId = async (postData) => {
        let items = [];
        return await firestore().collection("Likes").where("PostId", "==", postData.PostId).where("Type", "==", "POSTLIKE").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    render() {

        // const { navigate } = this.props.navigation;
        let postsGrid;
        //console.log("render", this.posts);
        if (this.posts != undefined) {
            postsGrid = this.posts.map((item, index) => (
                < View style={styles.PostsBlocks} >
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

                        <Text style={styles.Msg}>
                            {item.Message}
                        </Text>
                    </View>
                    {/* <View style={{ width: "100%", alignItems: 'center', height: 200 }}>
                        <FbGrid images={item.pictures} onPress={this.onPress} />
                    </View> */}
                    {/* <View style={{ width: "100%", }}>
                    <Text style={styles.HashTags}>
                        #relax,#travel
           </Text>
                </View> */}
                    <View style={{ width: "100%", flexDirection: "row", margin: 20, marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={
                                () => this.likeClick(item)
                            } style={{ marginRight: 15 }}>
                            <View style={{ flexDirection: "row", }}>
                                {/* {item.Counts.likeCount > 0 &&
                                    item.Likes.map(item1 => {
                                        if (item1.UserId == "919642280029") {
                                            return (<Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "red" }} /> </Text>)
                                        } else{
                                            return ( <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>)

                                        }

                                    })
                                } */}

                                {
                                    (() => {
                                        if (item.Counts.likeCount > 0) {
                                            let likeDiv = <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>;
                                            console.log(item)
                                            if(item.Likes!=undefined){
                                                console.log(item.UserId)
                                                item.Likes.map(item1 => {
                                                    console.log(item1.UserId)
                                                    if (item1.UserId == '919642280029') {
                                                        likeDiv=<Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "red" }} /> </Text>
                                                    }
                                                })
                                            }else{
                                            likeDiv = <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>;

                                            }
                                           
                                            return likeDiv
                                        }
                                        else {
                                            console.log(item.Counts.likeCount)
                                            return (
                                                <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            )
                                        }
                                    })()
                                }
                                {/* <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text> */}



                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Counts.likeCount} </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.GoToMSG(item.PostId)
                            } style={{ marginRight: 15 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Counts.commentCount}  </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => this.GoToQuestion(item.PostId)
                                //() => navigate('Comments')
                            } style={{ marginRight: 10 }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ margin: 3 }}><AntDesign name="questioncircleo" size={25} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Counts.questionCount}</Text>
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
        } else {
            postsGrid = <Text>No Posts</Text>
        }

        return (
            <View>
                <ScrollView>
                    <View>

                        <View style={styles.Posts}>
                            {postsGrid}
                            {/* <View style={styles.PostsBlocks}>
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
                                            <Text style={{ fontWeight: "bold", fontSize: 25, color: "black" }}>Hanuman</Text>
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
                                        Hi all good morning
                           </Text>
                                </View>
                                <View style={{ width: "100%", alignItems: 'center', height: 200 }}>
                                    {postsGrid} 
                                </View>
                                <View style={{ width: "100%", }}>
                                    <Text style={styles.HashTags}>
                                        #relax,#travel
                           </Text>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", margin: 20,marginLeft:10 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        } style={{ marginRight: 15 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>123 </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        } style={{ marginRight: 15 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>354 </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        } style={{ marginRight: 10 }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ margin: 3 }}><AntDesign name="questioncircleo" size={25} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>354 </Text>
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

                            </View> */}
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
        width: "100%",
        backgroundColor: '#ffffff',
        borderRadius: 25,
        marginBottom: 20
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

export default Posts;
