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




class AboutJob extends React.Component {
  state = {
    email: '',
    password: '',
    IsJobAddData: false,
  }

  AddJobDetaiilsChange = () => {
    this.setState({ IsJobAddData: true })
  };

  render() {
    const IsJobAddDataValue = this.state.IsJobAddData;
    let JobDetailsContent;
    if (IsJobAddDataValue) {
      JobDetailsContent =
        <View>
          <View style={{ backgroundColor: '#ffffff', marginLeft: 20, marginRight: 20, padding: 10, borderRadius: 8, borderWidth: 2, borderColor: '#dedede', }}>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 2, marginBottom: 10, }}>
              <Text style={{ fontSize: 18, marginBottom: 10, }}>Add Job</Text>
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Tittle</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddJobDetailsView} />
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Company Name</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddJobDetailsView} />
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Location</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddJobDetailsView} />
            </View>
            <View style={{ margin: 10, }}>
              <Text style={{ fontSize: 16, }}>Description</Text>
              <TextInput underlineColorAndroid="transparent" style={styles.AddJobDetailsView} />
            </View>
            <View style={{ flexDirection: 'row-reverse' }}>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity style={styles.JobInfoBtns} onPress={this.AddJobDetaiilsChange}>
                  <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Save</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.JobInfoBtns} onPress={this.AddJobDetaiilsChange} >
                  <Text style={{ color: '#5596e6', fontSize: 16, marginLeft: 10, marginRight: 10 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    } else {
      JobDetailsContent =
        <View>
          <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
            <TouchableOpacity style={{ borderColor: '#5596e6', borderWidth: 2, borderRadius: 4, padding: 5 }}
              onPress={this.AddJobDetaiilsChange} >
              <Text>
                <Text> <Ionicons name="add-circle-outline" size={20} style={{ color: '#5596e6' }} /></Text>
                <Text style={{ fontSize: 20, color: '#5596e6', }}>Add Job</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.JobContainer}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <View>
                <MaterialCommunityIcons name="delete-outline" size={26} style={{ margin: 10, color: 'red' }} />
              </View>
              <View>
                <MaterialIcons name="mode-edit" size={26} style={{ margin: 10, color: '#5596e6' }} />
              </View>
            </View>
            <View>
              <Image style={styles.JobImage} source={require('../Images/profilebg.png')} />
            </View>
            <View style={{ marginTop: -20, alignItems: 'flex-end', marginRight: 15 }}>
              <Avatar
                rounded
                size="small"
                activeOpacity={0.7}
                title="S"
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
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Artistic Director</Text>
              <Text style={{ fontSize: 16, color: '#999' }}>Slice</Text>
              <Text style={{ marginTop: 10, fontSize: 16 }}>Lorem ipsum sit dolor amet is a dummy text used by typographers.</Text>
            </View>
          </View>
        </View>
    }

    return (
      <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, marginBottom: 150 }}>
        {JobDetailsContent}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ backgroundColor: "blue", flex: 1,}}>
              <Text>Hi</Text>
            </View>
            <View style={{ backgroundColor: "red", flex: 1, }}>
            <Text>Hi Hima</Text>
            </View>
            <View style={{ backgroundColor: "yellow", flex: 1,}}>
            <Text>Hi sorry</Text>
            </View>
          </ScrollView>

        </View>
        {/* <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
          <TouchableOpacity style={{ borderColor: '#5596e6', borderWidth: 2, borderRadius: 4, padding: 5 }}>
            <Text>
              <Text> <Ionicons name="add-circle-outline" size={20} style={{ color: '#5596e6' }} /></Text>
              <Text style={{ fontSize: 20, color: '#5596e6', }}>Add Job</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.JobContainer}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <View>
              <MaterialCommunityIcons name="delete-outline" size={26} style={{ margin: 10, color: 'red' }} />
            </View>
            <View>
              <MaterialIcons name="mode-edit" size={26} style={{ margin: 10, color: '#5596e6' }} />
            </View>
          </View>
          <View>
            <Image style={styles.JobImage} source={require('../Images/profilebg.png')} />
          </View>
          <View style={{ marginTop: -20, alignItems: 'flex-end', marginRight: 15 }}>
            <Avatar
              rounded
              size="small"
              activeOpacity={0.7}
              title="S"
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Artistic Director</Text>
            <Text style={{ fontSize: 16, color: '#999' }}>Slice</Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>Lorem ipsum sit dolor amet is a dummy text used by typographers.</Text>
          </View>
        </View> */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  AddJobDetailsView: {
    marginTop: 5,
    borderColor: '#000000',
    width: '100%',
    // width:200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  JobInfoBtns: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5596e6',
  },
  JobContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 6,
  },
  JobImage: {
    height: 200,
    width: 350,
    margin: 0,
    alignItems: 'center',
  },
});

export default AboutJob;
