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
import { Checkbox } from 'react-native-paper';
import { Alert, Modal, Pressable } from "react-native";
import { SearchBar } from 'react-native-elements';


import CheckBox from '@react-native-community/checkbox';




class Communityposts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      modalVisible: false,
      isSelected:true,
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    this.setState({ showPopover: false });
  }
  render() {
    return (
      <View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={{ margin: 10, width: "50%" }}>
            <TouchableOpacity style={{ backgroundColor: '#5596e6', borderRadius: 8, width: 110, }} onPress={() => this.setModalVisible(true)}>
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
            <TouchableOpacity style={{ backgroundColor: '#5596e6', borderRadius: 8, width: 170, }}>
              <View style={{ color: "#1e1f20", fontSize: 20, flexDirection: "row", margin: 10, }}>
                <Text>
                  <MaterialIcons name="add" size={30} style={{ color: "white", }} />
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 22, color: "white", fontWeight: "bold", }}>
                  Create Post
              </Text>
              </View>
            </TouchableOpacity>
          </View>
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
                <View style={{ flexDirection: "row",width:"100%" }}>
                  <View style={{width:"20%"}}>
                    <Text style={{fontWeight:"bold",fontSize:20}}>Explore</Text>
                  </View>
                  <View style={{width:"20%",flexDirection:"row"}}>
                    <CheckBox
                      value={this.state.isSelected}
                      onValueChange={this.setSelection}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>All</Text>
                  </View>
                  <View style={{width:"50%"}}>
                  {/* <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.email}
                        inputStyle={{ backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white', }}
                        inputContainerStyle={{ backgroundColor: 'white', height: 10 }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 5, width: "90%",borderWidth: 1, height: 20 }}
                    /> */}
                  </View>
                  <View style={{width:"10%",textAlign:"rignt"}}>
                    <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                      <Text>
                        <MaterialIcons name="cancel" size={25} style={{}} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={styles.CommunityFilterListView}>
                    <View>
                      <Image source={require('../Images/CommunityFilter/TaxIcon.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View><Text style={styles.CommunityFilterText}>Tax</Text></View>
                  </View>
                  <View style={styles.CommunityFilterListView}>
                    <View >
                      <Image source={require('../Images/CommunityFilter/HomeInsurance.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View>
                      <Text style={styles.CommunityFilterText}>Home Insurance</Text>
                    </View>
                  </View>
                  <View style={styles.CommunityFilterListView}>
                    <View>
                      <Image source={require('../Images/CommunityFilter/Insurance.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View>
                      <Text style={styles.CommunityFilterText}>Auto Insurance</Text>
                    </View>
                  </View>
                  <View style={styles.CommunityFilterListView}>
                    <View>
                      <Image source={require('../Images/CommunityFilter/LifeInsurance.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View><Text style={styles.CommunityFilterText}>Life Insurance</Text></View>
                  </View>
                  <View style={styles.CommunityFilterListView}>
                    <View>
                      <Image source={require('../Images/CommunityFilter/immigration.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View><Text style={styles.CommunityFilterText}>immigration</Text></View>
                  </View>
                  <View style={styles.CommunityFilterListView}>
                    <View>
                      <Image source={require('../Images/CommunityFilter/RealEstate.png')} style={styles.CommunityFilterImg} />
                    </View>
                    <View><Text style={styles.CommunityFilterText}>Real Estate</Text></View>
                  </View>
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
  CommunityFilterListViewSelected: {
    width: "30%",
    backgroundColor: "#AED2FF",
    borderColor: "#9EC8FB",
    borderWidth: 1,
    margin: 6,
    borderRadius: 8,
    shadowColor: "#9EC8FB",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  CommunityFilterListView: {
    width: "30%",
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    margin: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  CommunityFilterImg: {
    height: 75,
    width: 75,
    alignSelf: "center",
  },
  CommunityFilterText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
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
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontSize:15,
    fontWeight:"bold",
  },

});

export default Communityposts;
