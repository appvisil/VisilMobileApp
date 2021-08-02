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

class CommunityRecommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Mobile: '',
            Password: '',
            errorMsg: ''
        }
    }

    render() {
        return (
            <View>
                <Text>CommunityRecommendations</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({

});

export default CommunityRecommendations;
