
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
import QuestionModelJson from './QuestionModelJson';

//const publicIp = require('public-ip');
let answerObj = '';
let answerReplys = [];

class AnswerReply extends React.Component {
    services = new FireBaseFunctions();
    questionModel = new QuestionModelJson();
    CommentsList = [];
    UserData = {};
    PostData = {};
    constructor(props) {
        super(props);
        answerObj = props.route.params;
        this.state = {
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            isloading: true,
            CommentText: "",
            CommentReplyText: "",
            userIP: ""
        }
        //console.log(props.route.params.PostId);
        this.PostData = props.route.params.postData;
        this.UserData = props.route.params.UserData;
        this.getreplysByAnswerId();
    }

    BacktoViewQuestion = () => {
        this.props.navigation.navigate('QuestionDetailsPage')
    }

    getreplysByAnswerId = async () => {
        answerReplys = [];
        await firestore().collection("AskQuestionAnswerReply").where("QuestionId", "==", answerObj.QuestionId).where("ParentId", "==", answerObj.AnswerId)
            .onSnapshot((snapshot) => {
                answerReplys = [];
                snapshot.docs.forEach(doc => {
                    doc.data().isReply = undefined;
                    answerReplys.push(doc.data());
                });
                this.setState({ isloading: false })
            });
    }

    CommentChange = (text) => {
        this.setState({ CommentText: text })
    }
    CommentReplyChange = (text) => {
        this.setState({ CommentReplyText: text })
    }

    SendComment = async () => {
        if (this.state.CommentText != "") {
            const commId = this.services.getGuid();
            this.questionModel.answerReplyObj = {
                AnswerId: commId,
                ParentId: answerObj.AnswerId,
                QuestionId: answerObj.QuestionId,
                UserId: this.state.userProfileId,
                UserimageURL: this.state.userIcon || '',
                UserName: this.state.userName,
                Comment: this.state.CommentText,
                CommentGIF: '',
                Timestamp: new Date().toLocaleString(),
                UserIPAddress: this.state.userIP,
                Count: {
                    likeCount: 0,
                    dislikeCount: 0,
                    replyCount: 0
                },
                LikeList: [],
                DisLikeList: []
            }
            delete answerObj.Reply;
            await this.addReplyAnswer('AskQuestionAnswerReply', this.questionModel.answerReplyObj);
        }
    }

    addReplyAnswer = async (collectionName, postData) => {
        await firestore().collection(collectionName).doc(postData.AnswerId).set(postData);
        answerObj.Count.replyCount = answerObj.Count.replyCount + 1;
        await firestore().collection('AskQuestionAnswer').doc(answerObj.AnswerId).set(answerObj);
        this.setState({ CommentText: "" });
    }

    EditReply = async (reply) => {
        console.log('reply', reply)
        // this.questionModel.answerReplyObj = {
        //     AnswerId: reply.AnswerId,
        //     ParentId: reply.AnswerId,
        //     QuestionId: reply.QuestionId,
        //     UserId: this.state.userProfileId,
        //     UserimageURL: this.state.userIcon || '',
        //     UserName: this.state.userName,
        //     Comment: this.state.CommentText,
        //     CommentGIF: '',
        //     Timestamp: new Date().toLocaleString(),
        //     UserIPAddress: this.state.userIP,
        //     Count: reply.Count, 
        //     LikeList: reply.LikeList,
        //     DisLikeList: reply.DisLikeList
        // } 
        // await this.addReplyAnswer1('AskQuestionAnswerReply', this.questionModel.answerReplyObj);
    }


    replyComment = async (comment, index) => {
        this.setState({ loading: true })
        let items = [];
        await firestore().collection("AskQuestionAnswerReply").where("QuestionId", "==", comment.QuestionId).where("ParentId", "==", comment.AnswerId)
            .onSnapshot((snapshot) => {
                items = [];
                snapshot.forEach(function (doc) {
                    items.push(doc.data());
                });
                answerReplys[index].Reply = items;
                answerReplys[index].isReply = items;
                this.setState({ loading: false })
            });
    }

