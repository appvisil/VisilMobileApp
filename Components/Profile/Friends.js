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

import { Avatar, Accessory, SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


class Friends extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={{ margin: 10, paddingLeft: 10, paddingRight: 10, }}>
        <View style={{}}>
          {/* <Ionicons name="search" size={22}/>
              <TextInput />    */}
          <SearchBar
            round
            lightTheme
            icon={{ type: 'Ionicons', name: 'search'}}

            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              // borderTopColor: 'transparent',
              // borderBottomColor: 'transparent',
              borderTopColor: '#cecece',
              borderBottomColor: '#cecece',
              borderColor: '#cecece',
              borderWidth: 2,
              borderRadius: 50,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              //   borderColor: '#cecece',
              //   borderWidth: 2,
              height: 25,
              //   borderRadius: 50,
            }}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 100, }}>
          <View style={{ flexDirection: 'row', margin: 10, paddingBottom: 10, borderBottomColor: '#cecece', borderBottomWidth: 2, }}>
            <View style={{ flex: 1, }}>
              <Avatar
                rounded
                size="large"
                activeOpacity={0.7}
                // title="B"
                source={require('../Images/profileimage.jpg')}
                containerStyle={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  // backgroundColor: '#e95417',
                  // borderColor: 'white',
                  // borderWidth: 6,
                }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stella</Text>
              <Text style={{ fontSize: 16 }}>2 Mutual Friends</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Ionicons name="ellipsis-horizontal-sharp" size={22} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, paddingBottom: 10, borderBottomColor: '#cecece', borderBottomWidth: 2, }}>
            <View style={{ flex: 1, }}>
              <Avatar
                rounded
                size="large"
                activeOpacity={0.7}
                // title="B"
                source={require('../Images/profileimage.jpg')}
                containerStyle={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  // backgroundColor: '#e95417',
                  // borderColor: 'white',
                  // borderWidth: 6,
                }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sofia</Text>
              <Text style={{ fontSize: 16 }}>122 Mutual Friends</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Ionicons name="ellipsis-horizontal-sharp" size={22} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, paddingBottom: 10, borderBottomColor: '#cecece', borderBottomWidth: 2, }}>
            <View style={{ flex: 1, }}>
              <Avatar
                rounded
                size="large"
                activeOpacity={0.7}
                // title="B"
                source={require('../Images/profileimage.jpg')}
                containerStyle={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  // backgroundColor: '#e95417',
                  // borderColor: 'white',
                  // borderWidth: 6,
                }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sandy</Text>
              <Text style={{ fontSize: 16 }}>59 Mutual Friends</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Ionicons name="ellipsis-horizontal-sharp" size={22} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, paddingBottom: 10, borderBottomColor: '#cecece', borderBottomWidth: 2, }}>
            <View style={{ flex: 1, }}>
              <Avatar
                rounded
                size="large"
                activeOpacity={0.7}
                // title="B"
                source={require('../Images/profileimage.jpg')}
                containerStyle={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  // backgroundColor: '#e95417',
                  // borderColor: 'white',
                  // borderWidth: 6,
                }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sania</Text>
              <Text style={{ fontSize: 16 }}>12 Mutual Friends</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Ionicons name="ellipsis-horizontal-sharp" size={22} />
            </View>
          </View>
        </View>
      </View >
    );
  };
}

const styles = StyleSheet.create({

});

export default Friends;
