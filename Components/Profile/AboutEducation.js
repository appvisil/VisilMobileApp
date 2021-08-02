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
import { Avatar, Accessory } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';



class AboutEducation extends React.Component {
  state = {
    email: '',
    password: '',
    IsEducationAddData: false,
  }
  AddEducationDetaiilsChange = () => {
    this.setState({ IsEducationAddData: true })
  };
  render() {
    const IsEducationAddDataValue = this.state.IsEducationAddData;
    let EducationalDetailsContent;
    if (IsEducationAddDataValue) {
      EducationalDetailsContent =
        <View>
          <View style={{ backgroundColor: '#ffffff', marginLeft: 20, marginRight: 20, padding: 10, borderRadius: 8, borderWidth: 2, borderColor: '#dedede', }}>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 2, marginBottom: 10, }}>
              <Text style={{ fontSize: 18, marginBottom: 10, }}>Add Education</Text>
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>School</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddedudetailsView} />
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Degree</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddedudetailsView} />
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Field Of Study</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddedudetailsView} />
            </View>
            <View style={{ flexDirection: 'row-reverse' }}>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity style={styles.EduInfoBtns} onPress={this.AddEducationDetaiilsChange}>
                  <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Save</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.EduInfoBtns} onPress={this.AddEducationDetaiilsChange} >
                  <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    } else {
      EducationalDetailsContent =
        <View>
          <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
            <TouchableOpacity style={{ borderColor: '#5596e6', borderWidth: 2, borderRadius: 4, padding: 5 }}
              onPress={this.AddEducationDetaiilsChange} >
              <Text>
                <Text> <Ionicons name="add-circle-outline" size={20} style={{ color: '#5596e6' }} /></Text>
                <Text style={{ fontSize: 20, color: '#5596e6', }}>Add Education</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.EduContainer}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <View>
                <MaterialCommunityIcons name="delete-outline" size={26} style={{ margin: 10, color: 'red' }} />
              </View>
              <View>
                <MaterialIcons name="mode-edit" size={26} style={{ margin: 10, color: '#5596e6' }} />
              </View>
            </View>
            <View>
              <Image style={styles.EduImage} source={require('../Images/profilebg.png')} />
            </View>
            <View style={{ marginTop: -20, alignItems: 'flex-end', marginRight: 15 }}>
              <Avatar
                rounded
                size="small"
                activeOpacity={0.7}
                title="B"
                // source={require('../Images/profileimage.jpg')}
                containerStyle={{
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  backgroundColor: '#e95417',
                  borderColor: 'white',
                  borderWidth: 6,
                }}
              />
            </View>
            <View style={{ marginTop: -30 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Master Degree</Text>
              <Text style={{ fontSize: 16, color: '#999' }}>Brilient University</Text>
              <Text style={{ marginTop: 10, fontSize: 16 }}>Lorem ipsum sit dolor amet is a dummy text used by typographers.</Text>
            </View>
          </View>
        </View>
    }
    return (
      <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, marginBottom: 150 }}>
        {EducationalDetailsContent}
        {/* <View style={{ flexDirection: 'row-reverse',margin:10}}>
          <TouchableOpacity style={{borderColor:'#5596e6',borderWidth:2,borderRadius:4,padding:5}}>
            <Text> 
              <Text> <Ionicons name="add-circle-outline" size={20} style={{ color: '#5596e6'}} /></Text>
              <Text style={{fontSize:20,color: '#5596e6',}}>Add Education</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.EduContainer}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <View>
              <MaterialCommunityIcons name="delete-outline" size={26} style={{ margin: 10, color: 'red' }} />
            </View>
            <View>
              <MaterialIcons name="mode-edit" size={26} style={{ margin: 10, color: '#5596e6' }} />
            </View>
          </View>
          <View>
            <Image style={styles.EduImage} source={require('../Images/profilebg.png')} />
          </View>
          <View style={{ marginTop: -20, alignItems: 'flex-end', marginRight: 15 }}>
            <Avatar
              rounded
              size="small"
              activeOpacity={0.7}
              title="B"
              source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: '#e95417',
                borderColor: 'white',
                borderWidth: 6,
              }}
            />
          </View>
          <View style={{ marginTop: -30 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Master Degree</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>Brilient University</Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>Lorem ipsum sit dolor amet is a dummy text used by typographers.</Text>
          </View>
        </View> */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  AddedudetailsView: {
    marginTop: 5,
    borderColor: '#000000',
    width: '100%',
    // width:200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  EduInfoBtns:{
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5596e6',
  },
  EduContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderColor: '#dedede',
    borderWidth: 1
    ,
    borderRadius: 6,
  },
  EduImage: {
    height: 200,
    width: 350,
    margin: 0,
    alignItems: 'center',
  },
});

export default AboutEducation;
