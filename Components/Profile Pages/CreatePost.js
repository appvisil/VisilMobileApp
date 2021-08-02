
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
    Modal,
    ActivityIndicator,
    Linking
} from 'react-native';


import { Image } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// import RNUrlPreview from 'react-native-url-preview';
//import { ProcessingManager } from 'react-native-video-processing';

import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

//const publicIp = require('public-ip');
imagURLArray = [];
class CreatPost extends React.Component {
    services = services = new FireBaseFunctions();
    ImgUrls = [];
    constructor(props) {
        super(props);
        if (props.route.params == undefined) {
            this.state = {
                isloading: true,
                PostMsg: "",
                Images: [],
                modalVisible: false,
                FinishingUp: false,
                userProfileId: props.route.params.UserId,
                //userProfileId: "918465981839",
                userIcon: "",
                userName: props.route.params.UserName,
                //userName: "Ajay",
                userIP: "175.101.108.22",
                PlaceHolder: "what are you thinking?",
                isLink: false,
            }
        }else{
            this.state = {
                isloading: true,
                PostMsg: "",
                Images: [],
                modalVisible: false,
                FinishingUp: false,
                userProfileId:props.route.params.UserId,
                userIcon: "",
                userName:props.route.params.UserName,
                userIP: "175.101.108.22",
                PlaceHolder: "what are you thinking?",
                isLink: false,
            }
        }
        
        


    }