    addReplyClick = async (answerItem) => {
        //console.log(comment);
        //this.setState({ userIP: await publicIp.v4() })
        if (this.state.CommentReplyText != "") {
            const commId = this.services.getGuid();
            var countObj = {
                likeCount: 0,
                dislikeCount: 0,
                replyCount: 0
            }
            var obj = {
                AnswerId: commId,
                ParentId: answerItem.AnswerId,
                QuestionId: answerItem.QuestionId,
                UserId: this.state.userProfileId,
                UserimageURL: this.state.userIcon,
                UserName: this.state.userName,
                Comment: this.state.CommentReplyText,
                CommentGIF: '',
                Timestamp: new Date().toLocaleString(),
                UserIPAddress: this.state.userIP,
                Count: countObj,
                LikeList: [],
                DisLikeList: []
            }
            delete answerItem.Reply;
            await this.addReplyForReply('AskQuestionAnswerReply', answerItem, obj);
        }

    }

    addReplyForReply = async (collectionName, parentCommentData, obj) => {
        await firestore().collection(collectionName).doc(obj.AnswerId).set(obj);
        this.setState({ loading: true });
        const result = await this.getReplysByReplyId(obj);
        parentCommentData.Reply = result;
        this.setState({ CommentReplyText: "" });
        this.setState({ loading: false });
    }

    getReplysByReplyId = async (reply) => {
        let items = [];
        return await firestore().collection("AskQuestionAnswerReply").where("ParentId", "==", reply.ParentId).get().then((COMMENTREPLY) => {
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


    answerUpVoteLike = async (answerItem) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'REPLYLIKE',
            ParentId: answerItem.AnswerId,
            PostId: answerItem.QuestionId,
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon || '',
            UserName: this.state.userName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: this.state.userIP
        }
        await this.addanswerUpVote('AskQuestionLikes', answerItem, obj);
    }

    addanswerUpVote = async (collectionName, answerItem, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        let n = answerItem.DisLikeList.includes(obj.UserId);
        if (n == true) {
            answerItem.DisLikeList = answerItem.DisLikeList.filter(e => e !== obj.UserId);
            answerItem.LikeList.push(obj.UserId);
            answerItem.Count.likeCount = answerItem.Count.likeCount + 1;
            answerItem.Count.dislikeCount = answerItem.Count.dislikeCount - 1;
            await firestore().collection("AskQuestionLikes").where("UserId", "==", obj.UserId)
                .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
                .where("Type", "==", "REPLYDISLIKE")
                .onSnapshot(async (snapshot) => {
                    snapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                });
        }
        else {
            answerItem.LikeList.push(obj.UserId);
            answerItem.Count.likeCount = answerItem.Count.likeCount + 1;
        }
        await firestore().collection('AskQuestionAnswerReply').doc(answerItem.AnswerId).set(answerItem);
    }

    answerUpVoteDislike = async (answerItem) => {
        var i = answerItem.LikeList.indexOf(this.state.userProfileId);
        if (i != -1) {
            answerItem.LikeList.splice(i, 1);
        }
        await firestore().collection("AskQuestionLikes").where("UserId", "==", answerItem.UserId)
            .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
            .where("Type", "==", "REPLYLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        answerItem.Count.likeCount = answerItem.Count.likeCount - 1;
        await firestore().collection('AskQuestionAnswerReply').doc(answerItem.AnswerId).set(answerItem);
    }

    answerDownVoteLike = async (answerItem) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'REPLYDISLIKE',
            ParentId: answerItem.AnswerId,
            PostId: answerItem.QuestionId,
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon || '',
            UserName: this.state.userName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: this.state.userIP
        }
        await this.addanswerDownVote('AskQuestionLikes', answerItem, obj);
    }

