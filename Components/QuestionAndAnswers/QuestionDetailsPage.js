import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { Alert, Modal, Pressable, } from "react-native";
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

import DeleteModel from './DeleteModel';
import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';
import Moment from 'moment';
import QuestionModelJson from './QuestionModelJson';

let questionItem = '';
let questionId = '';
let QuestAnswers = [];
class QuestionDetailsPage extends React.Component {
    services = new FireBaseFunctions();
    questionModel = new QuestionModelJson();
    constructor(props) {
        super(props);
        questionId = props.route.params;
        this.state = {
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            email: '',
            password: '',
            modalVisible: false,
            isloading: true,
            deleteAnswer: false,
            deleteQuestion: false,
        }
        this.getquestionById();
        this.getAnswersByQuestId();
    }

    getquestionById = async () => {
        this.setState({ isloading: true })
        await firestore().collection("AskQuestion").doc(questionId)
            .onSnapshot((doc) => {
                questionItem = doc.data();
                this.setState({ isloading: false })
            });
    }

    getAnswersByQuestId = async () => {
        this.setState({ isloading: true })
        QuestAnswers = [];
        await firestore().collection("AskQuestionAnswer").where("QuestionId", "==", questionId)
            .where('IsDelete', "==", false).orderBy('CreatedTime', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                QuestAnswers = [];
                snapshot.forEach(function (doc) {
                    QuestAnswers.push(doc.data());
                });
                this.setState({ isloading: false })
            });
    }

    BacktoQuestionHomePage = () => {
        this.props.navigation.navigate('QAHomePage')
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    GotoPostAnswerPage = (question) => {
        this.questionModel.answerModelObj = {
            Answer: '',
            AnswerId: '',
            Count: {
                dislikeCount: 0,
                likeCount: 0,
                replyCount: 0
            },
            CreatedTime: '',
            DisLikeList: [],
            ImageURL: [],
            IsDelete: false,
            LikeList: [],
            ParentId: '',
            QuestionId: '',
            UserIPAddress: '',
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon,
            UserName: this.state.userName,
            IsEdit: false
        }
        question.AnswerObj = this.questionModel.answerModelObj;
        this.props.navigation.navigate('PostQuestionAnswerPage', question)
        //this.setState({ isDisplay: '2' });
    }

    likeClick = async (question) => {
        // this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'ASKQUESTIONLIKE',
            ParentId: question.QuestionId,
            PostId: question.QuestionId,
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon,
            UserName: this.state.userName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: this.state.userIP
        }
        await this.addLike('AskQuestionLikes', question, obj);
    }

    addLike = async (collectionName, question, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        question.LikeList.push(obj.UserId);
        question.Count.likeCount = question.Count.likeCount + 1;
        await firestore().collection('AskQuestion').doc(question.QuestionId).set(question);
    }

    dislikeClick = async (question) => {
        var i = question.LikeList.indexOf(this.state.userProfileId);
        if (i != -1) {
            question.LikeList.splice(i, 1);
        }
        await firestore().collection("AskQuestionLikes").where("UserId", "==", question.UserId)
            .where("PostId", "==", question.QuestionId).where("ParentId", "==", question.QuestionId).where("Type", "==", "ASKQUESTIONLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        question.Count.likeCount = question.Count.likeCount - 1;
        await firestore().collection('AskQuestion').doc(question.QuestionId).set(question);
    }

    answerUpVoteLike = async (answerItem) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'ANSWERLIKE',
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
                .where("Type", "==", "ANSWERDISLIKE")
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
        await firestore().collection('AskQuestionAnswer').doc(answerItem.AnswerId).set(answerItem);

    }

    answerUpVoteDislike = async (answerItem) => {
        var i = answerItem.LikeList.indexOf(this.state.userProfileId);
        if (i != -1) {
            answerItem.LikeList.splice(i, 1);
        }
        await firestore().collection("AskQuestionLikes").where("UserId", "==", answerItem.UserId)
            .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
            .where("Type", "==", "ANSWERLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        answerItem.Count.likeCount = answerItem.Count.likeCount - 1;
        await firestore().collection('AskQuestionAnswer').doc(answerItem.AnswerId).set(answerItem);
    }

    answerDownVoteLike = async (answerItem) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'ANSWERDISLIKE',
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
                .where("Type", "==", "ANSWERLIKE")
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
        await firestore().collection('AskQuestionAnswer').doc(answerItem.AnswerId).set(answerItem);
    }

    answerDownVoteDislike = async (answerItem) => {
        var i = answerItem.DisLikeList.indexOf(this.state.userProfileId);
        if (i != -1) {
            answerItem.DisLikeList.splice(i, 1);
        }
        await firestore().collection("AskQuestionLikes").where("UserId", "==", answerItem.UserId)
            .where("PostId", "==", answerItem.QuestionId).where("ParentId", "==", answerItem.AnswerId)
            .where("Type", "==", "ANSWERDISLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        answerItem.Count.dislikeCount = answerItem.Count.dislikeCount - 1;
        await firestore().collection('AskQuestionAnswer').doc(answerItem.AnswerId).set(answerItem);
    }

    answerReplyClick = async (answer) => {
        this.props.navigation.navigate('AnswerReply', answer);
    }


    DeleteAnswer = (answer) => {
        this.setState({ deleteAnswer: answer.AnswerId });
    }
    DeleteAnswerDialogClose = () => {
        this.setState({ deleteAnswer: false });
    }

    deleteConfirm = async (answer) => {
        this.setState({ deleteAnswer: false });
        answer.IsDelete = true;
        let questionObj = '';
        questionObj = questionItem;
        await firestore().collection("AskQuestionAnswer").doc(answer.AnswerId).set(answer);
        questionObj.Count.answerCount = questionObj.Count.answerCount - 1;
        await firestore().collection("AskQuestion").doc(questionObj.QuestionId).update({
            "Count.answerCount": questionObj.Count.answerCount
        });
    }

    EditAnswer = (answer) => {
        this.questionModel.answerModelObj = {
            Answer: answer.Answer,
            AnswerId: answer.AnswerId,
            Count: answer.Count,
            CreatedTime: answer.CreatedTime,
            DisLikeList: answer.DisLikeList,
            ImageURL: answer.ImageURL,
            IsDelete: answer.IsDelete,
            LikeList: answer.LikeList,
            ParentId: answer.ParentId,
            QuestionId: answer.QuestionId,
            UserIPAddress: this.state.userIP,
            UserId: answer.UserId,
            UserName: answer.UserName,
            UserimageURL: answer.UserimageURL,
            IsEdit: true
        }
        let question = '';
        question = questionItem;
        question.AnswerObj = this.questionModel.answerModelObj;
        this.props.navigation.navigate('PostQuestionAnswerPage', question)
    }

    EditQuestion = (question) => {
        this.questionModel.questionModelObj = {
            QuestionId: question.QuestionId,
            Question: question.Question,
            Description: question.Description,
            UserId: question.UserId,
            UserimageURL: question.UserimageURL,
            UserName: question.UserName,
            UserIPAddress: this.state.userIP,
            CreatedTime: question.CreatedTime,
            ImageURL: question.ImageURL,
            Count: question.Count,
            LikeList: question.LikeList,
            FollowList: question.FollowList,
            UnFollowList: question.UnFollowList
        }
        this.props.navigation.navigate('AskOrEditQuestion', this.questionModel.questionModelObj);
    }

    DeleteQuestion = (question) => {
        this.setState({ deleteQuestion: question.QuestionId });
    }
    DeleteQuestionDialogClose = () => {
        this.setState({ deleteQuestion: false });
    }

    render() {
        Moment.locale('en');
        const { modalVisible, deleteAnswer, deleteQuestion } = this.state;
        if (this.state.isloading == false && questionItem != undefined) {
            return (
                <View style={{ marginBottom: 100 }}>
                    <View style={{ flexDirection: "row", }}>
                        <View style={{ width: "25%", margin: 20, }}>
                            <TouchableOpacity onPress={() => this.BacktoQuestionHomePage()}>
                                <Text>
                                    <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "#1e74f5", }} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "75%", }}>
                            <Text style={{ margin: 20, color: "#1e74f5", fontSize: 20, }}>Visil</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ margin: 20 }}>
                            <View>
                                <View View style={{ flexDirection: "row", marginBottom: 15, width: "100%" }}>

                                    <View style={{ flexDirection: "row", width: "80%" }}>
                                        <View>
                                            <Image source={require('../Images/user.jpg')}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 50,
                                                }} />
                                        </View>
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>{questionItem.UserName}</Text>
                                            <Text style={{ fontSize: 15, color: "black" }}>{Moment(questionItem.CreatedTime).fromNow()}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", width: "20%", textAlign: "right", marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.EditQuestion(questionItem)}>
                                            <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.DeleteQuestion(questionItem)}>
                                            <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {
                                    (() => {
                                        if (questionItem.ImageURL.length > 0) {
                                            return (
                                                questionItem.ImageURL.map((c) => {
                                                    return (
                                                        <View style={{marginBottom:10}}>
                                                            <Image source={{ uri: c.url }}
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

                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ fontSize: 25, color: "#282829", fontWeight: "bold" }}>{questionItem.Question}</Text>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 18, }}>{questionItem.Description}</Text>
                                </View>

                                <View style={{ width: "100%", flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
                                    <View style={{ flexDirection: "row", marginRight: 15 }}>
                                        {
                                            (() => {
                                                if (questionItem.Count.likeCount > 0) {
                                                    let likeDiv = <TouchableOpacity
                                                        onPress={
                                                            () => this.likeClick(questionItem)
                                                        } style={{}}>
                                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                    </TouchableOpacity>

                                                    if (questionItem.LikeList.length > 0) {
                                                        questionItem.LikeList.map(item1 => {
                                                            if (item1 == this.state.userProfileId) {
                                                                likeDiv = <TouchableOpacity
                                                                    onPress={
                                                                        () => this.dislikeClick(questionItem)
                                                                    } style={{}}>
                                                                    <Text style={{ margin: 3 }}><AntDesign name="heart" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                                </TouchableOpacity>
                                                            }
                                                        })
                                                    } else {
                                                        likeDiv = <TouchableOpacity
                                                            onPress={
                                                                () => this.likeClick(questionItem)
                                                            } style={{}}>
                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                        </TouchableOpacity>
                                                    }
                                                    return likeDiv
                                                }
                                                else {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={
                                                                () => this.likeClick(questionItem)
                                                            } style={{}}>
                                                            <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            })()
                                        }
                                        <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{questionItem.Count.likeCount} </Text>
                                    </View>

                                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.GotoPostAnswerPage(questionItem)}>
                                        <View style={{ flexDirection: "row", backgroundColor: "#e3e3e3", borderRadius: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3 }}>
                                            <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{questionItem.Count.answerCount} Answer</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                                        <TouchableOpacity style={{ marginRight: 15 }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Text style={{ margin: 3 }}><MaterialCommunityIcons name="share-outline" size={30} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginRight: 15 }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Text style={{ margin: 3 }}><FontAwesome name="bookmark" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <View style={{ flexDirection: "row", }}>
                                                <Text style={{ margin: 3 }}><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    (() => {
                                        if (deleteQuestion == questionItem.QuestionId) {
                                            return (
                                                <DeleteModel questionItemObj={questionItem} Hide={this.DeleteQuestionDialogClose} />
                                            )
                                        }
                                    })()
                                }
                            </View>


                            {
                                (() => {
                                    if (QuestAnswers.length > 0) {
                                        return (
                                            QuestAnswers.map((item, index) => {
                                                return (
                                                    <View style={{ marginTop: 20 }}>
                                                        <View style={styles.AnswerBlock}>
                                                            <View style={{ flexDirection: "row", marginBottom: 10, width: "100%" }}>
                                                                <View style={{ flexDirection: "row", width: "80%" }}>
                                                                    <View >
                                                                        <Image source={require('../Images/user.jpg')}
                                                                            style={{
                                                                                height: 50,
                                                                                width: 50,
                                                                                borderRadius: 50,
                                                                            }} />
                                                                    </View>
                                                                    <View style={{ paddingLeft: 15 }}>
                                                                        <Text style={{ fontSize: 20, color: "#282829", fontWeight: "bold" }}>{item.UserName}</Text>
                                                                        <Text style={{ fontSize: 15, color: "black" }}>{Moment(item.CreatedTime).fromNow()}</Text>

                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: "row", width: "20%", textAlign: "right", marginTop: 10 }}>
                                                                    <TouchableOpacity onPress={() => this.EditAnswer(item)}>
                                                                        <Text  ><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => this.DeleteAnswer(item)}>
                                                                        <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: "row", width: "100%", marginBottom: 10, }}>
                                                                <Text style={{ fontSize: 18, color: "black" }}>
                                                                    {item.Answer}
                                                                </Text>
                                                            </View>
                                                            {
                                                                (() => {
                                                                    if (item.ImageURL.length > 0) {
                                                                        return (
                                                                            item.ImageURL.map((c) => {
                                                                                return (
                                                                                    <View style={{marginBottom:10}}>
                                                                                        <Image source={{ uri: c.url }}
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


                                                                <TouchableOpacity onPress={
                                                                    () => this.answerReplyClick(item)
                                                                } style={{ marginRight: 10 }}>
                                                                    <View style={{ flexDirection: "row", backgroundColor: "#f2f2f2", borderRadius: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3 }}>
                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                        <Text style={{ fontSize: 22, color: "#a6a6a8", fontWeight: "bold", }}>{item.Count.replyCount} Reply</Text>
                                                                    </View>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                                    <View style={{ flexDirection: "row", }}>
                                                                        <Text style={{ margin: 3 }}><MaterialCommunityIcons name="share-outline" size={30} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{ marginRight: 10 }}>
                                                                    <View style={{ flexDirection: "row", }}>
                                                                        <Text style={{ margin: 3 }}><FontAwesome name="bookmark" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                    </View>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity>
                                                                    <View style={{ flexDirection: "row", }}>
                                                                        <Text style={{ margin: 3 }}><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /> </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>

                                                        {
                                                            (() => {
                                                                if (deleteAnswer == item.AnswerId) {
                                                                    return (
                                                                        <View style={styles.centeredView}>
                                                                            <Modal
                                                                                animationType="slide"
                                                                                transparent={true}
                                                                                visible={true}
                                                                                onRequestClose={() => {
                                                                                    Alert.alert("Modal has been closed.");
                                                                                    this.DeleteAnswerDialogClose();
                                                                                }}
                                                                            >
                                                                                <View style={styles.centeredView}>
                                                                                    <View style={styles.modalView}>
                                                                                        <Text style={styles.modalText}>Confirm Deletion</Text>
                                                                                        <Text style={styles.modalText1}>Are you sure you want to delete this Answer?</Text>
                                                                                        <View style={{ flexDirection: "row", marginTop: 20, alignSelf: 'flex-end' }}>
                                                                                            <Pressable
                                                                                                style={{ marginRight: 20 }}
                                                                                                onPress={() => this.DeleteAnswerDialogClose()}
                                                                                            >
                                                                                                <Text style={styles.textStyle}>CANCEL</Text>
                                                                                            </Pressable>
                                                                                            <Pressable
                                                                                                onPress={() => this.deleteConfirm(item)}
                                                                                            >
                                                                                                <Text style={styles.textStyle1}>DELETE</Text>
                                                                                            </Pressable>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            </Modal>
                                                                        </View>
                                                                    )
                                                                }
                                                            })()
                                                        }

                                                    </View>
                                                )
                                            })
                                        )
                                    }
                                    else {
                                        return (
                                            <View style={{ marginTop: 20 }}>
                                                <View style={styles.AnswerBlock}>
                                                    <Text>No answers found</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                })()
                            }
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else {
            return null
        }
    };
}

const styles = StyleSheet.create({

    AnswerBlock: {

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
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
    },
    textStyle1: {
        color: "blue",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "left",
    }
});

export default QuestionDetailsPage;