    onContentSizeChange = (e) => {
        console.log(e);
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    GoToHomePage = async () => {
        //console.log(item.ImageURL);
        this.props.navigation.navigate('HomePage')
    }
    

    sendLink = () => {
        this.setState({ PlaceHolder: "enter the URL hear..." });
        this.setState({ isLink: true });

    }

    QuestionChange = (text) => {
        this.setState({ question: text })
        //console.log(this.state.CommentText);
    }

    SharePost = () => {
        this.props.navigation.navigate('SelectAudience')

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
            // image.ImageName = image.path.replace("file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/", "");
            // this.ImgUrls.push(image);
            this.setState({ Images: this.ImgUrls })
            console.log(this.ImgUrls)
        });

    }
    // pickImageFromCamera = () => {
    //     this.setState({ modalVisible: false })
    //     ImagePicker.openCamera({
    //         mediaType: 'video',
    //     }).then(image => {
    //         console.log("video testing-----------------", image);
    //     });
    // }

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
            console.log("image testing-----------------", image);
            image.ImageName = image.path.replace("file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/", "");
            this.ImgUrls.push(image);
            this.setState({ Images: this.ImgUrls })
            console.log(this.ImgUrls)
            // file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/
        });
    }

    CancelpickImage = () => {
        this.setState({ modalVisible: false })
    }

    removeImage = (item, indexValue) => {
        this.ImgUrls.splice(indexValue, 1);
        this.setState({ Images: this.ImgUrls })
    }

    AddPost = () => {
        this.setState({ FinishingUp: true });
        if (this.ImgUrls.length > 0) {
            this.uploadImage();
        } else {
            this.postImages();
        }
    }

    uploadImage = async () => {
        if (this.ImgUrls.length > 0) {
            // if (multiMediaFiles[0].multipleImages != null) {
            let ImgCount = 0;
            const min = 1;
            const max = 100;
            const rand = min + Math.random() * (max - min);

            this.ImgUrls.map((singimg) => {
                console.log(singimg);
                ImgCount = ImgCount + 1;
                //const storage = storage().ref()
                const reference = storage().ref(`images/post_Images/${this.state.userProfileId}/${rand}/${singimg.ImageName}`);
                //const fileRef = storage.child(`images/post_Images/${this.state.userProfileId}/${rand}/${singimg[0].ImageName}`);
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
                        //const storage1 = storage();
                        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                            console.log("getDownloadURL");
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
                                // postMediaURL.imageUrls = imgArray;
                                // console.log("test", multiMediaFiles)
                                // if (multiMediaFiles[0].multipleVideos != null) {
                                //     console.log("postVideoBlock", multiMediaFiles)
                                //     this.postVideoBlock(multiMediaFiles);
                                // }
                                // else {
                                //     this.postImages(postMediaURL);
                                // }
                            }
                        });
                    }
                );
            });
            //}
            // else if (multiMediaFiles[0].multipleVideos != null) {
            //     await this.postVideoBlock(multiMediaFiles);
            // }
        }
    }

    postImages = async (imgArry) => {
        console.log(this.state.PostMsg, imgArry);
        let posturls = [];
        if (imgArry != null && imgArry != undefined) {
            posturls = [...imgArry]
        }
        const docId = this.services.getGuid();
        if (posturls != 'null') {
            posturls.map((itm) => {
                itm.PostId = docId
            });
        }
        var countObj = {
            likeCount: 0,
            commentCount: 0,
            questionCount: 0,
            shareCount: 0
        }
        var obj = {
            PostId: docId,
            Message: this.state.PostMsg,
            UserId: this.state.userProfileId,
            isLink: this.state.isLink,
            UserimageURL: this.state.userIcon,
            UserName: this.state.userName,
            UserIPAddress: this.state.userIP,
            CreatedTime: new Date().toLocaleString(),
            ImageURL: posturls,
            Count: countObj,
            LikeList: [],
            TopFiveLikes: []
        }
        await this.addpostImages('PostBlock', obj);
    }

    addpostImages = async (collectionName, postData) => {
        await firestore().collection(collectionName).doc(postData.PostId).set(postData)
        this.setState({ FinishingUp: false });
        this.props.navigation.navigate('HomePage')
        // const divEle = document.querySelector('.Finishingup');
        // divEle.classList.remove("myNewClass")

        // multiImgs = [];
        imagURLArray = [];
        // videoURLArray = [];
        // previewPostImage = [];
        // multiMediaFiles = [];
        // postMediaURL = {
        //     imageUrls: [],
        //     videoUrls: []
        // };
    }

    

    render() {
        const { modalVisible, FinishingUp } = this.state;

        //console.log(this.state.Images);
        return (
            <View style={styles.PostMain}>
                <View style={styles.PostTop}>
                    {/* <View style={{marginTop:10, alignItems: 'center',width:"15%"}}>
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 15, }}>
                            <AntDesign name="arrowleft" size={30} style={{ margin: 10, color: "black" }} />

                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, borderRadius: 15, }}
                                 onPress={
                                    () => this.GoToHomePage()
                                }>
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
                        <View style={{ width: "30%" }}>
                            <TouchableOpacity
                                onPress={
                                    () => this.AddPost()
                                } style={{ backgroundColor: '#1e74f5', margin: 20, width: 80, marginTop: 30, borderRadius: 5, alignItems: 'center', }}>

                                <Text style={{ margin: 5, color: "white", fontSize: 20, fontWeight: "bold", }}>Post <AntDesign name="check" size={20} style={{ margin: 10, color: "white" }} /> </Text>

                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ width: "100%" }}>
                        <View style={{ height: '60%' }}>
                            <TextInput
                                style={{ fontSize: 20, }}
                                value={this.state.PostMsg}
                                placeholder={this.state.PlaceHolder}
                                onChangeText={text => this.setState({ PostMsg: text })}
                                multiline={true}
                            />

                            {/* <TextInput size={17} placeholder={'messages.message_placeholder'} underlineColorAndroid={null} defaultValue={""} onChangeText={this.onChange} innerRef={input => { this.inputChat = input; }} multiline onContentSizeChange={e => this.onContentSizeChange(e)} /> */}
                        </View>

                        {/* <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, }}>what are you thinking?</Text> */}
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

                                                    {/* <Text style={{ color: "white", }}>closesquareo</Text> */}

                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    );
                                })

                            }
                        </View>



                    </View>
                </View>
                <View style={styles.PostBottom}>
                    <ScrollView>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <View style={{ flexDirection: "row", }}>

                                    <View style={{ margin: 10, marginLeft: 20 }}>
                                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                            <MaterialIcons name="camera-alt" size={20} style={{ margin: 10, color: "white" }} />

                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ margin: 10, }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Add Photo/Video</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: "row", }}>
                                <View style={{ margin: 15, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                        <MaterialIcons name="person-add" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>

                                </View>
                                <View style={{ margin: 10, }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Tag a Friend</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.sendLink()}>
                                <View style={{ flexDirection: "row", }}>

                                    <View style={{ margin: 15, marginLeft: 20 }}>
                                        <TouchableOpacity
                                            style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                            <MaterialCommunityIcons name="link" size={20} style={{ margin: 10, color: "white" }} />

                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ margin: 10, }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Share Link</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", }}>
                                <View style={{ margin: 15, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                        <Entypo name="emoji-happy" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>

                                </View>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Mood/Activity</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", }}>
                                <View style={{ margin: 15, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                        <Entypo name="location-pin" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>

                                </View>
                                <View style={{ margin: 10, }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Post Location</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", }}>
                                <View style={{ margin: 15, marginLeft: 20 }}>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderRadius: 15, backgroundColor: "black" }}>
                                        <AntDesign name="picture" size={20} style={{ margin: 10, color: "white" }} />

                                    </TouchableOpacity>

                                </View>
                                <View style={{ margin: 10, }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: "black" }}>Post GIF</Text>
                                </View>
                            </View>
                            {/* <Text style={{ color: 'blue' }}
                                onPress={() => Linking.openURL('http://google.com')}>
                                Google
                            </Text> */}
                            {/* <View>
                                <RNUrlPreview text={"https://www.youtube.com/watch?v=P1xKV0Dmetg"} />
                            </View> */}

                        </View>
                    </ScrollView>
                </View>



                <View style={styles.PostFooter}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontSize: 25, margin: 30, marginTop: 40, color: "white" }}>Share With</Text>
                    </View>

                    <View style={{ width: "50%" }}>
                        <TouchableOpacity onPress={() => this.SharePost()} style={{ borderRadius: 20, margin: 20, marginTop: 35, backgroundColor: 'white', alignItems: "center" }}>
                            <Text style={{ fontSize: 25, margin: 5, color: "#1e74f5" }}><Entypo name="emoji-happy" size={25} style={{ margin: 10, color: "#1e74f5" }} /> Friends <AntDesign name="down" size={20} style={{ margin: 10, color: "#1e74f5" }} /></Text>

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
                                    {/* <Text style={styles.textStyle}>Gallery</Text> */}
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

                                    {/* <Text style={styles.textStyle}>Camera</Text> */}
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
                                    {/* <Text style={styles.textStyle}>Cancel</Text> */}
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
                                    {/* <Text style={styles.textStyle}>Gallery</Text> */}
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
        height: "45%",
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
        height: "40%",
        backgroundColor: '#f7f7f7',
        //borderBottomColor: "grey",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        //alignItems: 'center',

    },
    PostFooter: {
        flexDirection: "row",
        width: "100%",
        height: "15%",
        backgroundColor: '#1e74f5',
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
    }



});

export default CreatPost;
