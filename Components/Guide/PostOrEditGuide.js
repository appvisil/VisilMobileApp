import React, { useRef, useState } from "react";
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

import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";


import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

imagURLArray = [];

const PostOrEditGuide = ({ props}) => {
  console.log(props);
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [URLArray, setURLArray] = useState([]);

  // const state = {
  //   modalVisible: false,
  // }

  const setModalVisible = (visible) => {
    setmodalVisible(visible)
  }


  const pickImageFromDevice = () => {
    setmodalVisible(false)
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true
    }).then(image => {
      console.log(image);
      // image.forEach(element => {
      //     element.ImageName = element.path.replace("file:///storage/emulated/0/Android/data/com.appvisil/files/Pictures/", "");
      //     this.ImgUrls.push(element);
      // })
      // this.setState({ Images: this.ImgUrls })
      // console.log(this.ImgUrls)
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

  const pickImageFromCamera = () => {
    setmodalVisible(false)
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
      imagURLArray.push(image);
      setURLArray(imagURLArray);
      //this.setState({ Images: this.ImgUrls })
      console.log(imagURLArray)
    });
  }

  const CancelpickImage = () => {
    setmodalVisible(false)
  }

  const removeImage = (item, indexValue) => {
    imagURLArray.splice(indexValue, 1);
    setURLArray(imagURLArray);
    console.log(URLArray);
    //this.setState({ Images: this.ImgUrls })
}

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      // console.log(
      //   "Toolbar click, selected items (insert end callback):",
      //   items
      // );
      //console.log(article);
    });
  }



  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }

  const GoToGuidHomePage=()=>{
    props.history.push("/GuideHomepage");
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
          <TouchableOpacity
            style={{ borderWidth: 1, borderRadius: 15, }}
            onPress={
              () => GoToGuidHomePage()
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
            <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 10, color: "black" }}>hanumman</Text>
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

      <ScrollView>
        {/* <Text style={styles.text}>Editor</Text> */}
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={"Start Writing Here"}
          onChange={(text) => setArticle(text)}
          editorInitializedCallback={editorInitializedCallback}
          onHeightChange={handleHeightChange}
        />
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={"purple"}
          selectedIconTint={"pink"}
          disabledIconTint={"purple"}
          onPressAddImage={onPressAddImage}
          iconSize={40}
          actions={[
            "insertVideo",
            ...defaultActions,
            //actions.setStrikethrough,
            actions.heading1,
          ]}
          // map icons for self made actions
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            //   [actions.setStrikethrough]: strikethrough,
            //   ["insertVideo"]: video,
          }}
          insertVideo={insertVideo}
        />
        {/* <Text style={styles.text}>Result</Text>
      <HTMLView value={article} stylesheet={styles} /> */}
        <Text style={styles.text}>{article}</Text>
        <View style={{ flexDirection: "row", height: 100 }}>
          {
            URLArray.map((item, index) => {
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
                        () => removeImage(item, index)
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
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
        </View>
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => pickImageFromDevice()}
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
                onPress={() => pickImageFromCamera()}
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
                onPress={() => CancelpickImage()}
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
    </View>
  );
};

export default PostOrEditGuide;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    //marginTop: 40,
    backgroundColor: "#F5FCFF",
  },
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tib: {
    textAlign: "center",
    color: "#515156",
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