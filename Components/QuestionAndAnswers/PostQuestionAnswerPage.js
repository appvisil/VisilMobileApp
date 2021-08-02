
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    View,
    Text,
    Modal,
    ActivityIndicator,
    StatusBar,
    ImageBackground
} from 'react-native';


import { Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
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

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

imagURLArray = [];
let questionObj = '';
let answerObj = '';
let urlImgs = [];
class PostQuestionAnswerPage extends React.Component {
    services = new FireBaseFunctions();
    ImgUrls = [];
    constructor(props) {
        super(props);
        questionObj = props.route.params;
        answerObj = questionObj.AnswerObj;
        console.log('answerObj', answerObj)
        urlImgs = JSON.stringify(answerObj);
        this.state = {
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            isloading: true,
            PostMsg: "",
            PostDesc: '',
            Images: [],
            modalVisible: false,
            FinishingUp: false,
        }
    }
    GoBacktoQDetailsPage = () => {
        this.props.navigation.navigate('QuestionDetailsPage')
        //this.setState({ isDisplay: '2' });
    }

    answerChange = (text) => {
        answerObj.Answer = text;
        this.setState({ PostMsg: answerObj.Answer });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    pickImageFromDevice = () => {
        this.setState({ modalVisible: false })
        ImagePicker.openPicker({ 
            width: 300,
            height: 400,
            cropping: true,
            multiple: true
        }).then(image => {
            console.log(image);
            image.forEach(element => {
                element.ImageName = element.path.replace("file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/", "");
                this.ImgUrls.push(element);
            })
            this.setState({ Images: this.ImgUrls })
            console.log(this.ImgUrls)
        });

    }

    pickImageFromCamera = () => {
        this.setState({ modalVisible: false })
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality: 0.50,
        }).then(image => {
            image.ImageName = image.path.replace("file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/", "");
            this.ImgUrls.push(image);
            this.setState({ Images: this.ImgUrls })
            console.log(this.ImgUrls)
        });
    }

    CancelpickImage = () => {
        this.setState({ modalVisible: false })
    }

    removeImage = (item, indexValue) => {
        this.ImgUrls.splice(indexValue, 1);
        this.setState({ Images: this.ImgUrls })
    }

    answerClick = () => {
        this.setState({ FinishingUp: true });
        if (this.ImgUrls.length > 0) {
            this.uploadImage();
        } else {
            this.postImages();
        }
    }

    uploadImage = async () => {
        if (this.ImgUrls.length > 0) {
            let ImgCount = 0;
            const min = 1;
            const max = 100;
            const rand = min + Math.random() * (max - min);

            this.ImgUrls.map((singimg) => {
                console.log(singimg);
                ImgCount = ImgCount + 1;
                const reference = storage().ref(`images/askQAnswer_Images/${this.state.userProfileId}/${rand}/${singimg.ImageName}`);
                const uploadTask = reference.putFile(singimg.path);
                uploadTask.on("state_changed",
                    (snapshot) => {
                        console.log('Upload is done');
                    },
                    error => {
                        // Error function ... 
                        console.log(error);
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                            imagURLArray.push(url);
                            if (imagURLArray.length == ImgCount) {
                                const imgArray = [];
                                imagURLArray.forEach(element => {
                                    const imgId = this.services.getGuid();
                                    let imgObj = {
                                        id: imgId,
                                        url: element,
                                        timestamp: new Date().toLocaleString(),
                                        PostId: '',
                                        isVideoURL: false,
                                        UserId: this.state.userProfileId,
                                        UserimageURL: this.state.userIcon,
                                        UserName: this.state.userName,
                                        UserIPAddress: this.state.userIP
                                    }
                                    imgArray.push(imgObj);
                                });
                                this.postImages(imgArray);
                            }
                        });
                    }
                );
            });
        }
    }

    postImages = async (imgArry) => {
        let questionDataObjItem = JSON.parse(urlImgs);
        let posturls = [];
        if (imgArry != null && imgArry != undefined) {
            posturls = [...imgArry]
        }

        const ansId = this.services.getGuid();
        let questionImgs;
        if (questionDataObjItem.ImageURL.length > 0) {
            questionImgs = [...questionDataObjItem.ImageURL, ...posturls];
        }
        else {
            questionImgs = posturls;
        }

        let likeList;
        if (answerObj.LikeList.length > 0) {
            likeList = answerObj.LikeList;
        }
        else {
            likeList = [];
        }

        let dislikeList;
        if (answerObj.DisLikeList.length > 0) {
            dislikeList = answerObj.DisLikeList;
        }
        else {
            dislikeList = [];
        }

        let answerId;
        if (answerObj.AnswerId != "") {
            answerId = answerObj.AnswerId;
        }
        else {
            answerId = ansId;
        }

        if (answerObj.UserimageURL == undefined) {
            answerObj.UserimageURL = '';
        }

        var obj = {
            AnswerId: answerId,
            ParentId: questionObj.QuestionId || answerObj.ParentId,
            QuestionId: questionObj.QuestionId || answerObj.QuestionId,
            Answer: this.state.answer || answerObj.Answer,
            UserId: answerObj.UserId,
            UserimageURL: this.state.userIcon,
            UserName: answerObj.UserName,
            UserIPAddress: this.state.userIP,
            CreatedTime: new Date().toLocaleString(),
            ImageURL: questionImgs,
            Count: answerObj.Count,
            LikeList: likeList,
            DisLikeList: dislikeList,
            IsDelete: false
        }
        await this.addAnswer('AskQuestionAnswer', obj);
    }

    addAnswer = async (collectionName, answer) => {
        await firestore().collection(collectionName).doc(answer.AnswerId).set(answer)
        if (answerObj.IsEdit == false) {
            questionObj.Count.answerCount = questionObj.Count.answerCount + 1;
        }
        await firestore().collection("AskQuestion").doc(questionObj.QuestionId).update({
            "Count.answerCount": questionObj.Count.answerCount
        });
        this.setState({ FinishingUp: false });
        this.props.navigation.navigate('QuestionDetailsPage');
        imagURLArray = [];
    }

    render() {
        const { modalVisible, FinishingUp } = this.state;
        return (
            <View style={styles.PostMain}>
                <View style={styles.PostTop}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                            <TouchableOpacity onPress={() => this.GoBacktoQDetailsPage()}
                                style={{ borderWidth: 1, borderRadius: 15, }}>
                                <AntDesign name="arrowleft" size={20} style={{ margin: 10, color: "black" }} />

                            </TouchableOpacity>
                        </View>
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
                                <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 10, color: "black" }}>{this.state.userName}</Text>
                                {/* <Text style={{ fontWeight: "bold", fontSize: 20 }}>5min ago</Text> */}
                            </View>
                        </View>


                    </View>
                    <View style={{ height: 150, width: "90%", margin: "5%", }}>
                        <TextInput
                            style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                            value={answerObj.Answer}
                            placeholder="Write your answer here"
                            onChangeText={this.answerChange}
                            multiline={true}
                            numberOfLines={8}
                        />

                    </View>
                    <View style={{ flexDirection: "row", height: '10%' }}>
                        {
                            this.state.Images.map((item, index) => {
                                return (
                                    <View style={{ margin: 5 }}>
                                        <View>
                                            <Image source={{ uri: item.path }}
                                                style={{
                                                    height: 60,
                                                    width: 60,
                                                    borderRadius: 10,
                                                }} />
                                        </View>
                                        <View style={{ position: "absolute", right: 0, top: 0 }}>
                                            <TouchableOpacity
                                                onPress={
                                                    () => this.removeImage(item, index)
                                                }>
                                                <AntDesign name="closecircle" size={15} style={{ margin: 5, color: "white" }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>

                <View style={styles.PostBottom}>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ margin: 10, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                        <MaterialIcons name="camera-alt" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>

                                </View>
                                <View style={{ margin: 10, }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Add Photo/Video</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.PostFooter}>
                    <View style={{ height: 300, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.answerClick()} style={{ borderRadius: 25, margin: 20, marginTop: 35, backgroundColor: '#1e74f5', padding: 10, paddingRight: 25, paddingLeft: 25, width: "60%", alignItems: "center" }}>
                            <Text style={{ fontSize: 25, color: "white", }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.pickImageFromDevice()}
                                >
                                    <View style={{ flexDirection: "row", }}>
                                        <View >
                                            <TouchableOpacity style={{}}>
                                                <AntDesign name="picture" size={40} style={{ margin: 10, color: "#2196F3" }} />

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ margin: 10, }}>
                                            <Text style={styles.textStyle}>Gallery</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.pickImageFromCamera()}
                                >
                                    <View style={{ flexDirection: "row", }}>

                                        <View >
                                            <TouchableOpacity style={{}}>
                                                <MaterialCommunityIcons name="camera-outline" size={40} style={{ margin: 10, color: "#2196F3" }} />

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ margin: 10, }}>
                                            <Text style={styles.textStyle}>Camera</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.CancelpickImage()}
                                >
                                    <View style={{ flexDirection: "row", }}>

                                        <View >
                                            <TouchableOpacity style={{}}>
                                                <MaterialIcons name="cancel" size={40} style={{ margin: 10, color: "#2196F3" }} />

                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ margin: 10, }}>
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.centeredView1}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={FinishingUp}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!FinishingUp);
                        }}
                    >
                        <View style={styles.centeredView1}>
                            <View style={styles.modalView1}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                >
                                    <View style={{ flexDirection: "row", }}>
                                        <View style={{ paddingTop: 20 }}>
                                            <ActivityIndicator />
                                        </View>
                                        <View style={{ margin: 10, }}>
                                            <Text style={styles.textStyle}>Finishing Up</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>

        );
    };
}

