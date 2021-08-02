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
} from 'react-native';
import { Image } from 'react-native';
import { Alert, Modal, Pressable } from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

class DeleteEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteEvent:false,
        }
    }
    setModalVisible = () =>{
        this.props.Hide();
    }
    render() {
        // const { modalVisible, deleteEvent } = this.state;
        return (
            <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.deleteEvent}
              onRequestClose={() => {this.props.Hide()}}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ padding: 10,textAlign:"center"}}>
                    <Text style={{fontWeight:"bold",fontSize:20,textAlign:"center",paddingBottom:10}}>Confirm Deletion</Text>
                    <Text style={{fontWeight:"500",fontSize:17,textAlign:"center"}}>Are you sure you want to delete this Event?</Text>
                  </View>
                  <View style={{flexDirection: "row",padding: 20,alignItems: "flex-end",alignSelf:"flex-end" }}>
                    <TouchableOpacity style={{ color: "#1e74f5", padding:10}}>
                      <Text style={{ color: "#1e74f5", fontSize: 20 }}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>this.state.deleteEvent=false} style={{ color: "#1e74f5", padding:10 }}>
                      <Text style={{ color: "#1e74f5", fontSize: 20 }}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>    
          </View>
        );
    };
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%"
      },
      modalText: {
        fontSize: 25,
        marginBottom: 15,
        // textAlign: "center"
      }
});

export default DeleteEvent;
