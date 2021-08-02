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
import { Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


class CommunityFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    BacktoUserProfilePage = () => {
        this.props.navigation.navigate('UserFriendsProfileView')
    }

    render() {
        return (
            <View style={{height: "100%" }}>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.email}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white', }}
                        inputContainerStyle={{ backgroundColor: 'white', height: 40 }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 5, width: "90%", margin: 10, marginLeft: 20, borderWidth: 1, height: 55 }}
                    />
                </View>
                <View style={{ marginTop: 20, marginBottom: 100 }}>
                    <ScrollView>
                        <View style={styles.FriendListView}>
                            <View style={{ width: "20%" }}>
                                <Image source={require('../Images/user.jpg')}
                                    style={{
                                        height: 70,
                                        width: 70,
                                        borderRadius: 20,
                                    }} />
                            </View>
                            <View style={{ width: "70%", paddingLeft: 10 }}>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>Ajay</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>2 Mutual friends</Text>
                            </View>
                            <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
                                <TouchableOpacity>
                                    <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
                                        <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.FriendListView}>
                            <View style={{ width: "20%" }}>
                                <Image source={require('../Images/user.jpg')}
                                    style={{
                                        height: 70,
                                        width: 70,
                                        borderRadius: 20,
                                    }} />
                            </View>
                            <View style={{ width: "70%", paddingLeft: 10 }}>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>Prasad</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black`" }}>12 Mutual friends</Text>
                            </View>
                            <View style={{ width: "10%", textAlign: "center", paddingTop: 5 }}>
                                <TouchableOpacity>
                                    <Text style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 5, backgroundColor: "green" }}>
                                        <MaterialCommunityIcons name="check-bold" size={30} style={{ color: "white", }} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    FriendListView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,

    },
    FollowerListView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
    },
    TabBtn: {
        padding: 15,
        paddingTop: 5,
        //margin: 20,
        //marginLeft: 50,
        marginBottom: 5,
        fontSize: 20,
        color: "gray",
        width: 220,
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
        color: "white",
        width: 220,
        textAlign: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
});

export default CommunityFriends;
