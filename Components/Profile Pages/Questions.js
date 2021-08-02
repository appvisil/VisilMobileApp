
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

class Questions extends React.Component {
    services = services = new FireBaseFunctions();
    QuestionsList = [];
    UserData = {};
    PostData = {};
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            question: "",
            QuestionReplyText: "",
            userIP: ""
        }

        this.PostData = props.route.params.postData;
        this.UserData = props.route.params.UserData;
        this.getQuestions(props.route.params.postData);
        //this.CommentsList = this.services.getAllData("Comments");
        //console.log(this.CommentsList);
    }

    async getQuestions(post) {
        console.log(post);

        await firestore().collection("Questions").where("PostId", "==", post.PostId).where("Type", "==", "QUESTION").orderBy('Timestamp', 'desc').limit(5)
            //.get().then((querySnapshot) => {
            .onSnapshot((snapshot) => {
                let items = [];
                snapshot.docs.forEach(doc => {
                    items.push(doc.data());
                });
                //this.setState({ postCommentsByPostId: items })
                console.log(items);
                this.QuestionsList = items;
                this.setState({ isloading: false })
                console.log(this.QuestionsList, this.state.isloading);
                //this.setState({ IsCommentOpen: post.PostId })
            });
        //this.QuestionsList = await this.services.getAllData("Questions");
        //console.log(this.CommentsList);
    }

    QuestionChange = (text) => {
        this.setState({ question: text })
        //console.log(this.state.CommentText);
    }
    QuestionReplyChange = (text) => {
        this.setState({ QuestionReplyText: text })
        //console.log(this.state.CommentText);
    }

    GoToPosts = () => {
        this.props.navigation.navigate('HomePage')
    }

    // SendComment = () => {
    //     console.log(this.state.CommentText);
    // }

    // SendComment = async () => {

    //     const commId = this.services.getGuid();

    //     var obj = {
    //         CommentId: commId,
    //         Type: 'COMMENT',
    //         ParentId: "bcdd2aa9-c531-bd0b-5636-e07ffbfca0c7",
    //         PostId: "bcdd2aa9-c531-bd0b-5636-e07ffbfca0c7",
    //         UserId: "919642280029",
    //         UserimageURL: '',
    //         UserName: "hanuman",
    //         Comment: this.state.CommentText,
    //         Timestamp: new Date().toLocaleString(),
    //         UserIPAddress: "175.101.108.22"
    //     }
    //     await this.addComment('Comments', obj);
    //     this.setState({ CommentText: "" });
    // }



    // addComment = async (collectionName, postData) => {
    //     await firestore().collection(collectionName).doc(postData.CommentId).set(postData);
    //     this.setState({ loading: true });
    //     const result = await this.getAllCommentsByPostId(postData);
    //     this.QuestionsList = result;
    //     this.setState({ loading: false });
    // }

    questionClick = async (postData) => {
        //this.setState({ userIP: await publicIp.v4() })
        const questId = this.services.getGuid();
        var counts = {
            likeCount: 0,
            replyCount: 0
        }

        var obj = {
            QuestionId: questId,
            Type: 'QUESTION',
            ParentId: this.PostData.PostId,
            PostId: this.PostData.PostId,
            UserId: this.UserData.UserId,
            UserimageURL: '',
            UserName: this.UserData.UserName,
            Question: this.state.question,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22",
            Count: counts,
            LikeList: []
        }
        await this.addQuestion('Questions', obj);
        //this.setState({ question: "" });
    }

    addQuestion = async (collectionName, postData) => {
        await firestore().collection(collectionName).doc(postData.QuestionId).set(postData);
        this.PostData.Count.questionCount = this.PostData.Count.questionCount + 1;
        //postData.TopFiveLikes.push(this.userObj);
        await firestore().collection('PostBlock').doc(this.PostData.PostId).set(this.PostData);
        this.setState({ loading: true });
        this.setState({ question: "" });
        await this.getAllQuestionsByPostId(postData);
    }


    // getAllCommentsByPostId = async (postData) => {
    //     this.setState({ loading: true });
    //     let items = [];
    //     return await firestore().collection("Comments").where("PostId", "==", postData.PostId).where("Type", "==", "COMMENT").get().then((querySnapshot) => {
    //         console.log('querySnapshot.docs', querySnapshot.docs);
    //         querySnapshot.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         let count = 0;
    //         items.map((comment) => {
    //             (async () => {
    //                 count = count++
    //                 comment.Likes = await this.getAllCommentLikesByCommentId(comment);
    //                 if (count == items.length) {
    //                     this.setState({ loading: false, items });
    //                 }
    //             })();
    //         })
    //         return items;
    //     });
    // }

    getAllQuestionsByPostId = async (postData) => {
        getAllQuestions = '';
        this.setState({ loading: true });
        let items = [];
        //let db = firestore();
        let ref = firestore().collection("Questions").where("PostId", "==", postData.PostId).where("Type", "==", "QUESTION")
            .orderBy('Timestamp', 'desc')
            .limit(5);
        let data = await ref.get();
        data.docs.forEach(doc => {
            items.push(doc.data());
        }); let count = 0;
        items.map((question) => {
            (async () => {
                console.log("1", count++);
                count = count++
                question.Likes = await this.getAllQuestionLikesByQuestionId(question);
                console.log(question);
                if (count == items.length) {
                    this.setState({ loading: false, items });
                }
            })();
        })
        //latestQuestion = data.docs[data.docs.length - 1]
        this.QuestionsList = items;
    }

    // getAllCommentLikesByCommentId = async (commentData) => {
    //     let items = [];
    //     return await firestore().collection("Likes").where("UserId", "==", commentData.UserId).where("PostId", "==", commentData.PostId).where("ParentId", "==", commentData.CommentId).where("Type", "==", "COMMENTLIKE").get().then((querySnapshot) => {
    //         querySnapshot.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }

    getAllQuestionLikesByQuestionId = async (questionData) => {
        let items = [];
        return await firestore().collection("Likes").where("UserId", "==", questionData.UserId).where("PostId", "==", questionData.PostId).where("ParentId", "==", questionData.QuestionId).where("Type", "==", "QUESTIONLIKE").get().then((querySnapshot) => {
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

    // replyComment = async (comment, index) => {
    //     this.setState({ loading: true })
    //     let items = [];
    //     await firestore().collection("Comments").where("ParentId", "==", comment.CommentId).where("Type", "==", "COMMENTREPLY").get().then((COMMENTREPLY) => {
    //         COMMENTREPLY.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         if (items.length > 0) {
    //             let count = 0;
    //             items.map((comment) => {
    //                 (async () => {
    //                     console.log("1", count++);
    //                     count = count++
    //                     comment.Likes = await this.getAllCommentLikesByCommentId(comment);
    //                     console.log(comment);
    //                     if (count == items.length) {
    //                         this.setState({ loading: false, items });
    //                     }
    //                 })();
    //             })
    //         }
    //         this.QuestionsList[index].Reply = items;
    //         this.QuestionsList[index].isReply = items;
    //         this.setState({ loading: false })
    //     });
    // }

    replyClick = async (question, index) => {
        console.log(question);
        this.setState({ isLoading: "true" })
        let items = [];
        await firestore().collection("Questions").where("ParentId", "==", question.QuestionId).where("Type", "==", "QUESTIONREPLY").get().then((QUESTIONREPLY) => {
            QUESTIONREPLY.docs.forEach(doc => {
                items.push(doc.data());
            });
            if (items.length > 0) {
                let count = 0;
                items.map((question) => {
                    (async () => {
                        console.log("1", count++);
                        count = count++
                        question.Likes = await this.getAllQuestionLikesByQuestId(question);
                        console.log(question);
                        if (count == items.length) {
                            this.setState({ loading: false, items });
                        }
                    })();
                })
            }
            question.Reply = items;
            this.QuestionsList[index].Reply = items;
            this.QuestionsList[index].isReply = items;
            this.setState({ isLoading: "false" })
        });
    }

    getAllQuestionLikesByQuestId = async (questData) => {
        let items = [];
        return await firestore().collection("Likes").where("UserId", "==", questData.UserId).where("PostId", "==", questData.PostId).where("ParentId", "==", questData.QuestionId).where("Type", "==", "QUESTIONLIKE").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    // getAllCommentLikesByCommentId = async (commentData) => {
    //     let items = [];
    //     return await firestore().collection("Likes").where("UserId", "==", commentData.UserId).where("PostId", "==", commentData.PostId).where("ParentId", "==", commentData.CommentId).where("Type", "==", "COMMENTLIKE").get().then((querySnapshot) => {
    //         querySnapshot.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }

    // addReplyClick = async (comment) => {
    //     const commId = this.services.getGuid();
    //     var obj = {
    //         CommentId: commId,
    //         Type: 'COMMENTREPLY',
    //         ParentId: comment.CommentId,
    //         PostId: comment.PostId,
    //         UserId: '919642280029',
    //         UserimageURL: '',
    //         UserName: "hanuman",
    //         Comment: this.state.CommentReplyText,
    //         Timestamp: new Date().toLocaleString(),
    //         UserIPAddress: "175.101.108.22"
    //     }
    //     await this.addReplyComment('Comments', comment, obj);
    // }

    addReplyClick = async (question) => {
        //this.setState({ userIP: await publicIp.v4() })
        const commId = this.services.getGuid();
        var counts = {
            likeCount: 0,
            replyCount: 0
        }
        var obj = {
            QuestionId: commId,
            Type: 'QUESTIONREPLY',
            ParentId: question.QuestionId,
            PostId: question.PostId,
            UserId: this.UserData.UserId,
            UserimageURL: '',
            UserName: this.UserData.UserName,
            Question: this.state.QuestionReplyText,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22",
            Count: counts,
            LikeList: []
        }
        await this.addReplyQuestion('Questions', question, obj);
    }

    addReplyQuestion = async (collectionName, parentCommentData, obj) => {
        await firestore().collection(collectionName).doc(obj.QuestionId).set(obj);
        this.setState({ loading: true });
        const result = await this.getReplyQuestionsByQuestionId(obj);
        parentCommentData.Reply = result;
        this.setState({ QuestionReplyText: '' });
        this.setState({ loading: false });
    }

    // addReplyComment = async (collectionName, parentCommentData, obj) => {
    //     await firestore().collection(collectionName).doc(obj.CommentId).set(obj);
    //     this.setState({ loading: true });
    //     const result = await this.getReplyCommentsByCommentId(obj);
    //     parentCommentData.Reply = result;
    //     this.setState({ CommentReplyText: '' });
    //     this.setState({ loading: false });
    // }

    // getReplyCommentsByCommentId = async (comment) => {
    //     let items = [];
    //     return await firestore().collection("Comments").where("ParentId", "==", comment.ParentId).where("Type", "==", "COMMENTREPLY").get().then((COMMENTREPLY) => {
    //         COMMENTREPLY.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }

    getReplyQuestionsByQuestionId = async (question) => {
        let items = [];
        return await firestore().collection("Questions").where("ParentId", "==", question.ParentId).where("Type", "==", "QUESTIONREPLY").get().then((QUESTIONREPLY) => {
            QUESTIONREPLY.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }

    replyQuestionReply = async (question, index) => {
        //console.log(comment);
        this.setState({ loading: true });
        question.isReply = true;
        this.setState({ loading: false });

    }

    likeClick = async (question) => {
        //this.setState({ userIP: await publicIp.v4() })
        const likeId = this.services.getGuid();
        var obj = {
            LikeId: likeId,
            Type: 'QUESTIONLIKE',
            ParentId: question.QuestionId,
            PostId: question.PostId,
            UserId: this.UserData.UserId,
            UserimageURL: '',
            UserName: this.UserData.UserName,
            Timestamp: new Date().toLocaleString(),
            UserIPAddress: "175.101.108.22"
        }
        await this.addLikeComment('Likes', question, obj);
    }

    addLikeComment = async (collectionName, parentQuestion, obj) => {
        await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
        this.setState({ loading: true });
        parentQuestion.LikeList.push(obj.UserId);
        parentQuestion.Count.likeCount = parentQuestion.Count.likeCount + 1;
        await firestore().collection('Questions').doc(parentQuestion.QuestionId).set(parentQuestion);
        // const result = await this.getLikesByCommentId(obj);
        // parentQuestion.Likes = result;
        this.setState({ loading: false });
    }

    getLikesByCommentId = async (question) => {
        let items = [];
        return await firestore().collection("Likes").where("ParentId", "==", question.ParentId).where("Type", "==", "QUESTIONLIKE").get().then((QUESTIONLIKE) => {
            QUESTIONLIKE.docs.forEach(doc => {
                items.push(doc.data());
            });
            return items;
        });
    }


    dislikeClick = async (comment) => {
        this.setState({ loading: true });
        delete comment.Reply;
        var i = comment.LikeList.indexOf(this.UserData.UserId);
        if (i != -1) {
            comment.LikeList.splice(i, 1);
        }
        await firestore().collection("Likes").where("UserId", "==", comment.UserId)
            .where("PostId", "==", comment.PostId).where("ParentId", "==", comment.QuestionId).where("Type", "==", "QUESTIONLIKE")
            .onSnapshot(async (snapshot) => {
                snapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
        comment.Count.likeCount = comment.Count.likeCount - 1;
        await firestore().collection('Questions').doc(comment.QuestionId).set(comment);
        this.setState({ loading: false });
    }
    // likeClick = async (comment) => {
    //     const likeId = this.services.getGuid();
    //     var obj = {
    //         LikeId: likeId,
    //         Type: 'COMMENTLIKE',
    //         ParentId: comment.CommentId,
    //         PostId: comment.PostId,
    //         UserId: "919642280029",
    //         UserimageURL: '',
    //         UserName: "hanuman",
    //         Timestamp: new Date().toLocaleString(),
    //         UserIPAddress: "175.101.108.22"
    //     }
    //     await this.addLikeComment('Likes', comment, obj);
    // }

    // addLikeComment = async (collectionName, parentComment, obj) => {
    //     await firestore().collection(collectionName).doc(obj.LikeId).set(obj);
    //     this.setState({ loading: true });
    //     const result = await this.getLikesByCommentId(obj);
    //     parentComment.Likes = result;
    //     this.setState({ loading: false });
    // }

    // getLikesByCommentId = async (comment) => {
    //     let items = [];
    //     return await firestore().collection("Likes").where("ParentId", "==", comment.ParentId).where("Type", "==", "COMMENTLIKE").get().then((COMMENTLIKE) => {
    //         COMMENTLIKE.docs.forEach(doc => {
    //             items.push(doc.data());
    //         });
    //         return items;
    //     });
    // }

    render() {
        let list;
        let like;
        //console.log(this.CommentsList);
        if (this.QuestionsList != undefined && this.state.isloading == false) {
            list =
                this.QuestionsList.map((item, index) => (
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
                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item.Question}</Text>

                        </View>
                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                            {/* <TouchableOpacity
                                onPress={
                                    () => this.likeClick(item)
                                } style={{ marginRight: 10 }}> */}
                            <View style={{ flexDirection: "row", }}>
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
                                {/* <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                    {item.Likes != undefined &&
                                        <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Likes.length} </Text>
                                    } */}
                                {/* {item.Likes == undefined &&
                                        <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                    }
                                    {item.Likes != undefined &&
                                        <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>

                                    }
                                    {item.Likes != undefined &&
                                        <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Likes.length} </Text>
                                    } */}
                                {/* {(() => {
                                        console.log(item.Likes);
                                        if (item.Likes != undefined) {
                                            like = <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>

                                            item.Likes.map((c, i) => {
                                                if (c.UserId == this.UserData.UserId) {
                                                    like = <Text style={{ margin: 3 }}><AntDesign name="heart" size={20} style={{ margin: 20, color: "red" }} /> </Text>
                                                }
                                            })
                                            return like;
                                        } else {
                                            like = <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
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
                                {/* {(() => {
                                        console.log(item.Likes);
                                        if (item.Likes != undefined) {
                                            if (item.Likes.length > 0) {
                                                return <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Likes.length} </Text>

                                            }
                                        }
                                    })()} */}

                            </View>
                            {/* </TouchableOpacity> */}

                            <TouchableOpacity
                                onPress={
                                    () => this.replyClick(item, index)
                                } >
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={20} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                    {item.LikeList.length > 0 &&
                                        <Text style={{ margin: 3, color: "#a7a7a7", }}>{item.Count.replyCount} </Text>

                                    }
                                    {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>354 </Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View>{
                            item.Reply != undefined && item.Reply.length > 0 &&
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
                                            <Text style={{ fontSize: 20, color: "#969696", margin: 20, marginTop: 0 }}>{item1.Question}</Text>

                                        </View>
                                        <View style={{ width: "100%", flexDirection: "row", margin: 20, marginTop: 0 }}>
                                            {/* <TouchableOpacity
                                                onPress={
                                                    () => this.likeClick(item1)
                                                } style={{ marginRight: 10 }}> */}
                                                <View style={{ flexDirection: "row", }}>
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
                                                     {item1.LikeList.length > 0 &&
                                                    <Text style={{ margin: 3, color: "#a7a7a7" }}>{item1.Count.likeCount} </Text>
                                                }

                                                    {/* {item1.Likes != undefined &&
                                                        <Text style={{ margin: 3, color: "#a7a7a7" }}>{item1.Likes.length} </Text>
                                                    } */}
                                                    {/* <Text style={{ margin: 3 }}><AntDesign name="hearto" size={20} style={{ margin: 20, color: "#a7a7a7" }} /> </Text>
                                                    {item.Likes != undefined &&
                                                        <Text style={{ margin: 3, color: "#a7a7a7" }}>{item.Likes.length} </Text>
                                                    } */}
                                                    {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>123 </Text> */}
                                                </View>
                                            {/* </TouchableOpacity> */}

                                            <TouchableOpacity
                                                onPress={
                                                    () => this.replyQuestionReply(item1, index)
                                                } >
                                                <View style={{ flexDirection: "row", }}>
                                                    <Text style={{ margin: 3 }}><MaterialCommunityIcons name="message-outline" size={20} style={{ margin: 20, color: "#a7a7a7" }} /></Text>
                                                    {item1.LikeList.length > 0 &&
                                                        <Text style={{ margin: 3, color: "#a7a7a7", }}>{item1.Count.replyCount} </Text>

                                                    }
                                                    {/* <Text style={{ fontSize: 22, color: "black", fontWeight: "bold", }}>354 </Text> */}
                                                </View>
                                            </TouchableOpacity>

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
                                                            value={this.state.QuestionReplyText}
                                                            onChangeText={this.QuestionReplyChange} />
                                                    </View>
                                                    <View style={{ width: "20%", alignItems: "center" }}>
                                                        {this.state.QuestionReplyText != "" &&
                                                            <TouchableOpacity
                                                                onPress={
                                                                    () => this.addNestedReplyClick(item)
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
                                            placeholder="Write a question..."
                                            placeholderTextColor="grey"
                                            autoCapitalize="none"
                                            value={this.state.QuestionReplyText}
                                            onChangeText={this.QuestionReplyChange} />
                                    </View>
                                    <View style={{ width: "20%", alignItems: "center" }}>
                                        {this.state.QuestionReplyText != "" &&
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
            list = <Text style={styles.HeadingText}>No Questions</Text>
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
                        <View style={{ width: "80%", }}>
                            {this.QuestionsList.length > 0 &&
                                <Text style={styles.HeadingText}>Questions({this.QuestionsList.length})</Text>
                            }
                            {this.QuestionsList.length == 0 &&
                                <Text style={styles.HeadingText}>Questions(0)</Text>
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
                    <View style={{ width: "80%", marginLeft: 10, marginTop: "5%" }}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Write a question..."
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            value={this.state.question}
                            onChangeText={this.QuestionChange} />
                    </View>
                    <View style={{ width: "20%", alignItems: "center", marginTop: "6%" }}>
                        {this.state.question != "" &&
                            <TouchableOpacity
                                onPress={
                                    () => this.questionClick()
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
        height: "15%",
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
        fontSize: 20
    },
    Replyinput: {
        color: "white",
        fontSize: 20
    },




});

export default Questions;
