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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';



import AboutOverviewPage from '../Profile/AboutOverview';
import AboutEducationPage from '../Profile/AboutEducation';
import AboutPersonalInfoPage from '../Profile/AboutPersonalInfo';
import AboutJobPage from '../Profile/AboutJob';

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      IsActiveAboutBtnEnable: 'AboutOverView',
    }

    // Creating Global Variable.
    global.AbouPageVarable = <View><AboutOverviewPage /></View>;
  }
  ChangePage = (text) => {
    this.setState({ IsActiveAboutBtnEnable: text })
    if (this.state.IsActiveAboutBtnEnable == 'AboutOverview') {
      global.AbouPageVarable = null
      global.AbouPageVarable = <View><AboutOverviewPage /></View>;
    }
    if (this.state.IsActiveAboutBtnEnable == 'AboutEducation') {
      global.AbouPageVarable = null
      global.AbouPageVarable = <View><AboutEducationPage /></View>;
    }
    if (this.state.IsActiveAboutBtnEnable == 'AboutPersonalInfo') {
      global.AbouPageVarable = null
      global.AbouPageVarable = <View><AboutPersonalInfoPage /></View>;
    }
    if (this.state.IsActiveAboutBtnEnable == 'AboutJob') {
      global.AbouPageVarable = null
      global.AbouPageVarable = <View><AboutJobPage /></View>;
    }
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[(this.state.IsActiveAboutBtnEnable == 'AboutOverView') ? styles.AboutHeaderActive : styles.AboutHeaderNormal]}
              onPress={
                () => this.ChangePage('AboutOverView')
              }>
              <Text style={[(this.state.IsActiveAboutBtnEnable == 'AboutOverView') ? styles.AboutHeaderTextActive : styles.AboutHeaderTextNormal]} >
                <MaterialCommunityIcons name="progress-check" size={28} /></Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[(this.state.IsActiveAboutBtnEnable == 'AboutPersonalInfo') ? styles.AboutHeaderActive : styles.AboutHeaderNormal]}
              onPress={
                () => this.ChangePage('AboutPersonalInfo')
              }>
              <Text style={[(this.state.IsActiveAboutBtnEnable == 'AboutPersonalInfo') ? styles.AboutHeaderTextActive : styles.AboutHeaderTextNormal]}>
                <Fontisto name="nav-icon-grid" size={22} /></Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[(this.state.IsActiveAboutBtnEnable == 'AboutEducation') ? styles.AboutHeaderActive : styles.AboutHeaderNormal]}
              onPress={
                () => this.ChangePage('AboutEducation')
              }>
              <Text style={[(this.state.IsActiveAboutBtnEnable == 'AboutEducation') ? styles.AboutHeaderTextActive : styles.AboutHeaderTextNormal]}>
                <Ionicons name="md-school-sharp" size={26} /></Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[(this.state.IsActiveAboutBtnEnable == 'AboutJob') ? styles.AboutHeaderActive : styles.AboutHeaderNormal]}
              onPress={
                () => this.ChangePage('AboutJob')
              }>
              <Text style={[(this.state.IsActiveAboutBtnEnable == 'AboutJob') ? styles.AboutHeaderTextActive : styles.AboutHeaderTextNormal]}>
                <MaterialCommunityIcons name="briefcase-plus" size={26} /></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {global.AbouPageVarable}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  AboutHeaderActive: {
    backgroundColor: '#5596e6',
    margin: 20,
    borderRadius: 6,
  },
  AboutHeaderTextActive: {
    textAlign: 'center',
    padding: 10,
    color: '#ffffff',
  },
  AboutHeaderNormal: {
    margin: 20,
  },
  AboutHeaderTextNormal: {
    textAlign: 'center',
    padding: 10,
    color: '#a9a5a5',
  },
});

export default About;
