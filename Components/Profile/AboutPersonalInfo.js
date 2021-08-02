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
  AsyncStorage,
} from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



class AboutPersonalInfo extends React.Component {
  profileData = {};
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      IsEditPersonalData: false,
      personalInfoLoading:true,
    }
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ personalInfoLoading: true });
    await AsyncStorage.getItem('userData', (err, result) => {
      console.log(result);
      let dataObj = JSON.parse(result);
      console.log(dataObj.UserName);
      this.profileData = dataObj;
      this.setState({ personalInfoLoading: false });
    });
  }

  EditPersonalDataChange = () => {
    this.setState({ IsEditPersonalData: true })
  };
  render() {
    const IsEditPersonalDataValue = this.state.IsEditPersonalData;
    let ProfilePersonalDetailsContent;
    if (IsEditPersonalDataValue) {
      ProfilePersonalDetailsContent =
        <View>
          <View style={styles.PersonalInfoContEditView}>
            <View style={styles.BorderWithLabelEditView}>
              <Text style={{ color: '#5596e6', fontSize: 18 }}>Personal Information</Text>
            </View>
            <View style={styles.LableContainerEditView}>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 16, color: '#5596e6' }}>Full Name :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
              <View style={{marginTop: 10 }}>
                <Text style={{fontSize: 16, color: '#5596e6' }}>DOB :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
              <View style={{marginTop: 10 }}>
                <Text style={{fontSize: 16, color: '#5596e6' }}>Gender :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
            </View>
          </View>
          <View style={styles.PersonalInfoContEditView}>
            <View style={styles.BorderWithLabelEditView}>
              <Text style={{ color: '#5596e6', fontSize: 18 }}>Contact Information</Text>
            </View>
            <View style={styles.LableContainerEditView}>
              <View style={{marginTop: 20 }}>
                <Text style={{fontSize: 16, color: '#5596e6' }}>Mobile Number :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
              <View style={{marginTop: 10 }}>
                <Text style={{fontSize: 16, color: '#5596e6' }}>E-Mail :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
              <View style={{marginTop: 10 }}>
                <Text style={{fontSize: 16, color: '#5596e6' }}>Address :</Text>
                <TextInput underlineColorAndroid="transparent" style={styles.PersonalInputFieldsEditView}/>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row-reverse' }}>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity style={styles.PersonalInfoBtns}
                onPress={this.EditPersonalDataChange}
              >
                <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Save</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.PersonalInfoBtns}
                onPress={this.EditPersonalDataChange}
              >
                <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

    } else if (!this.state.personalInfoLoading){
      ProfilePersonalDetailsContent =
        <View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={this.EditPersonalDataChange}>
              <MaterialIcons name="mode-edit" size={26} style={{ margin: 10 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.PersonalInfoCont}>
            <View style={styles.BorderWithLabel}>
              <Text style={{ color: '#5596e6', fontSize: 18 }}>Personal Information</Text>
            </View>
            <View style={styles.LableContainer}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>Full Name :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.UserName}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>DOB :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.DOB}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>Gender :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.Gender}</Text>
              </View>
            </View>
          </View>
          <View style={styles.PersonalInfoCont}>
            <View style={styles.BorderWithLabel}>
              <Text style={{ color: '#5596e6', fontSize: 18 }}>Contact Information</Text>
            </View>
            <View style={styles.LableContainer}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>Mobile Number :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.Mobile}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>E-Mail :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.Email}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#5596e6' }}>Address :</Text>
                <Text style={{ flex: 1, fontSize: 15 }}>{this.profileData.Address}</Text>
              </View>
            </View>
          </View>
        </View>
    }else{
      ProfilePersonalDetailsContent =<Text className="loader">Loading ... </Text>
    }
    return (
      <View>
        <View style={styles.PersonalDetailsFields}>
          {ProfilePersonalDetailsContent}
        </View>
        <View style={styles.PersonalFriends}>
          <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flex: 3 }}>
                <Text>  <FontAwesome name="users" size={25} style={{ color: '#cecece' }} />
                  <Text style={{ fontSize: 22, fontWeight: '900', marginLeft: 10 }}> Friends</Text>
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.PersonalInviBtn}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Invitations</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 8 }}>
                <Entypo name="dots-three-vertical" size={22} />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.Friendscard}>
              <View style={{ flex: 1 }}>
                <Avatar
                  rounded
                  size="large"
                  activeOpacity={0.7}
                  source={require('../Images/profileimage.jpg')}
                  containerStyle={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    margin: "auto",
                    padding: 5
                  }}
                />
              </View>
              <View style={{ flex: 4, padding: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Nelly</Text>
                <Text style={{ fontSize: 14 }}>182 Friends</Text>
              </View>
            </View>
            <View style={styles.Friendscard}>
              <View style={{ flex: 1 }}>
                <Avatar
                  rounded
                  size="large"
                  activeOpacity={0.7}
                  source={require('../Images/profileimage.jpg')}
                  containerStyle={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    margin: "auto",
                    padding: 5
                  }}
                />
              </View>
              <View style={{ flex: 4, padding: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Stella</Text>
                <Text style={{ fontSize: 14 }}>102 Friends</Text>
              </View>
            </View>
            <View style={styles.Friendscard}>
              <View style={{ flex: 1 }}>
                <Avatar
                  rounded
                  size="large"
                  activeOpacity={0.7}
                  source={require('../Images/profileimage.jpg')}
                  containerStyle={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    margin: "auto",
                    padding: 5
                  }}
                />
              </View>
              <View style={{ flex: 4, padding: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Elise</Text>
                <Text style={{ fontSize: 14 }}>80 Friends</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  PersonalDetailsFields: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#dedede',
    marginBottom: 10,
    // height: 300,
  },
  PersonalInfoCont: {
    position: 'relative',
    margin: 10
  },
  PersonalInfoContEditView:{
    position: 'relative',
    margin: 10
  },
  BorderWithLabelEditView:{
    position: 'absolute',
    backgroundColor: '#ffffff',
    // top: -8,
    //left: 25,
    marginTop: -14,
    marginLeft: 20,
  //  padding: 5,
    zIndex: 80,
    // marginTop:-8,
    // width:'100%',
  },
  LableContainerEditView:{
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'flex-start',
    //height: 150,
    borderRadius: 10,
    paddingHorizontal: 20,
    // marginBottom:10,
    paddingBottom:10,
  },
  PersonalInputFieldsEditView: {
   // flex: 4,
    marginTop:5,
    borderColor: '#000000',
    width:'100%',
   // width:200,
    height:40,
    borderWidth: 1,
    borderRadius:4,
    fontSize:16,
  },
  PersonalInfoBtns: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5596e6',
  },
  
  BorderWithLabel: {

    position: 'absolute',
    backgroundColor: '#ffffff',
    // top: -8,
    //left: 25,
    marginTop: -18,
    marginLeft: 20,
  //  padding: 5,
    zIndex: 80,
    // marginTop:-8,
    // width:'100%',

  },
  LableContainer: {
    // flex: 1, 
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'flex-start',
   // height: 150,
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingBottom:10,
    //  width:'100%',

  },

  PersonalFriends: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#dedede',
    marginBottom: 130,
  },
  PersonalInviBtn: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#dbdbdb',
  },
  Friendscard: {
    flexDirection: 'row',
    // padding: 5,
    flex: 5,
    // height: 80,
    backgroundColor: '#ffffff',
    // width: '90%',
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e8e8e8',
  },
  // CardTestUp: {
  //   fontSize: 20,

  // },
  // CardTestDown: {
  //   marginTop: 5,
  //   fontSize: 14,
  // },
});

export default AboutPersonalInfo;