const styles = StyleSheet.create({
    PostTop: {
        width: "100%",
        height: "70%",
        paddingTop: 10
    },
    PostMain: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        //alignItems: 'center',
    },
    PostBottom: {
        width: "100%",
        height: "15%",
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        marginLeft: -10,
        //borderBottomColor: "grey",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        //alignItems: 'center',

    },
    PostFooter: {
        //flexDirection: "row",
        width: "100%",
        height: "15%",
        alignItems: "center",
        //backgroundColor: '#1e74f5',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        //textAlign:"center"
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


    centeredView1: {
        flex: 1,
        //position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        //minHeight:"1px"
        // margin:"auto"
    },
    centeredView: {
        flex: 1,
        //position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        //minHeight:"1px"
        // margin:"auto"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalView1: {
        margin: 20,
        paddingTop: "70%",
        backgroundColor: "#000000b3",
        //backgroundColor: "grey",
        //borderRadius: 20,
        //padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "100%",
        width: "100%"
    },
    button: {
        borderRadius: 10,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        elevation: 2,
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
        margin: 10
    },
    buttonClose: {
        backgroundColor: "white",
        margin: 10,
    },
    textStyle: {
        //color: "white",
        fontWeight: "bold",
        color: "#2196F3",
        fontSize: 25,
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

});

export default PostQuestionAnswerPage;
