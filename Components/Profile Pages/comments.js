
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

//const publicIp = require('public-ip');

class Comments extends React.Component {
    services = services = new FireBaseFunctions();
    CommentsList = [];
    UserData = {};
    PostData = {};
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            isloading: true,
            CommentText: "",
            CommentReplyText: "",
            userIP: ""
        }
        //console.log(props.route.params.PostId);
        this.PostData = props.route.params.postData;
        this.UserData = props.route.params.UserData;
        this.getComments(props.route.params.postData);
        //this.CommentsList = this.services.getAllData("Comments");
        //console.log(this.CommentsList);
    }

    // async getComments() {
    //     this.CommentsList = await this.services.getAllData("Comments");
    //     this.setState({ isloading: false })
    // }

    getComments = async (post) => {
        console.log(post);
        // this.ToDisplayQuestionSectionOff(post);
        // this.setState({ postLoading: true })
        // this.setState({ postCommentsByPostId: '' })
        await firestore().collection("Comments").where("PostId", "==", post.PostId).where("Type", "==", "COMMENT").orderBy('Timestamp', 'desc').limit(5)
            //.get().then((querySnapshot) => {
            .onSnapshot((snapshot) => {
                let items = [];
                snapshot.docs.forEach(doc => {
                    doc.data().isReply = undefined;
                    items.push(doc.data());
                });
                //this.setState({ postCommentsByPostId: items })
                console.log(items);
                this.CommentsList = items;
                //this.CommentsList[0].Likes= await this.getLikesByCommentId(this.CommentsList[0]);
                this.setState({ isloading: false })
                console.log(this.CommentsList, this.state.isloading);
                //this.setState({ IsCommentOpen: post.PostId })
            });
    }


    CommentChange = (text) => {
        this.setState({ CommentText: text })
        //console.log(this.state.CommentText);
    }
    CommentReplyChange = (text) => {
        this.setState({ CommentReplyText: text })
        //console.log(this.state.CommentText);
    }

    GoToPosts = () => {
        this.props.navigation.navigate('HomePage')
    }

    // SendComment = () => {
    //     console.log(this.state.CommentText);
    // }

    SendComment = async () => {
        //console.log(this.state.CommentText);
        // this.setState({
        //     userIP: "175.101.108.22"
        // })
        if (this.state.CommentText != "") {
            const commId = this.services.getGuid();
            var counts = {
                likeCount: 0,
                replyCount: 0
            }
            var obj = {
                CommentId: commId,
                Type: 'COMMENT',
                ParentId: this.PostData.PostId,
                PostId: this.PostData.PostId,
                UserId: this.UserData.UserId,
                UserimageURL: '',
                UserName: this.UserData.UserName,
                Comment: this.state.CommentText,
                Timestamp: new Date().toLocaleString(),
                UserIPAddress: "175.101.108.22",
                Count: counts,
                LikeList: []
            }
            //console.log(obj);
            await this.addComment('Comments', obj);
            this.setState({ CommentText: "" });
        }

    }

    addComment = async (collectionName, postData) => {
        await firestore().collection(collectionName).doc(postData.CommentId).set(postData);
        this.PostData.Count.commentCount = this.PostData.Count.commentCount + 1;
        //postData.TopFiveLikes.push(this.userObj);
        await firestore().collection('PostBlock').doc(this.PostData.PostId).set(this.PostData);
        this.setState({ loading: true });
        const result = await this.getAllCommentsByPostId(postData);
        this.CommentsList = result;
        //console.log(this.CommentsList);
        this.setState({ loading: false });
        this.setState({ CommentText: "" });
    }

    getAllCommentsByPostId = async (postData) => {
        this.setState({ loading: true });
        let items = [];
        console.log(postData);
        return await firestore().collection("Comments").where("PostId", "==", postData.PostId).where("Type", "==", "COMMENT").get().then((querySnapshot) => {
            console.log('querySnapshot.docs', querySnapshot.docs);
            querySnapshot.docs.forEach(doc => {
                items.push(doc.data());
            });
            let count = 0;
            items.map((comment) => {
                (async () => {
                    // console.log("1", count++);
                    count = count++
                    comment.Likes = await this.getAllCommentLikesByCommentId(comment);
                    //console.log(comment);
                    if (count == items.length) {
                        this.setState({ loading: false, items });
                    }
                })();
            })
            return items;
        });
    }

    getAllCommentLikesByCommentId = async (commentData) => {
        let items = [];
        return await firestore().collection("Likes").where("UserId", "==", commentData.UserId).where("PostId", "==", commentData.PostId).where("ParentId", "==", commentData.CommentId).where("Type", "==", "COMMENTLIKE").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    // replyComment = (item,index) => {
    //     this.setState({ loading: true });

    //    this.CommentsList[index].isReply = true;
    //     this.setState({ loading: false });
    // }

    replyComment = async (comment, index) => {
        this.setState({ loading: true })
        let items = [];
        await firestore().collection("Comments").where("ParentId", "==", comment.CommentId).where("Type", "==", "COMMENTREPLY").get().then((COMMENTREPLY) => {
            COMMENTREPLY.docs.forEach(doc => {
                items.push(doc.data());
            });
            if (items.length > 0) {
                let count = 0;
                items.map((comment) => {
                    (async () => {
                        console.log("1", count++);
                        count = count++
                        comment.Likes = await this.getAllCommentLikesByCommentId(comment);
                        console.log(comment);
                        if (count == items.length) {
                            this.setState({ loading: false, items });
                        }
                    })();
                })
            }
            this.CommentsList[index].Reply = items;
            this.CommentsList[index].isReply = items;
            //console.log(items);
            // if (items.length == 0) {
            //     comment.isReply = true
            // }
            //console.log(this.CommentsList[index]);
            this.setState({ loading: false })
        });
    }

    getAllCommentLikesByCommentId = async (commentData) => {
        let items = [];
        return await firestore().collection("Likes").where("UserId", "==", commentData.UserId).where("PostId", "==", commentData.PostId).where("ParentId", "==", commentData.CommentId).where("Type", "==", "COMMENTLIKE").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    addReplyClick = async (comment) => {
        //console.log(comment);
        //this.setState({ userIP: await publicIp.v4() })
        if (this.state.CommentReplyText != "") {
            var counts = {
                likeCount: 0,
                replyCount: 0
            }
            const commId = this.services.getGuid();
            var obj = {
                CommentId: commId,
                Type: 'COMMENTREPLY',
                ParentId: comment.CommentId,
                PostId: comment.PostId,
                UserId: this.UserData.UserId,
                UserimageURL: '',
                UserName: this.UserData.UserName,
                Comment: this.state.CommentReplyText,
                Timestamp: new Date().toLocaleString(),
                UserIPAddress: "175.101.108.22",
                Count: counts,
                LikeList: []
            }
            await this.addReplyComment('Comments', comment, obj);
            this.setState({ CommentReplyText: "" });
        }

    }

    addReplyComment = async (collectionName, parentCommentData, obj) => {
        await firestore().collection(collectionName).doc(obj.CommentId).set(obj);
        // parentCommentData.Count.replyCount = parentCommentData.Count.replyCount + 1;
        // await firestore().collection('Comments').doc(parentCommentData.CommentId).set(parentCommentData);
        this.setState({ loading: true });
        const result = await this.getReplyCommentsByCommentId(obj);
        // console.log(result);
        parentCommentData.Reply = result;
        this.setState({ CommentReplyText: "" });
        this.setState({ loading: false });
    }

    getReplyCommentsByCommentId = async (comment) => {
        let items = [];
        return await firestore().collection("Comments").where("ParentId", "==", comment.ParentId).where("Type", "==", "COMMENTREPLY").get().then((COMMENTREPLY) => {
            COMMENTREPLY.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }
    replyCommentReply = async (comment, index) => {
        //console.log(comment);
        this.setState({ loading: true });
        comment.isReply = true;
        this.setState({ loading: false });

    }

    likeClick = async (comment) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'COMMENTLIKE',
            ParentId: comment.CommentId,
            PostId: comment.PostId,
            UserId: this.UserData.UserId,
            UserimageURL: '',
            UserName: this.UserData.UserName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22"
        }
        await this.addLikeComment('Likes', comment, obj);
    }

    addLikeComment = async (collectionName, parentComment, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        this.setState({ loading: true });
        parentComment.LikeList.push(obj.UserId);
        parentComment.Count.likeCount = parentComment.Count.likeCount + 1;
        await firestore().collection('Comments').doc(parentComment.CommentId).set(parentComment);
        //const result = await this.getLikesByCommentId(obj);
        //parentComment.Likes = result;
        this.setState({ loading: false });
    }

    dislikeClick = async (comment) => {
        this.setState({ loading: true });
        delete comment.Reply;
        var i = comment.LikeList.indexOf(this.UserData.UserId);
        if (i != -1) {
            comment.LikeList.splice(i, 1);
        }
        await firestore().collection("Likes").where("UserId", "==", comment.UserId)
            .where("PostId", "==", comment.PostId).where("ParentId", "==", comment.CommentId).where("Type", "==", "COMMENTLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        comment.Count.likeCount = comment.Count.likeCount - 1;
        await firestore().collection('Comments').doc(comment.CommentId).set(comment);
        this.setState({ loading: false });
    }


    getLikesByCommentId = async (comment) => {
        let items = [];
        return await firestore().collection("Likes").where("ParentId", "==", comment.ParentId).where("Type", "==", "COMMENTLIKE").get().then((COMMENTLIKE) => {
            COMMENTLIKE.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    render() {
        let list;
        let like;
        // console.log("render", this.CommentsList);
        if (this.CommentsList.length > 0 && this.state.isloading == false) {
            list =
                this.CommentsList.map((item, index) => (
                    <View style={{ marginTop: 20, borderBottomColor: "#969696", borderBottomWidth: 1, borderRadius: 50, }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row", width: "70%" }}>
                                <View style={{ margin: 20 }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 10,
                                        }} />
                                </View>
                                <View style={{ margin: 20, marginLeft: 0, marginTop: 40 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#969696" }}>{item.UserName}</Text>

                                </View>
                            </View>
                            <View style={{ width: "30%" }}>
                                <Text style={{ fontSize: 20, color: "#969696", marginTop: 40 }}>5min ago</Text>
                            </View>

                        </View>
                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item.Comment}</Text>

                        </View>
                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>

                            <View style={{ flexDirection: "row", marginRight: 10 }}>
                                {(() => {
                                    console.log(item.LikeList);
                                    if (item.LikeList.length > 0) {
                                        like = <TouchableOpacity
                                            onPress={
                                                () => this.likeClick(item)
                                            } style={{}}>
                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                        </TouchableOpacity>
                                        item.LikeList.map((c, i) => {
                                            if (c == this.UserData.UserId) {
                                                like = <TouchableOpacity
                                                    onPress={
                                                        () => this.dislikeClick(item)
                                                    } style={{}}>
                                                    <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                                </TouchableOpacity>
                                            }
                                        })
                                        return like;
                                    } else {
                                        like = <TouchableOpacity
                                            onPress={
                                                () => this.likeClick(item)
                                            } style={{}}>
                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                        </TouchableOpacity>
                                        return like;

                                    }
                                })()}
                                {/* {(() => {
                                        console.log(item.Likes);
                                        if (item.Likes != undefined) {
                                            like=<Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                            item.Likes.map((c, i) => {
                                                if (c.UserId == this.UserData.UserId) {
                                                    like=<Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>
                                                }
                                        })
                                        return  like;
                                        } else {
                                            like=<Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            return like;

                                        }
                                    })()} */}

                                {/* {like} */}
                                {/* {item.Likes == undefined &&
                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                    }
                                    {item.Likes != undefined &&
                                        <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                    } */}
                                {(() => {
                                    console.log(item.LikeList, item);
                                    if (item.LikeList.length > 0) {
                                        return <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Count.likeCount} </Text>

                                    }
                                })()}
                                {/* {item.Likes != undefined &&
                                        <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Likes.length} </Text>
                                    } */}
                                {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>123 </Text> */}
                            </View>
                            {/* </TouchableOpacity> */}

                            <TouchableOpacity
                                onPress={
                                    () => this.replyComment(item, index)
                                } >
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={20} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                    {item.LikeList.length > 0 &&
                                        <Text style={{ margin: 3, color: "#a7a7a7", }}>{item.Count.replyCount} </Text>

                                    }
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View>{
                            item.Reply != undefined && item.Reply.length > 0 && item.isReply != undefined &&
                            <View>{
                                item.Reply.map((item1, index) => (
                                    <View style={{ marginLeft: "20%" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ flexDirection: "row", width: "50%" }}>
                                                <View style={{ margin: 20 }}>
                                                    <Image source={require('../Images/user.jpg')}
                                                        style={{
                                                            height: 25,
                                                            width: 25,
                                                            borderRadius: 5,
                                                        }} />
                                                </View>
                                                <View style={{ margin: 20, marginLeft: 0, marginTop: 10 }}>
                                                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#969696" }}>{item1.UserName}</Text>

                                                </View>
                                            </View>
                                            <View style={{ width: "30%" }}>
                                                <Text style={{ fontSize: 15, color: "#969696", marginTop: 15 }}>5min ago</Text>
                                            </View>

                                        </View>
                                        <View style={{ width: "100%" }}>
                                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item1.Comment}</Text>

                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                                            {/* <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item1)
                                                } style={{ marginRight: 10 }}> */}
                                            <View style={{ flexDirection: "row", marginRight: 10 }}>
                                                {(() => {
                                                    console.log(item1.LikeList);
                                                    if (item1.LikeList.length > 0) {
                                                        like = <TouchableOpacity
                                                            onPress={
                                                                () => this.likeClick(item1)
                                                            } style={{}}>
                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                        </TouchableOpacity>
                                                        item1.LikeList.map((c, i) => {
                                                            if (c == this.UserData.UserId) {
                                                                like = <TouchableOpacity
                                                                    onPress={
                                                                        () => this.dislikeClick(item1)
                                                                    } style={{}}>
                                                                    <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                                                </TouchableOpacity>
                                                            }
                                                        })
                                                        return like;
                                                    } else {
                                                        like = <TouchableOpacity
                                                            onPress={
                                                                () => this.likeClick(item1)
                                                            } style={{}}>
                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                        </TouchableOpacity>
                                                        return like;

                                                    }
                                                })()}
                                                {/* {item1.Likes == undefined &&
                                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                                    }
                                                    {item1.Likes != undefined &&
                                                        <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                                    } */}
                                                {/* <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text> */}
                                                {item1.LikeList.length > 0 &&
                                                    <Text style={{ margin: 3, color: "#a7a7a7" }}>{item1.Count.likeCount} </Text>
                                                }
                                                {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>123 </Text> */}
                                            </View>
                                            {/* </TouchableOpacity> */}

                                            <TouchableOpacity
                                                onPress={
                                                    () => this.replyCommentReply(item1, index)
                                                } >
                                                <View style={{ flexDirection: "row", }}>
                                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={20} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                                    {item1.LikeList.length > 0 &&
                                                        <Text style={{ margin: 3, color: "#a7a7a7", }}>{item1.Count.replyCount} </Text>

                                                    }
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                        <View>{
                                            item1.Reply != undefined && item1.Reply.length > 0 && item1.isReply != undefined &&
                                            <View>{
                                                item1.Reply.map((item2, index) => (
                                                    <View style={{ marginLeft: "20%" }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <View style={{ flexDirection: "row", width: "50%" }}>
                                                                <View style={{ margin: 20 }}>
                                                                    <Image source={require('../Images/user.jpg')}
                                                                        style={{
                                                                            height: 25,
                                                                            width: 25,
                                                                            borderRadius: 5,
                                                                        }} />
                                                                </View>
                                                                <View style={{ margin: 20, marginLeft: 0, marginTop: 10 }}>
                                                                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#969696" }}>{item2.UserName}</Text>

                                                                </View>
                                                            </View>
                                                            <View style={{ width: "30%" }}>
                                                                <Text style={{ fontSize: 15, color: "#969696", marginTop: 15 }}>5min ago</Text>
                                                            </View>

                                                        </View>
                                                        <View style={{ width: "100%" }}>
                                                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item2.Comment}</Text>

                                                        </View>
                                                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                                                            {/* <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item1)
                                                } style={{ marginRight: 10 }}> */}
                                                            <View style={{ flexDirection: "row", marginRight: 10 }}>
                                                                {(() => {
                                                                    console.log(item2.LikeList);
                                                                    if (item2.LikeList.length > 0) {
                                                                        like = <TouchableOpacity
                                                                            onPress={
                                                                                () => this.likeClick(item2)
                                                                            } style={{}}>
                                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                                        </TouchableOpacity>
                                                                        item2.LikeList.map((c, i) => {
                                                                            if (c == this.UserData.UserId) {
                                                                                like = <TouchableOpacity
                                                                                    onPress={
                                                                                        () => this.dislikeClick(item2)
                                                                                    } style={{}}>
                                                                                    <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                                                                </TouchableOpacity>
                                                                            }
                                                                        })
                                                                        return like;
                                                                    } else {
                                                                        like = <TouchableOpacity
                                                                            onPress={
                                                                                () => this.likeClick(item2)
                                                                            } style={{}}>
                                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                                        </TouchableOpacity>
                                                                        return like;

                                                                    }
                                                                })()}
                                                                {/* {item1.Likes == undefined &&
                                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                                    }
                                                    {item1.Likes != undefined &&
                                                        <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                                    } */}
                                                                {/* <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text> */}
                                                                {item2.LikeList.length > 0 &&
                                                                    <Text style={{ margin: 3, color: "#a7a7a7" }}>{item2.Count.likeCount} </Text>
                                                                }
                                                                {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>123 </Text> */}
                                                            </View>
                                                            {/* </TouchableOpacity> */}

                                                            {/* <TouchableOpacity
                                                                onPress={
                                                                    () => this.replyCommentReply(item2, index)
                                                                } >
                                                                <View style={{ flexDirection: "row", }}>
                                                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={20} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                                                    {item2.LikeList.length > 0 &&
                                                                        <Text style={{ margin: 3, color: "#a7a7a7", }}>{item1.Count.replyCount} </Text>

                                                                    }
                                                                </View>
                                                            </TouchableOpacity> */}

                                                        </View>
                                                        {/* <View>
                                                            {item1.isReply != undefined &&
                                                                <View style={{ flexDirection: "row", width: "80%", }}>
                                                                    <View style={{ width: "80%", alignItems: "center" }}>
                                                                        <TextInput style={styles.Replyinput}
                                                                            underlineColorAndroid="transparent"
                                                                            placeholder="Write a comment..."
                                                                            placeholderTextColor="grey"
                                                                            autoCapitalize="none"
                                                                            value={this.state.CommentReplyText}
                                                                            onChangeText={this.CommentReplyChange} />
                                                                    </View>
                                                                    <View style={{ width: "20%", alignItems: "center" }}>

                                                                        {this.state.CommentReplyText != "" &&
                                                                            <TouchableOpacity
                                                                                onPress={
                                                                                    () => this.addReplyClick(item1)
                                                                                } >
                                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="send-circle-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                                            </TouchableOpacity>
                                                                        }
                                                                    </View>
                                                                </View>
                                                            }
                                                        </View> */}
                                                    </View>
                                                    // <Text style={{color:"white"}}>{item.Comment}</Text>
                                                ))
                                            }
                                            </View>
                                        }

                                        </View>
                                        <View>
                                            {item1.isReply != undefined &&
                                                <View style={{ flexDirection: "row", width: "80%", }}>
                                                    <View style={{ width: "80%", alignItems: "center" }}>
                                                        <TextInput style={styles.Replyinput}
                                                            underlineColorAndroid="transparent"
                                                            placeholder="Write a comment..."
                                                            placeholderTextColor="grey"
                                                            autoCapitalize="none"
                                                            value={this.state.CommentReplyText}
                                                            onChangeText={this.CommentReplyChange} />
                                                    </View>
                                                    <View style={{ width: "20%", alignItems: "center" }}>

                                                        {this.state.CommentReplyText != "" &&
                                                            <TouchableOpacity
                                                                onPress={
                                                                    () => this.addReplyClick(item1)
                                                                } >
                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="send-circle-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    // <Text style={{color:"white"}}>{item.Comment}</Text>
                                ))
                            }
                            </View>
                        }

                        </View>
                        <View>
                            {item.isReply != undefined &&
                                <View style={{ flexDirection: "row", width: "80%", }}>
                                    <View style={{ width: "80%", alignItems: "center" }}>
                                        <TextInput style={styles.Replyinput}
                                            underlineColorAndroid="transparent"
                                            placeholder="Write a comment..."
                                            placeholderTextColor="grey"
                                            autoCapitalize="none"
                                            value={this.state.CommentReplyText}
                                            onChangeText={this.CommentReplyChange} />
                                    </View>
                                    <View style={{ width: "20%", alignItems: "center" }}>
                                        {this.state.CommentReplyText != "" &&
                                            <TouchableOpacity
                                                onPress={
                                                    () => this.addReplyClick(item)
                                                } >
                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="send-circle-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            </TouchableOpacity>
                                        }

                                    </View>
                                </View>
                            }
                        </View>
                    </View>

                ))

        } else {
            list = <Text style={styles.HeadingText}>No Comments</Text>
        }
        return (
            <View style={styles.Comments}>
                <View style={styles.CommentsTop}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "20%", }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.GoToPosts()
                                }
                                style={{ borderWidth: 1, borderRadius: 15, backgroundColor: 'white', margin: 20 }}>
                                <AntDesign name="left" size={20} style={{ margin: 10, color: "black", }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "55%", }}>
                            {this.CommentsList.length > 0 &&
                                <Text style={styles.HeadingText}>Comments({this.CommentsList.length})</Text>
                            }
                            {this.CommentsList.length == 0 &&
                                <Text style={styles.HeadingText}>Comments(0)</Text>
                            }
                        </View>

                        {/* <View style={{ width: "25%", }}>
                            <TouchableOpacity
                                style={{ margin: 20 }}>
                                <Fontisto name="share-a" size={25} style={{ margin: 10, color: "white", }} />

                            </TouchableOpacity>
                        </View> */}
                    </View>

                </View>
                <ScrollView>
                    <View style={styles.CommentsBody}>

                        <View>{list}</View>


                        {/* <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flexDirection: "row", width: "70%" }}>
                                    <View style={{ margin: 20 }}>
                                        <Image source={require('../Images/user.jpg')}
                                            style={{
                                                height: 50,
                                                width: 50,
                                                borderRadius: 10,
                                            }} />
                                    </View>
                                    <View style={{ margin: 20, marginLeft: 0, marginTop: 40 }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 25, color: "#969696" }}>hanuman</Text>

                                    </View>
                                </View>
                                <View style={{ width: "30%" }}>
                                    <Text style={{ fontSize: 20, color: "#969696", marginTop: 40 }}>5min ago</Text>
                                </View>

                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>Hai All Good Evening</Text>

                            </View>
                            <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                                <TouchableOpacity
                                    onPress={
                                        () => this.ChangePage('Friends')
                                    } style={{ marginRight: 10 }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={
                                        () => this.ChangePage('Friends')
                                    } >
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View> */}



                    </View>
                </ScrollView>
                <View style={styles.CommentsFooter}>
                    <View style={{ width: "80%", alignItems: "center", marginTop: "5%" }}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Write a comment..."
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            value={this.state.CommentText}
                            onChangeText={this.CommentChange} />
                    </View>
                    <View style={{ width: "20%", alignItems: "center", marginTop: "6%" }}>

                        {this.state.CommentText != "" &&
                            <TouchableOpacity
                                onPress={
                                    () => this.SendComment()
                                } >
                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="send-circle-outline" size={30} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                            </TouchableOpacity>
                        }

                    </View>
                    {/* <Text style={styles.HeadingText}>hai</Text> */}
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    CommentsBody: {
        width: "100%",
        height: "70%",
    },
    Comments: {
        width: "100%",
        height: "100%",
        backgroundColor: '#1f1f21',
        //alignItems: 'center',
    },
    CommentsTop: {
        width: "100%",
        height: 100,
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    CommentsFooter: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

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
        height: "90%",
        marginBottom: 10,
        fontSize: 20
    },
    Replyinput: {
        color: "white",
        fontSize: 20
    },




});

export default Comments;
