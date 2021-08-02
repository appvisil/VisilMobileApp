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

class CommunityQuestions extends React.Component {
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
         <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={{ margin: 10, width: "50%" }}>
            <TouchableOpacity style={{ backgroundColor: '#5596e6', borderRadius: 8, width: 110, }}>
              <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 10 }}>
                <Text>
                  <AntDesign name="filter" size={30} style={{ color: "white", }} />
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 22, color: "white", fontWeight: "bold", }}>
                  Filter
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10, width: "50%" }}>
            <TouchableOpacity style={{ backgroundColor: '#5596e6', borderRadius: 8, width: 180, }}>
              <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 10, }}>
                {/* <Text>
                  <MaterialIcons name="add" size={30} style={{ color: "white", }} />
                </Text> */}
                <Text style={{ marginLeft: 5, fontSize: 22, color: "white", fontWeight: "bold", }}>
                  Ask a Question
              </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({

});

export default CommunityQuestions;
