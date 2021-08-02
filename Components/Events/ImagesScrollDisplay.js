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


class ImagesScrollDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [

                require('../Images/Flower1.jpg'),
                require('../Images/Flower2.jpg'),
                require('../Images/Flower3.jpg'),
                require('../Images/Flower4.jpg'),
                require('../Images/Flower5.jpg'),
            ]
        };
    }

    render() {
        return (
            <View>
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={200}
                    nCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    autoplay
                    circleLoop
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                // paginationBoxVerticalPadding={20}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({

});

export default ImagesScrollDisplay;
