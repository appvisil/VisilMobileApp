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

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import { SliderBox } from "react-native-image-slider-box";


class ShareEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            images: [
                require('../Images/Flower1.jpg'),
                require('../Images/Flower2.jpg'),
                require('../Images/Flower3.jpg'),
            ]
        }
    }
    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };
    BacktoEventHomepage = () => {
        this.props.navigation.navigate('EventsHomePage');
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: "row", height: "10%" }}>
                            <View style={{ marginTop: 25, marginLeft: 5, alignItems: 'center', width: "10%" }}>
                                <TouchableOpacity onPress={() => this.BacktoEventHomepage()} style={{ borderWidth: 1, borderRadius: 15, }}>
                                    <AntDesign name="arrowleft" size={20} style={{ margin: 10, color: "black" }} />

                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "row", width: "50%" }}>
                                <View style={{ margin: 20 }}>
                                    <Image source={require('../Images/user.jpg')}
                                        style={{
                                            height: 60,
                                            width: 60,
                                            borderRadius: 10,
                                        }} />
                                </View>
                                <View style={{ margin: 20, marginLeft: 0 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 10, color: "black" }}>Hanuman</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', width: "40%", padding: 10 }}>
                                <TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#1e74f5', margin: 20, padding: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ padding: 10, height: "75%" }}>
                            <ScrollView>
                                <View>
                                    <TextInput
                                        style={{ fontSize: 20, borderBottomWidth: 1, borderBottomColor: "black", }}
                                        placeholder="Say Something about this...."
                                        multiline={true}
                                        numberOfLines={1}
                                    />
                                </View>
                                <View>
                                    <View style={styles.EventDisplayView}>
                                        <View style={{ width: "100%" }} onLayout={this.onLayout}>
                                            <SliderBox
                                                images={this.state.images}
                                                sliderBoxHeight={200}
                                                nCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                                                autoplay
                                                circleLoop
                                                dotColor="#FFEE58"
                                                inactiveDotColor="#90A4AE"
                                                parentWidth={this.state.width}
                                            />

                                        </View>
                                        <View style={{ flexDirection: "row", width: "100%", paddingTop: 20 }}>
                                            <View style={{ width: "15%", paddingTop: 5 }}>
                                                <Text style={{ fontSize: 22, borderColor: "black", borderWidth: 1, borderRadius: 10, fontWeight: "bold", padding: 10 }}>20</Text>
                                            </View>
                                            <View style={{ width: "70%", padding: 10 }}>
                                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Monday, 12:00 AM</Text>
                                                <Text style={{ fontSize: 15 }}>May,2021</Text>
                                            </View>
                                            <View style={{ width: "15%", padding: 15 }}>
                                                <TouchableOpacity>
                                                    <Text><Entypo name="dots-three-vertical" size={30} style={{ color: "black", textAlign: "center" }} /></Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Fashion Meetup</Text>
                                            <Text style={{ fontSize: 17, color: "#a3a4a7" }}>Lorem ipsum sit dolor amet is a dummy text used by typographers.</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", width: "100%" }}>
                                            <View >
                                                <TouchableOpacity style={{ flexDirection: "row", borderColor: "#53d769ff", borderWidth: 1, padding: 10, backgroundColor: "#53d769ff", borderRadius: 8 }}>
                                                    <Text><AntDesign name="check" size={30} style={{ color: "white", textAlign: "center", fontWeight: "bold", }} /></Text>
                                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", paddingLeft: 5 }}>interested </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ paddingTop: 10, fontSize: 20, color: "#a3a4a7" }}>128 more are participating</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ height: "15%", backgroundColor: "#2b77d2", borderTopLeftRadius: 50, borderTopRightRadius: 50, flexDirection: "row", textAlign: "center" }}>
                            <View style={{ width: "50%", textAlign: "center" }}>
                                <Text style={{ textAlign: "center", marginTop: 40, fontSize: 20, color: "white" }}>Share With</Text>
                            </View>
                            <View style={{ width: "40%", textAlign: "center" }}>
                                <TouchableOpacity  style={{ textAlign: "center", marginTop: 30, borderColor:"white",borderWidth:1,borderRadius:20,backgroundColor:"white"}}>
                                    <Text style={{textAlign:"center",paddingTop:5,paddingBottom:5}}>
                                        <Text> <MaterialIcons name="tag-faces" size={20} style={{ color: "#2b77d2" }} /> </Text>
                                        <Text style={{fontSize: 20, color: "#2b77d2" }}>Friends</Text>
                                        <Text>
                                            <Entypo name="chevron-small-down" size={25} style={{color: "#2b77d2" }} />

                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    EventDisplayView: {
        margin: 10,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});

export default ShareEvent;
