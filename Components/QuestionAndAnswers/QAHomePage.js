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
import { Alert, Modal, Pressable } from "react-native";
import { Image } from 'react-native';
import Popover from 'react-native-popover-view';

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

let questions = [];
class QAHomePage extends React.Component {
    services = new FireBaseFunctions();
    questionModel = new QuestionModelJson();
    constructor(props) {
        super(props);
        this.state = {
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            email: '',
            password: '',
            isDisplay: '1',
            isloading: false,
            modalVisible: false,
            deleteQuestion: false,
            followQuestion: false,
        }
        this.getAllQuestions();
    }

    getAllQuestions = async () => {
        this.setState({ isloading: true });
        await firestore().collection('AskQuestion').where('IsDelete', "==", false).orderBy('CreatedTime', 'desc').limit(10)
            .onSnapshot((snapshot) => {
                questions = [];
                snapshot.docs.forEach(function (doc) {
                    questions.push(doc.data());
                });
                this.setState({ isloading: false })
            });
    }


    SelectQuestions = () => {
        this.setState({ isDisplay: '1' });
    }
    SelectAnswers = () => {
        this.setState({ isDisplay: '2' });
    }

    QuestionExpand = (question) => {
        this.props.navigation.navigate('QuestionDetailsPage', question.QuestionId)
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

    addQuestionClick = () => {
        this.questionModel.questionModelObj = {
            QuestionId: '',
            Question: '',
            Description: '',
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon,
            UserName: this.state.userName,
            UserIPAddress: '',
            CreatedTime: '',
            ImageURL: [],
            Count: {
                likeCount: 0,
                answerCount: 0,
                followCount: 0,
                unfollowCount: 0
            },
            LikeList: [],
            FollowList: [],
            UnFollowList: []
        }
        this.props.navigation.navigate('AskOrEditQuestion', this.questionModel.questionModelObj);
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

    followClick = (question) => {
        this.setState({ followQuestion: question.QuestionId });
    }

    setShowPopover = (isVisible) => {
        this.setState({ followQuestion: isVisible });
    }

    followClickEvent = async (question, type) => {
        const followId = this.services.getGuid();
        var obj = {
            Id: followId,
            Type: type,
            ParentId: question.QuestionId,
            QuestionId: question.QuestionId,
            UserId: this.state.userProfileId,
            UserimageURL: this.state.userIcon || '',
            UserName: this.state.userName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: this.state.userIP
        }
        if (type == 'FOLLOWQUESTION') {
            await this.addFollow('FollowQuestions', question, obj);
        }
        else {
            await this.addUnFollow('FollowQuestions', question, obj);
        }
        setTimeout(
            () => this.setShowPopover(false),
            1000
        );
    }

    addFollow = async (collectionName, question, obj) => {
        await firestore().collection(collectionName).doc(obj.Id).set(obj);
        let n = question.UnFollowList.includes(obj.UserId);
        if (n == true) {
            question.UnFollowList = question.UnFollowList.filter(e => e !== obj.UserId);
            question.FollowList.push(obj.UserId);
            question.Count.followCount = question.Count.followCount + 1;
            question.Count.unfollowCount = question.Count.unfollowCount - 1;
            await firestore().collection("FollowQuestions").where("UserId", "==", obj.UserId)
                .where("QuestionId", "==", question.QuestionId).where("ParentId", "==", question.QuestionId)
                .where("Type", "==", "UNFOLLOWQUESTION")
                .onSnapshot(async (snapshot) => {
                    snapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                });
        }
        else {
            question.FollowList.push(obj.UserId);
            question.Count.followCount = question.Count.followCount + 1;
        }
        await firestore().collection('AskQuestion').doc(question.QuestionId).set(question);
        //this.setState({ followAlert: true })
    }

    addUnFollow = async (collectionName, question, obj) => {
        await firestore().collection(collectionName).doc(obj.Id).set(obj);
        let n = question.FollowList.includes(obj.UserId);
        if (n == true) {
            question.FollowList = question.FollowList.filter(e => e !== obj.UserId);
            question.UnFollowList.push(obj.UserId);
            question.Count.unfollowCount = question.Count.unfollowCount + 1;
            question.Count.followCount = question.Count.followCount - 1;
            await firestore().collection("FollowQuestions").where("UserId", "==", obj.UserId)
                .where("QuestionId", "==", question.QuestionId).where("ParentId", "==", question.QuestionId)
                .where("Type", "==", "FOLLOWQUESTION")
                .onSnapshot(async (snapshot) => {
                    snapshot.forEach(function (doc) {
                        doc.ref.delete();
                    });
                });
        }
        else {
            question.UnFollowList.push(obj.UserId);
            question.Count.unfollowCount = question.Count.unfollowCount + 1;
        }
        await firestore().collection('AskQuestion').doc(question.QuestionId).set(question);
        //this.setState({ unfollowAlert: true })
    }

    BackToHome=()=>{
        this.props.navigation.navigate("HomePage");
    }


    render() {
        Moment.locale('en');
        const { modalVisible, deleteQuestion } = this.state;
        let questionsGrid;
        if (questions.length > 0) {
            questionsGrid = questions.map((item, index) => (
                <View style={{ margin: 20, borderBottomColor: "#c7c7c7", borderBottomWidth: 1, }}>
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
                            <TouchableOpacity onPress={() => this.EditQuestion(item)}>
                                <Text><MaterialIcons name="edit" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.DeleteQuestion(item)}>
                                <Text style={{ paddingLeft: 10 }}><MaterialCommunityIcons name="delete-forever-outline" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.followClick(item)}>
                                <Text style={{ paddingLeft: 10 }} ><Feather name="more-vertical" size={25} style={{ margin: 20, color: "#a6a6a8" }} /></Text>
                            </TouchableOpacity>
                            {
                                (() => {
                                    if (this.state.followQuestion == item.QuestionId) {
                                        return (
                                            <Popover isVisible={true} onRequestClose={() => this.setShowPopover(false)}>
                                                <View style={{ padding: 10, width: 300 }}>
                                                    <TouchableOpacity onPress={() => this.followClickEvent(item, 'FOLLOWQUESTION')}>
                                                        <View style={{ borderBottomWidth: 1, borderBottomColor: "thistle", }}>
                                                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Follow</Text>
                                                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Turn on notifications for this question.</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.followClickEvent(item, 'UNFOLLOWQUESTION')}>
                                                        <View style={{ borderBottomWidth: 1, borderBottomColor: "thistle", }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Unfollow</Text>
                                                            <Text style={{ fontSize: 12, textAlign: 'center' }}>Stop seeing questions but stay friends.</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Report question</Text>
                                                        <Text style={{ fontSize: 12, textAlign: 'center' }}>I'm concerned about this question.</Text>
                                                    </View>
                                                </View>
                                            </Popover>
                                        )
                                    }
                                })()
                            }

                        </View>
                    </View>

                    <View >
                        <TouchableOpacity onPress={() => this.QuestionExpand(item)}>
                            <Text style={{ fontSize: 27, color: "black", lineHeight: 40, fontWeight: "500" }}>Q : {item.Question}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        (() => {
                            if (item.Description != '') {
                                return (
                                    <View >
                                        <TouchableOpacity onPress={() => this.QuestionExpand(item)}>
                                            <Text style={{ fontSize: 20, color: "black", lineHeight: 40, }}>{item.Description}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })()
                    }
                    {
                        (() => {
                            if (item.ImageURL.length > 0) {
                                return (
                                    item.ImageURL.map((c) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.QuestionExpand(item)}>
                                                <View style={{ marginBottom: 10 }}>
                                                    <Image source={{ uri: c.url }}
                                                        style={{
                                                            height: 200,
                                                            width: "100%",
                                                            borderRadius: 20
                                                        }} />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                )
                            }
                        })()
                    }
                    <View style={{ width: "100%", flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
                        <View style={{ width: "80%", flexDirection: "row", }}>
                            <View style={{ flexDirection: "row", }}>
                                {
                                    (() => {
                                        if (item.Count.likeCount > 0) {
                                            let likeDiv = <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item)
                                                } style={{}}>
                                                <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                            </TouchableOpacity>

                                            if (item.LikeList.length > 0) {
                                                item.LikeList.map(item1 => {
                                                    if (item1 == this.state.userProfileId) {
                                                        likeDiv = <TouchableOpacity
                                                            onPress={
                                                                () => this.dislikeClick(item)
                                                            } style={{}}>
                                                            <Text style={{ margin: 3 }}><AntDesign name="heart" size={25} style={{ margin: 20, color: "red" }} /> </Text>
                                                        </TouchableOpacity>
                                                    }
                                                })
                                            } else {
                                                likeDiv = <TouchableOpacity
                                                    onPress={
                                                        () => this.likeClick(item)
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
                                                        () => this.likeClick(item)
                                                    } style={{}}>
                                                    <Text style={{ margin: 3 }}><AntDesign name="hearto" size={25} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    })()
                                }
                                <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>{item.Count.likeCount} </Text>
                            </View>

                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.QuestionExpand(item)}>
                                <View style={{ flexDirection: "row", backgroundColor: "#e3e3e3", borderRadius: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3 }}>
                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-text-outline" size={25} style={{ margin: 20, color: "#b5b5b7" }} /></Text>
                                    <Text style={{ fontSize: 22, color: "#b5b5b7", fontWeight: "bold", }}>{item.Count.answerCount} Answer</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "20%", flexDirection: "row", }}>
                            <TouchableOpacity style={{ width: "50%" }}>
                                <Text ><MaterialCommunityIcons name="share-outline" size={25} style={{ color: "#b5b5b7" }} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "50%" }}>
                                <Text ><FontAwesome name="bookmark" size={25} style={{ color: "#b5b5b7" }} /> </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        (() => {
                            if (deleteQuestion == item.QuestionId) {
                                return (
                                    <DeleteModel questionItemObj={item} Hide={this.DeleteQuestionDialogClose} />
                                )
                            }
                        })()
                    }

                </View>
            ))
        }
        else {
            questionsGrid = <Text>Questions not found</Text>
        }
        const EmailFeild =
            <View style={{ marginBottom: 100 }}>
                <ScrollView>
                    <View>
                        <View>{questionsGrid}</View>
                    </View>
                </ScrollView>
            </View>;

        const PhoneNumberFeild = <View>
            <Text>Page Under Construction</Text>
        </View>;

        const EmailTab = <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
                onPress={
                    () => this.SelectQuestions()
                }>
                <Text style={styles.SelectedTabBtn}> Questions  ({questions.length}) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectAnswers()
                }>
                <Text style={styles.TabBtn}> Answers </Text>
            </TouchableOpacity>

        </View>;

        const PhoneTab = <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={
                    () => this.SelectQuestions()
                }>
                <Text style={styles.TabBtn}> Questions ({questions.length}) </Text>
            </TouchableOpacity>

            <TouchableOpacity
                //style={styles.NextButton}
                onPress={
                    () => this.SelectAnswers()
                }>
                <Text style={styles.SelectedTabBtn}> Answers </Text>
            </TouchableOpacity>
        </View>;
        return (
            <View style={styles.QAHome}>
                <ImageBackground source={require('../Images/QABackground.png')} style={{}}>
                    {/* <View style={{ height: "100%",backgroundColor:"#0000003b" }}> */}
                    <View style={{ height: "30%" }}>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: "25%", margin: 20, }}>
                                <TouchableOpacity
                                    //style={styles.NextButton}
                                    onPress={
                                        () => this.BackToHome()
                                    }>
                                    <Text style={{ backgroundColor: "#20212487", borderRadius: 50, height: 35, width: 35, padding: 5 }}>
                                        <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "white", }} />
                                    </Text>
                                    </TouchableOpacity>
                            </View>
                                <View style={{ width: "75%", }}>
                                    <Text style={{ margin: 20, color: "white", fontSize: 20, }}>Visil</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ width: "70%", alignItems: "center" }}>
                                    <Text style={{ fontSize: 40, color: "white", textAlign: 'center', paddingTop: 15, }}>{this.state.userName}</Text>
                                </View>
                                <View style={{ margin: 5, width: "30%" }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 90,
                                            width: 90,
                                            borderRadius: 50,
                                            borderColor: "white",
                                            borderWidth: 3,
                                        }} />
                                </View>
                            </View>


                        </View>

                        <View style={{ height: "65%", backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 50, }}>
                            <View style={{ marginTop: 20, }}>
                                <View style={styles.TabsBlock}>
                                    {this.state.isDisplay <= 1 ? EmailTab : PhoneTab}
                                </View>
                                <View>
                                    {this.state.isDisplay <= 1 ? EmailFeild : PhoneNumberFeild}
                                </View>
                            </View>
                        </View>
                        <View style={{ height: "5%", backgroundColor: "white" }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.addQuestionClick()
                                }
                                style={{ height: 60, width: 60, borderRadius: 25, position: 'absolute', bottom: 10, right: 20, backgroundColor: '#537cee', alignItems: 'center', }}>
                                <View>
                                    <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* </View> */}
                </ImageBackground>
            </View>
                );
    };
}

                const styles = StyleSheet.create({
                    TabBtn: {
                    padding: 15,
                paddingTop: 5,
                //margin: 20,
                //marginLeft: 50,
                marginBottom: 5,
                fontSize: 20,
                color: "black",
                width: 195,
                textAlign: 'center',
                borderBottomColor: 'grey',
                borderBottomWidth: 1
    },
                SelectedTabBtn: {
                    padding: 15,
                paddingTop: 5,
                marginBottom: 5,
                //margin: 20,
                fontSize: 20,
                color: "blue",
                width: 195,
                textAlign: 'center',
                borderBottomColor: '#4d089e',
                borderBottomWidth: 2
    },
    // TabsBlock: {
                    //     marginLeft: 15,

                    // },
                    QAHome: {
                    height: "100%",
        // backgroundColor: "#2353e2"
        // backgroundGradient: "vertical",
        // backgroundGradientTop: "#333333",
        // backgroundGradientBottom: "#666666"
    },
                app: {
                    alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#c2ffd2',
    },
                content: {
                    padding: 16,
                backgroundColor: 'pink',
                borderRadius: 8,
    },
                arrow: {
                    borderTopColor: 'pink',
    },
                background: {
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
});

                export default QAHomePage;