    addanswerDownVote = async (collectionName, answerItem, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        let n = answerItem.LikeList.includes(obj.UserId);
        if (n == true) {
            answerItem.LikeList = answerItem.LikeList.filter(e => e !== obj.UserId);
            answerItem.DisLikeList.push(obj.UserId);
            answerItem.Count.dislikeCount = answerItem.Count.dislikeCount + 1;
            answerItem.Count.likeCount = answerItem.Count.likeCount - 1;
            await firestore().collection("AskQuestionLikes").where("UserId", "==", obj.UserId)
                .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
                .where("Type", "==", "REPLYLIKE")
                .onSnapshot(async (snapshot) => {
                    snapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                });
        }
        else {
            answerItem.DisLikeList.push(obj.UserId);
            answerItem.Count.dislikeCount = answerItem.Count.dislikeCount + 1;
        }
        await firestore().collection('AskQuestionAnswerReply').doc(answerItem.AnswerId).set(answerItem);
    }

    answerDownVoteDislike = async (answerItem) => {
        var i = answerItem.DisLikeList.indexOf(this.state.userProfileId);
        if (i != -1) {
            answerItem.DisLikeList.splice(i, 1);
        }
        await firestore().collection("AskQuestionLikes").where("UserId", "==", answerItem.UserId)
            .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
            .where("Type", "==", "REPLYDISLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        answerItem.Count.dislikeCount = answerItem.Count.dislikeCount - 1;
        await firestore().collection('AskQuestionAnswerReply').doc(answerItem.AnswerId).set(answerItem);
    }

    DeleteReply = async (reply) => {
        await firestore().collection("AskQuestionAnswerReply").doc(reply.AnswerId).delete();
    }




    render() {
        Moment.locale('en');
        let list;
        let like;
        if (answerReplys.length > 0 && this.state.isloading == false) {
            list =
                answerReplys.map((item, index) => (
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
                                <View style={{ margin: 20, marginLeft: 0, marginTop: 15 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, color: "#969696" }}>{item.UserName}</Text>
                                    <Text style={{ fontSize: 20, color: "#969696", marginTop: 2 }}>{Moment(item.Timestamp).fromNow()}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", width: "30%", marginTop: 40 }}>
                                <TouchableOpacity onPress={() => this.EditReply(item)}>
                                    <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.DeleteReply(item)}>
                                    <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: "100%" }}>
                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item.Comment}</Text>
                        </View>

                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                            <View style={{ width: "100%", flexDirection: "row", marginTop: 10, }}>
                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    {
                                        (() => {
                                            if (item.Count.likeCount > 0) {
                                                let likeDiv = <TouchableOpacity
                                                    onPress={
                                                        () => this.answerUpVoteLike(item)
                                                    }
                                                >
                                                    <View style={{ flexDirection: "row", }}>
                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.likeCount}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                item.LikeList.map(item1 => {
                                                    if (item1 == this.state.userProfileId) {
                                                        likeDiv = <TouchableOpacity
                                                            onPress={
                                                                () => this.answerUpVoteDislike(item)
                                                            }
                                                        >
                                                            <View style={{ flexDirection: "row", }}>
                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.likeCount}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    }
                                                })
                                                return likeDiv
                                            }
                                            else {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={
                                                            () => this.answerUpVoteLike(item)
                                                        }
                                                    >
                                                        <View style={{ flexDirection: "row", }}>
                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.likeCount}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })()
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    {
                                        (() => {
                                            if (item.Count.dislikeCount > 0) {
                                                let likeDiv = <TouchableOpacity
                                                    onPress={
                                                        () => this.answerDownVoteLike(item)
                                                    }
                                                >
                                                    <View style={{ flexDirection: "row", }}>
                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.dislikeCount}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                item.DisLikeList.map(item1 => {
                                                    if (item1 == this.state.userProfileId) {
                                                        likeDiv = <TouchableOpacity
                                                            onPress={
                                                                () => this.answerDownVoteDislike(item)
                                                            }
                                                        >
                                                            <View style={{ flexDirection: "row", }}>
                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.dislikeCount}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    }
                                                })
                                                return likeDiv
                                            }
                                            else {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={
                                                            () => this.answerDownVoteLike(item)
                                                        }
                                                    >
                                                        <View style={{ flexDirection: "row", }}>
                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.dislikeCount}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })()
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={
                                        () => this.replyComment(item, index)
                                    } >
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={22} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold" }}>{item.Count.replyCount} </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>




                        </View>

                        <View>{
                            item.Reply != undefined && item.Reply.length > 0 && item.isReply != undefined &&
                            <View>{
                                item.Reply.map((item1, index) => (
                                    <View style={{ marginLeft: "20%" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ flexDirection: "row", width: "70%" }}>
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
                                                    <Text style={{ fontSize: 15, color: "#969696", marginTop: 2 }}>{Moment(item1.Timestamp).fromNow()}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", width: "30%", marginTop: 20 }}>
                                                <TouchableOpacity onPress={() => this.EditReply1(item1)}>
                                                    <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.DeleteReply(item1)}>
                                                    <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ width: "100%" }}>
                                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item1.Comment}</Text>

                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>

                                            <View style={{ flexDirection: "row", marginRight: 10 }}>

                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                    {
                                                        (() => {
                                                            if (item1.Count.likeCount > 0) {
                                                                let likeDiv = <TouchableOpacity
                                                                    onPress={
                                                                        () => this.answerUpVoteLike(item1)
                                                                    }
                                                                >
                                                                    <View style={{ flexDirection: "row", }}>
                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.likeCount}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                item1.LikeList.map(likeitm => {
                                                                    if (likeitm == this.state.userProfileId) {
                                                                        likeDiv = <TouchableOpacity
                                                                            onPress={
                                                                                () => this.answerUpVoteDislike(item1)
                                                                            }
                                                                        >
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.likeCount}</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    }
                                                                })
                                                                return likeDiv
                                                            }
                                                            else {
                                                                return (
                                                                    <TouchableOpacity
                                                                        onPress={
                                                                            () => this.answerUpVoteLike(item1)
                                                                        }
                                                                    >
                                                                        <View style={{ flexDirection: "row", }}>
                                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.likeCount}</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                    {
                                                        (() => {
                                                            if (item1.Count.dislikeCount > 0) {
                                                                let likeDiv = <TouchableOpacity
                                                                    onPress={
                                                                        () => this.answerDownVoteLike(item1)
                                                                    }
                                                                >
                                                                    <View style={{ flexDirection: "row", }}>
                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.dislikeCount}</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                item1.DisLikeList.map(dislikeitem => {
                                                                    if (dislikeitem == this.state.userProfileId) {
                                                                        likeDiv = <TouchableOpacity
                                                                            onPress={
                                                                                () => this.answerDownVoteDislike(item1)
                                                                            }
                                                                        >
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.dislikeCount}</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    }
                                                                })
                                                                return likeDiv
                                                            }
                                                            else {
                                                                return (
                                                                    <TouchableOpacity
                                                                        onPress={
                                                                            () => this.answerDownVoteLike(item1)
                                                                        }
                                                                    >
                                                                        <View style={{ flexDirection: "row", }}>
                                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item1.Count.dislikeCount}</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </TouchableOpacity>


                                            </View>

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
                                                            <View style={{ flexDirection: "row", width: "70%" }}>
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
                                                                    <Text style={{ fontSize: 15, color: "#969696", marginTop: 2 }}>{Moment(item2.Timestamp).fromNow()}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: "row", width: "30%", marginTop: 20 }}>
                                                                <TouchableOpacity onPress={() => this.EditReply1(item2)}>
                                                                    <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => this.DeleteReply(item2)}>
                                                                    <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={{ width: "100%" }}>
                                                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item2.Comment}</Text>

                                                        </View>
                                                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                                                            <View style={{ flexDirection: "row", marginRight: 10 }}>
                                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                                    {
                                                                        (() => {
                                                                            if (item2.Count.likeCount > 0) {
                                                                                let likeDiv = <TouchableOpacity
                                                                                    onPress={
                                                                                        () => this.answerUpVoteLike(item2)
                                                                                    }
                                                                                >
                                                                                    <View style={{ flexDirection: "row", }}>
                                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.likeCount}</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                item2.LikeList.map(likeitm1 => {
                                                                                    if (likeitm1 == this.state.userProfileId) {
                                                                                        likeDiv = <TouchableOpacity
                                                                                            onPress={
                                                                                                () => this.answerUpVoteDislike(item2)
                                                                                            }
                                                                                        >
                                                                                            <View style={{ flexDirection: "row", }}>
                                                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.likeCount}</Text>
                                                                                            </View>
                                                                                        </TouchableOpacity> 
                                                                                    }
                                                                                })
                                                                                return likeDiv
                                                                            }
                                                                            else {
                                                                                return (
                                                                                    <TouchableOpacity
                                                                                        onPress={
                                                                                            () => this.answerUpVoteLike(item2)
                                                                                        }
                                                                                    >
                                                                                        <View style={{ flexDirection: "row", }}>
                                                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-up-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.likeCount}</Text>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                                    {
                                                                        (() => {
                                                                            if (item2.Count.dislikeCount > 0) {
                                                                                let likeDiv = <TouchableOpacity
                                                                                    onPress={
                                                                                        () => this.answerDownVoteLike(item2)
                                                                                    }
                                                                                >
                                                                                    <View style={{ flexDirection: "row", }}>
                                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.dislikeCount}</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                item2.DisLikeList.map(dislikeitem1 => {
                                                                                    if (dislikeitem1 == this.state.userProfileId) {
                                                                                        likeDiv = <TouchableOpacity
                                                                                            onPress={
                                                                                                () => this.answerDownVoteDislike(item2)
                                                                                            }
                                                                                        >
                                                                                            <View style={{ flexDirection: "row", }}>
                                                                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                                                <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.dislikeCount}</Text>
                                                                                            </View>
                                                                                        </TouchableOpacity>
                                                                                    }
                                                                                })
                                                                                return likeDiv
                                                                            }
                                                                            else {
                                                                                return (
                                                                                    <TouchableOpacity
                                                                                        onPress={
                                                                                            () => this.answerDownVoteLike(item2)
                                                                                        }
                                                                                    >
                                                                                        <View style={{ flexDirection: "row", }}>
                                                                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="arrow-down-bold-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item2.Count.dislikeCount}</Text>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                )  
                                                                            }
                                                                        })()
                                                                    }
                                                                </TouchableOpacity>
                                                            </View>


                                                        </View>

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
                                                            placeholder="Write a reply..."
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
            list = <Text style={styles.HeadingText}>Reply's not found</Text>
        }
        return (
            <View style={styles.Comments}>
                <View style={styles.CommentsTop}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "20%", }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.BacktoViewQuestion()
                                }
                                style={{ borderWidth: 1, borderRadius: 15, backgroundColor: 'white', margin: 20 }}>
                                <AntDesign name="left" size={20} style={{ margin: 10, color: "black", }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "55%", }}>
                            {answerReplys.length > 0 &&
                                <Text style={styles.HeadingText}>Reply's({answerReplys.length})</Text>
                            }
                            {answerReplys.length == 0 &&
                                <Text style={styles.HeadingText}>Reply's(0)</Text>
                            }
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.CommentsBody}>
                        <View>{list}</View>
                    </View>
                </ScrollView>

                <View style={styles.CommentsFooter}>
                    <View style={{ width: "80%", alignItems: "center", marginTop: "5%" }}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Write a reply ..."
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

export default AnswerReply;
