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
import SelectDropdown from 'react-native-select-dropdown';
import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';

class UserAccountInfo extends React.Component {
    services = new FireBaseFunctions();
    CountryData = [];
    CountryList = [];
    StateList = ["Please select country first"];
    profileData = [];
    constructor(props) {
        super(props);
        // this.profileData = JSON.parse(localStorage.getItem("userData"));
        // console.log(this.profileData);
        this.state = {
            modalVisible: false,
            date: "",
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            // Mobile: this.profileData.Mobile,
            // DOB: this.profileData.DOB,
            // Email: this.profileData.Email,
        }
        this.getCountryData();
    }
    getCountryData = async () => {
        //console.log("hai");
        this.setState({ isLoading: true });
        await firestore().collection('CountryList').onSnapshot((snapshot) => {
            let CountryData = [];
            let CountryList = [];
            snapshot.docs.forEach(function (doc) {
                //console.log("one"+doc.data());
                CountryData.push(doc.data());
                CountryList.push(doc.data().CountryName);
            });
            this.CountryData = CountryData;
            this.CountryList = CountryList;
            // console.log(this.CountryData);
             console.log(this.CountryList);
            this.setState({ isLoading: false })

        });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        this.setState({ showPopover: false });
    }
    GoBacktoProfilePage = () => {
        this.props.navigation.navigate('Profile');
    }
    dropdownSelect = async (text, index) => {
        this.setState({ isLoading: true });
        // console.log(text, index);
        var newArray = this.CountryData.filter(function (el) {
            return el.CountryName == text;
        }
        );
        console.log(newArray);
        this.StateList = [];
        let StateList = [];
        await firestore().collection('StateList').where('CountryId', '==', newArray[0].CountryId).get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                StateList.push(doc.data().StateName);
            });

            this.StateList = StateList;
            // console.log(this.StateList);
            this.setState({ isLoading: false });

        });
        //this.getCountryData();
    }

    StateSelect = (text, index) => {
        // console.log(text);
    }

    render() {
        const countries = this.CountryList;
        const States = this.StateList;
        return (
            <View>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ marginTop: 5, marginLeft: 5, alignItems: 'center', width: "10%", paddingBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.GoBacktoProfilePage()} style={{ borderWidth: 1, borderRadius: 15, }}>
                            <AntDesign name="arrowleft" size={20} style={{ margin: 10, color: "black" }} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={{ paddingBottom: 150 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", marginTop: 10, padding: 10 }}>
                                <View>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            borderRadius: 25,
                                            // borderBottomLeftRadius: 25,
                                            // borderTopRightRadius: 25,
                                            // borderTopLeftRadius: 10,
                                            // borderBottomRightRadius: 10,
                                        }} />
                                </View>
                                <View>
                                    <View>
                                        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "bold" }}>Profile Picture</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ margin: 10, backgroundColor: '#2b77d2', borderRadius: 15, alignItems: 'center', width: 130, }}>
                                            <TouchableOpacity>
                                                <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                                                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", }}>
                                                        Update
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 15, alignItems: 'center', borderColor: "#2b77d2", borderWidth: 1, width: 130, }}>
                                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                                <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                                                    <Text style={{ fontSize: 20, color: "black", fontWeight: "bold", }}>
                                                        Delete
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Basic Information</Text>
                                </View>
                                <View style={{ paddingBottom: 10, borderBottomColor: "#c7c7c7", borderBottomWidth: 1 }}>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>NAME</Text>
                                        <TextInput
                                            style={{ fontSize: 20, backgroundColor: "white" }}
                                            placeholder="Please enter name"
                                            multiline={true}
                                            numberOfLines={1}
                                           
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>MOBILE NUMBER</Text>
                                        <TextInput
                                            style={{ fontSize: 20, backgroundColor: "white" }}
                                            placeholder="please enter mobile number"
                                            multiline={false}
                                            numberOfLines={1}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>EMAIL</Text>
                                        <TextInput
                                            style={{ fontSize: 20, backgroundColor: "white" }}
                                            placeholder="Please enter email"
                                            multiline={false}
                                            numberOfLines={1}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>BIRTHDAY</Text>

                                    </View>
                                </View>
                                <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>COUNTRY</Text>
                                        <SelectDropdown
                                            data={countries}
                                            // defaultValueByIndex={1}
                                            // defaultValue={'USA'}
                                            onSelect={(selectedItem, index) => {
                                                this.dropdownSelect(selectedItem, index);
                                            }}
                                            defaultButtonText="Select Country"
                                            buttonStyle={styles.dropdown1BtnStyle}
                                            renderDropdownIcon={() => {
                                                return (
                                                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                                                );
                                            }}
                                            dropdownIconPosition={"right"}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>STATE</Text>
                                        <SelectDropdown
                                            data={States}
                                            onSelect={(selectedItem, index) => {
                                                this.StateSelect(selectedItem, index);
                                            }}
                                            defaultButtonText="Select State"
                                            buttonStyle={styles.dropdown1BtnStyle}
                                            renderDropdownIcon={() => {
                                                return (
                                                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                                                );
                                            }}
                                            dropdownIconPosition={"right"}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>CITY</Text>
                                        <TextInput
                                            style={{ fontSize: 20, backgroundColor: "white" }}
                                            placeholder="Please enter City name"
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 10 }}>
                                        <Text style={{ paddingBottom: 10, color: "black", fontWeight: "bold" }}>PINCODE</Text>
                                        <TextInput
                                            style={{ fontSize: 20, backgroundColor: "white" }}
                                            placeholder="please enter Pincode"
                                            multiline={false}
                                            numberOfLines={1}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ margin: 10, backgroundColor: '#2b77d2', borderRadius: 15, alignItems: 'center', }}>
                                    <TouchableOpacity>
                                        <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
                                            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", }}>
                                                Save Changes
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ padding: 10, textAlign: "center" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", paddingBottom: 10 }}>Confirm Deletion</Text>
                                    <Text style={{ fontWeight: "500", fontSize: 17, textAlign: "center" }}>Are you sure you want to delete profile image?</Text>
                                </View>
                                <View style={{ flexDirection: "row", padding: 20, alignItems: "flex-end", alignSelf: "flex-end" }}>
                                    <TouchableOpacity style={{ color: "#1e74f5", padding: 10 }}>
                                        <Text style={{ color: "#1e74f5", fontSize: 20 }}>DELETE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ color: "#1e74f5", padding: 10 }}>
                                        <Text style={{ color: "#1e74f5", fontSize: 20 }}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
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
    },
    dropdown1BtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: "#444",
    },
});

export default UserAccountInfo;
