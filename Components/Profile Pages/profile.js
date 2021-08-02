
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
import Posts from './Posts';

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';


import RNUrlPreview from 'react-native-url-preview';
import Moment from 'moment';

import SyncStorage from 'sync-storage';


class Profile extends React.Component {
    services = new FireBaseFunctions();
    // userObj = {
    //     Address: "",
    //     DOB: "",
    //     Email: "",
    //     Gender: "Male",
    //     Mobile: "",
    //     Password: "",
    //     UserIcon: "",
    //     UserId: "919642280029",
    //     UserName: "hanuman"
    // }

    userObj = {};

    posts = [];
    pictures = [];
    constructor(props) {
        super(props);
        // this.userObj = props.route.params;
        //this.userObj = this.services.userData;
        this.userObj = JSON.parse(SyncStorage.get('userData'));
        console.log("ProfileData" + this.userObj);
        this.state = {
            email: '',
            password: '',
            isloading: true,
            IsActiveBtnEnable: 'Posts',
        }
        //this.getData();

        this.getAllPosts();

    }

    //post functions start

    PostClick = async (item) => {
        console.log(item.ImageURL);
        this.props.navigation.navigate('PostDetails', item)
    }

    // getData = async () => {
    //     this.setState({ isLoading: true })
    //     this.posts = await this.services.getAllData("PostBlock");
    //     this.setState({ isLoading: false })
    // }
    getAllPosts = async () => {
        this.setState({ isLoading: true });
        //const db = firebase.firestore();
        await firestore().collection('PostBlock').orderBy('CreatedTime', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                posts = [];
                snapshot.docs.forEach(function (doc) {
                    console.log(doc.data());
                    posts.push(doc.data());
                });
                this.posts = posts;
                // console.log(this.posts);
                this.setState({ isLoading: false })
                // console.log(this.state.isLoading);

                //let count = 0;
                //this.posts=posts;
                // this.posts.map(async (post) => {
                //     console.log("1", count++);
                //     count = count++
                //     console.log(this.post);
                //     if (count == this.posts.length) {
                //         this.setState({ isLoading: false});
                //     }
                // })
                //return posts;
            });
    }

    GoToMSG = (Item) => {
        this.props.navigation.navigate('Comments', Item);
    }

    GoToQuestion = (Item) => {
        this.props.navigation.navigate('Questions')
    }

    // likeClick = async (postData) => {
    //      this.setState({ userIP: await publicIp.v4() })
    //     const likeId = this.services.getGuid();
    //     var obj = {
    //         LikeId: likeId,
    //         Type: 'POSTLIKE',
    //         ParentId: postData.PostId,
    //         PostId: postData.PostId,
    //         UserId: "919642280029",
    //         UserimageURL: '',
    //         UserName: "hanuman",
    //         Timestamp: new Date().toLocaleString(),
    //         UserIPAddress: "175.101.108.22"
    //     }
    //     await this.addLike('Likes', postData, obj);
    // }

    // addLike = async (collectionName, postData, obj) => {
    //     await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
    //     postData.Counts.likeCount = postData.Counts.likeCount + 1;
    //     await firestore().collection('PostBlock').doc(postData.PostId).set(postData);
    //     this.setState({ loading: true });
    //     const result = await this.getAllLikesByPostId(obj);
    //     postData.Likes = result;
    //     this.setState({ loading: false });
    // }

    // getAllLikesByPostId = async (postData) => {
    //     let items = [];
    //     return await firestore().collection("Likes").where("PostId", "==", postData.PostId).where("Type", "==", "POSTLIKE").get().then((querySnapshot) => {
    //         querySnapshot.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }

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
        // console.log('postData', postData)

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

    TabChange = (text) => {
        this.setState({ IsActiveBtnEnable: text })
    }

    GoToQuestion = () => {
        this.props.navigation.navigate('Questions')
    }

    onPress = (url, index, e) => {
        console.log(url, index, e)
        //url and index of the image you have clicked alongwith onPress event.
    }

    GoToFriendSuggestions = () => {
        this.props.navigation.navigate('HomePage', this.userObj);
    }

    render() {
        Moment.locale('en');
        let postsGrid;
        console.log("render", this.userObj);
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
            <ScrollView>
                <View>

                    <View className="U" style={styles.U}>
                        {/* <View className="ProfileTop" style={styles.ProfileTop}>
                        <View className="TopLeftShadow" style={styles.TopLeftShadow}>
                            <TouchableOpacity
                                onPress={
                                    () => this.ChangePage('Timeline')
                                }>
                                <AntDesign name="setting" size={28} style={{ margin: 30,color:"white" }} />

                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row-reverse', margin: 30 }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.ChangePage('Timeline')
                                }>
                                <FontAwesome name="commenting-o" size={28} style={{ marginTop: 1,color:"white" }} />

                            </TouchableOpacity>
                        </View>

                        <View className="ProfileTopContent" style={styles.ProfileTopContent}>
                            <Text style={{ color: "white", fontSize: 30, margin: 10 }}>Mine</Text>
                            <Image source={require('../Images/Logo.jpg')}
                                style={{
                                    height: 80,
                                    width: 70,
                                    borderBottomLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderTopLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                }} />
                            <Text style={{ color: "white", fontSize: 40, fontStyle: 'normal', margin: 10 }}>Hanuman</Text>

                        </View>
                    </View> */}

                        <View className="ProfileTop" style={styles.ProfileTop}>
                            <View className="ProfileTopContent" style={styles.ProfileTopContent}>
                                <View style={{ flexDirection: "row", }}>
                                    <View style={{ width: "15%", alignItems: 'center', }}>
                                        <TouchableOpacity
                                            onPress={
                                                () => this.GoToFriendSuggestions()
                                            }
                                            style={{ borderWidth: 1, borderRadius: 15, }}>
                                            <AntDesign name="left" size={20} style={{ margin: 10, color: "black" }} />

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "70%", alignItems: 'center', }}>
                                        <Image source={require('../Images/user.jpg')}
                                            style={{
                                                height: 100,
                                                width: 100,
                                                borderRadius: 25,
                                                // borderBottomLeftRadius: 25,
                                                // borderTopRightRadius: 25,
                                                // borderTopLeftRadius: 10,
                                                // borderBottomRightRadius: 10,
                                            }} />
                                            <Text style={{ fontWeight: "bold", color: "black", fontSize: 30, fontStyle: 'normal', margin: 10 }}>{this.userObj.UserName}</Text>
                                        {/* {
                                            (() => {
                                                if (this.userObj.UserName != undefined) {
                                                    return (<Text style={{ fontWeight: "bold", color: "black", fontSize: 30, fontStyle: 'normal', margin: 10 }}>{this.userObj.UserName}</Text>)
                                                }  else {
                                                    return (
                                                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 30, fontStyle: 'normal', margin: 10 }}>dsjlkgfjdslkgh</Text>
                                                    )
                                                }

                                            })()
                                        } */}

                                        <Text style={{ fontSize: 20 }}>@gmail</Text>
                                    </View>
                                    <View style={{ width: "15%", alignItems: 'center', }}>
                                        <TouchableOpacity
                                            style={{ borderWidth: 1, borderRadius: 15 }}>
                                            <Entypo name="dots-three-vertical" size={20} style={{ margin: 10, color: "black" }} />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', width: "100%", marginTop: 5 }}>
                                    <View style={{ flexDirection: "row",justifyContent:"center",width:"100%" }}>
                                        <View style={{ flexDirection: "row",marginLeft:15,width:100 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>518</Text>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10,marginLeft:5 }}>Posts</Text>
                                        </View>
                                         <View style={{ flexDirection: "row", marginRight: 10,width:110 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10,marginLeft:5 }}>Friends</Text>
                                        </View>
                                        <View style={{ flexDirection: "row",width:150 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: "black" }}>22k</Text>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10,marginLeft:5 }}>Followers</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "100%", alignItems: 'center', }}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                        <View style={{ margin: 20, backgroundColor: '#53d769', borderRadius: 15, width: 150, alignItems: 'center', }}>
                                            <TouchableOpacity
                                                onPress={
                                                    () => this.GoToQuestion()
                                                }
                                            >
                                                <Text style={{ color: "white", margin: 20, fontSize: 22, fontWeight: "bold", }}>Following</Text>
                                                {/* <Feather name="info" size={28} style={{ marginTop: 1, }} /> */}

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ margin: 20, backgroundColor: '#ebecec', borderRadius: 15, alignItems: 'center', }}>
                                            <TouchableOpacity
                                            >
                                                <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 20 }}>
                                                    <Text style={{ marginLeft: 10 }}>
                                                        <AntDesign name="mail" size={30} style={{ color: "#1e1f20", }} />
                                                    </Text>
                                                    <Text style={{ marginLeft: 10, fontSize: 22, color: "black", fontWeight: "bold", }}>
                                                        Message
                                                    </Text>
                                                </View>
                                                {/* <Feather name="info" size={28} style={{ marginTop: 1, }} /> */}

                                            </TouchableOpacity>
                                        </View>
                                        {/* <View style={{ margin: 10 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('About')
                                        }>
                                        <Foundation name="photo" size={30} style={{ margin: 30, color: "black" }} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: 10, marginTop: 30 }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => this.ChangePage('Friends')
                                        } style={{ borderWidth: 1, borderRadius: 15 }}>
                                        <Entypo name="dots-three-vertical" size={30} style={{ margin: 10, color: "black" }} />

                                    </TouchableOpacity>
                                </View> */}

                                    </View>

                                </View>

                            </View>


                            {/* <View style={styles.Posts}>
                            <View style={styles.PostsBlocks}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "row", width: "80%" }}>
                                        <View style={{ margin: 20 }}>
                                            <Image source={require('../Images/user.jpg')}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 10,
                                                }} />
                                        </View>
                                        <View style={{ margin: 20, marginLeft: 0 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>hanuman</Text>
                                            <Text>5min ago</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "20%" }}>
                                        <TouchableOpacity
                                            onPress={
                                                () => this.ChangePage('Friends')
                                            } style={{ margin: 20 }}>
                                            <Entypo name="dots-three-vertical" size={30} style={{ margin: 5, }} />

                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style={{ width: "100%", alignItems: 'center', }}>
                                    <Image source={require('../Images/profilebg.png')}
                                        style={{
                                            height: 200,
                                            width: "90%",
                                            borderRadius: 10,
                                        }} />
                                </View>
                            </View>
                        </View> */}

                        </View>
                        <View style={{ height: 70, width: "100%", marginBottom: 20, marginLeft: 30, flexDirection: "row",justifyContent:"center" }}>

                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange("Posts")
                                } style={{ margin: 15 }}>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveText : styles.TabText]}>Posts</Text>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Posts') ? styles.TabActiveDot : styles.TabDot]}>.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('Photos')
                                } style={{ margin: 15 }}>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.TabActiveText : styles.TabText]}>Photos</Text>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Photos') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('Videos')
                                } style={{ margin: 15 }}>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Videos') ? styles.TabActiveText : styles.TabText]}>Videos</Text>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Videos') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>



                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('Events')
                                } style={{ margin: 15 }}>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveText : styles.TabText]}>Events</Text>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    () => this.TabChange('Events')
                                } style={{ margin: 15 }}>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveText : styles.TabText]}>Events</Text>
                                <Text style={[(this.state.IsActiveBtnEnable == 'Events') ? styles.TabActiveDot : styles.TabDot]}>.</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={styles.Posts}>

                            {/* <View style={styles.PostsBlocks}> */}
                            {postsGrid}

                            {/* <Posts /> */}
                            {/* </View> */}


                        </View>

                    </View>

                    {/* <View className="ProfileBottom" style={styles.ProfileBottom}>
                    <ImageBackground source={require('../Images/Rectangle.png')} style={{ width: 500, height: 150 }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', marginLeft: 20, marginTop: 70 }}>
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
                   
                </View> */}
                </View >
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    U: {
        width: "100%",
        height: "100%",
        flex: 1,
        //flexDirection: 'row',
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

    // ProfileTop: {
    //     height: 300,
    //     width: "100%",
    //     backgroundColor: '#7eb7d4',

    // },

    ProfileTop: {
        height: 420,
        width: "100%",
        backgroundColor: '#ffffff',
        //backgroundColor: '#7eb7d4',

    },

    ProfileTopContent: {
        width: "100%",
        //alignItems: 'center',
        top: 50,
    },

    ProfileBottom: {
        width: "100%",
        alignItems: 'center',
        top: 600
        //   bottom: 0,
        //   flexDirection:"column-reverse"
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

export default Profile;
