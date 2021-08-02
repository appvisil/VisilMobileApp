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

let questionObj='';
class DeleteModel extends React.Component {
    constructor(props) {
        super(props)
        questionObj = this.props.questionItemObj;
        this.state = {
            deleteQuestion: true
        }
    }

    setModalVisible = () =>{
        this.props.Hide();
    }

    deleteConfirm = async(question) => {
        this.setState({ deleteQuestion: false });
        question.IsDelete = true;
        await firestore().collection("AskQuestion").doc(question.QuestionId).set(question);
    }
    
    render() {
        const { modalVisible, deleteQuestion } = this.state;
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteQuestion}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed."); 
                        this.setModalVisible(); 
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Confirm Deletion</Text>
                            <Text style={styles.modalText1}>Are you sure you want to delete this Question?</Text>
                            <View style={{ flexDirection: "row", marginTop: 20, alignSelf: 'flex-end' }}>
                                <Pressable
                                    style={{ marginRight: 20 }}
                                    onPress={() => this.setModalVisible()}
                                >
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => this.deleteConfirm(questionObj)}
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
}

const styles = StyleSheet.create({
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

export default DeleteModel;
