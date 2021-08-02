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
import DatePicker from 'react-native-datepicker';
import CheckBox from '@react-native-community/checkbox';
import FireBaseFunctions from "../APIs/FireBaseFunctions";
import firestore from '@react-native-firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
// import ImagePicker from 'react-native-image-crop-picker';
// import storage from '@react-native-firebase/storage';

class CreateorEditEventPage extends React.Component {
    services = new FireBaseFunctions();
    ImgUrls = [];
    setArryFile = [];
    CountryData = [];
    CountryList = [];
    StateList = [];
    constructor(props) {
        super(props);
        this.state = {
            userProfileId: '918121702580',
            userName: 'Prem Kumar',
            userIcon: 'https://firebasestorage.googleapis.com/v0/b/app-visil.appspot.com/o/images%2Fpost_Images%2F918121702580%2F48.26998878368294%2Fdownload%20(4).jpg?alt=media&token=b48e5d49-91ab-45b1-9fb0-e54148780622',
            userIP: '103.117.238.130',
            dateofevent: "",
            Eventdate: "",
            EventName: "",
            EventDescription: "",
            EventTime: "",
            VirtualAddress: "",
            EventAdd1: "",
            EventAdd2: "",
            EventCountry: "",
            EventState: "",
            EventCity: "",
            EventZipCode: "",
            modalVisible: false,
            isSelected: false,
            isLoading: false

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
            console.log(this.CountryData);
            console.log(this.CountryList);
            this.setState({ isLoading: false })

        });
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
        });
    }

    CancelpickImage = () => {
        this.setState({ modalVisible: false })
    }

    BacktoEventHomePage = () => {
        this.props.navigation.navigate('EventsHomePage');
    }
    handleDOB = (text) => {
        this.setState({ dob: text });
    }
    selectVirtual = () => {
        this.setState({ isSelected: !this.state.isSelected });
    }
    EventNameChange = (text) => {
        this.setState({ EventName: text });
    }
    EventDesctiptionChange = (text) => {
        this.setState({ EventDescription: text });
    }
    EventAdd1Change = (text) => {
        this.setState({ EventAdd1: text });
    }
    EventAdd2Change = (text) => {
        this.setState({ EventAdd2: text });
    }
    EventCountryChange = (text) => {
        this.setState({ EventCountry: text });
    }
    EventCityChange = (text) => {
        this.setState({ EventCity: text });
    }
    EventStateChange = (text) => {
        this.setState({ EventState: text });
    }
    EventZipCodeChange = (text) => {
        this.setState({ EventZipCode: text });
    }
    VirtualAddressChange = (text) => {
        this.setState({ VirtualAddress: text });
    }

    dateChange = (dateValue) => {
        console.log(dateValue);
        this.setState({ Eventdate: dateValue });
    }
    AddEvent = async () => {
        // this.setState({ userIP: await publicIp.v4() })
        const eventId = this.services.getGuid();
        var obj = {
            Id: eventId,
            Event: this.state.EventName,
            Description: this.state.EventDescription,
            Dateofevent: this.state.dateofevent,
            EventDate: this.state.Eventdate,
            AddressLine1: this.state.EventAdd1,
            AddressLine2: this.state.EventAdd2,
            City: this.state.EventCity,
            E_state: this.state.EventState,
            Country: this.state.EventCountry,
            Zipcode: this.state.EventZipCode,
            UserId: "919642280029",
            UserimageURL: this.state.userIcon,
            UserName: "hanuman",
            UserIPAddress: "175.101.108.22",
            CreatedTime: new Date(),
            Datetime: new Date(),
            Multimedia: "",
            Count: "",
            FollowList: "",
            TopFiveFollowList: "",
            IsDelete: false
        }
        console.log('eventObj', obj)
        await firestore().collection('Events').orderBy("CountryId", "asc").doc(obj.Id).set(obj)
        // this.props.onHide();
    }

    dropdownSelect = async (text, index) => {
        this.setState({ isLoading: true });
        console.log(text, index);
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
            console.log(this.StateList);
            this.setState({ isLoading: false });

        });
        //this.getCountryData();
    }

    StateSelect = (text, index) => {
        console.log(text);
    }

    render() {
        //const countries = ["Egypt", "Canada", "Australia", "Ireland"]
        const countries = this.CountryList;
        const States = this.StateList;
        const { open, value, items } = this.state;
        const { modalVisible, FinishingUp } = this.state;
        const content = this.state.isSelected
            ? <View>
                <View style={styles.CreateEventTextInput}>
                    <TextInput
                        style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                        placeholder="Virtual Address"
                        multiline={true}
                        numberOfLines={1}
                        value={this.state.VirtualAddress}
                        onChangeText={this.VirtualAddressChange}
                    />
                </View>
            </View>
            :
            <View>
                <View style={styles.CreateEventTextInput}>
                    <TextInput
                        style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                        placeholder="Address Line1"
                        multiline={true}
                        numberOfLines={1}
                        value={this.state.EventAdd1}
                        onChangeText={this.EventAdd1Change}
                    />
                </View>
                <View style={styles.CreateEventTextInput}>
                    <TextInput
                        style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                        placeholder="Address Line2"
                        multiline={true}
                        numberOfLines={1}
                        value={this.state.EventAdd2}
                        onChangeText={this.EventAdd2Change}
                    />
                </View>
                <View style={styles.CreateEventTextInput}>
                    <SelectDropdown
                        data={countries}
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
                <View style={styles.CreateEventTextInput}>
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
                <View style={styles.CreateEventTextInput}>
                    <TextInput
                        style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                        placeholder="City"
                        multiline={false}
                        numberOfLines={1}
                        value={this.state.EventCity}
                        onChangeText={this.EventCityChange}
                    />
                </View>
                <View style={styles.CreateEventTextInput}>
                    <TextInput
                        style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                        placeholder="ZipCode"
                        multiline={false}
                        numberOfLines={1}
                        value={this.state.EventZipCode}
                        onChangeText={this.EventZipCodeChange}
                    />
                </View>

            </View>
        return (
            <View>

                <View style={{ flexDirection: "row", backgroundColor: "white", borderBottomColor: "#e0e4e7", borderBottomWidth: 3 }}>
                    <View style={{ width: "25%", margin: 20, }}>
                        <TouchableOpacity onPress={
                            () => this.BacktoEventHomePage()}>
                            <Text>
                                <AntDesign name="arrowleft" size={25} style={{ margin: 30, color: "black", }} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "75%", }}>
                        <Text style={{ margin: 20, color: "black", fontSize: 20, }}>Create Event</Text>
                    </View>
                </View>
                <View style={styles.PostMain}>
                    <View style={styles.PostTop}>
                        <ScrollView>

                            <View style={styles.CreateEventTextInput}>
                                <TextInput
                                    style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                                    placeholder="write a event name"
                                    multiline={false}
                                    numberOfLines={1}
                                    value={this.state.EventName}
                                    onChangeText={this.EventNameChange}
                                />
                            </View>
                            <View style={styles.CreateEventTextInput}>
                                <TextInput
                                    style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                                    placeholder="write a event description"
                                    onChangeText={text => this.setState({ PostMsg: text })}
                                    multiline={true}
                                    numberOfLines={3}
                                    value={this.state.EventDescription}
                                    onChangeText={this.EventDesctiptionChange}
                                />
                            </View>
                            <View style={styles.CreateEventTextInput}>
                                <DatePicker
                                    style={{ width: "100%", backgroundColor: "white", paddingTop: 5, paddingBottom: 5, borderColor: "black", borderWidth: 1, borderRadius: 10 }}
                                    date={this.state.Eventdate}
                                    mode="date"
                                    // placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        placeholderText: {
                                            fontSize: 20,
                                            color: "black",
                                            fontWeight: "bold,"
                                        },
                                        dateText: {
                                            fontSize: 20,
                                            color: "black",
                                            // textAlign: "left",
                                            fontWeight: "bold,"
                                        }

                                        // ... You can check the source to find the other keys.
                                    }}
                                    // onDateChange={this.EventDateChnage}
                                    //onDateChange={(Eventdate) => { this.setState({ date: Eventdate }) }}
                                    onDateChange={(Eventdate) => this.dateChange(Eventdate)}

                                />
                            </View>
                            <View style={styles.CreateEventTextInput}>
                                <TextInput
                                    style={{ fontSize: 20, borderWidth: 1, borderColor: "black", textAlign: "center", borderRadius: 10 }}
                                    placeholder="write time"
                                    onChangeText={text => this.setState({ PostMsg: text })}
                                    multiline={true}
                                    numberOfLines={1}
                                />
                            </View>

                            <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5, paddingLeft: 15 }}>
                                <CheckBox
                                    value={this.state.isSelected}
                                    onValueChange={this.selectVirtual}
                                />
                                <Text style={{ fontWeight: "bold", fontSize: 15, paddingTop: 5 }}>Virtual Address</Text>
                            </View>
                            {content}

                        </ScrollView>
                    </View>

                    <View style={styles.PostBottom}>
                        <View style={{ marginTop: 10, paddingBottom: 10 }}>
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
                        <View style={{ alignItems: "center", alignSelf: "center", }}>
                            <TouchableOpacity style={{ backgroundColor: '#1e74f5', borderRadius: 5, alignItems: 'center', }}
                                onPress={() => this.AddEvent()}>
                                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", padding: 10 }}>Add Event </Text>
                            </TouchableOpacity>
                        </View>

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
                {/* <View style={styles.centeredView1}>
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
             */}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    PostMain: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        //alignItems: 'center',
    },
    PostTop: {
        width: "100%",
        height: "65%",
        paddingTop: 10
    },

    PostBottom: {
        width: "100%",
        height: "35%",
        backgroundColor: 'white',
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
    CreateEventTextInput: {
        padding: 10,
        paddingBottom: 0,
    },
    input: {
        // margin: 15,
        // marginTop: 0,
        // height: 40,
        // borderColor: 'grey',
        //width:350,
        //borderWidth: 1
        borderWidth: 1,
        borderRadius: 8
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
    centeredView1: {
        flex: 1,
        //position:"absolute",
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        //minHeight:"1px"
        // margin:"auto"
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
    dropdown1BtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
    },
});

export default CreateorEditEventPage;
