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
import { Avatar, Accessory } from 'react-native-elements';



import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class AboutOverview extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              size="large"
              activeOpacity={0.7}
              title="S"
              // source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 75,
                width: 75,
                borderRadius: 50,
                margin: "auto",
                backgroundColor: "#8f23f7",
              }}
            />
          </View>
          <View style={{ flex: 4, padding: 15 }}>
            <Text style={styles.CardTestUp}>Works at Slice</Text>
            <Text style={styles.CardTestDown}>Edit Your Professional Info</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              size="large"
              activeOpacity={0.7}
              title="B"
              // source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 75,
                width: 75,
                borderRadius: 50,
                margin: "auto",
                backgroundColor: "#e95417",
              }}
            />
          </View>
          <View style={{ flex: 4, padding: 15 }}>
            <Text style={styles.CardTestUp}>Studied at Brent University</Text>
            <Text style={styles.CardTestDown}>Edit Your Education Info</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              size="large"
              activeOpacity={0.7}
              title="LA"
              // source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 75,
                width: 75,
                borderRadius: 50,
                margin: "auto",
                backgroundColor: "#000000",
              }}
            />
          </View>
          <View style={{ flex: 4, padding: 15 }}>
            <Text style={styles.CardTestUp}>Lives in Los Angeles, CA</Text>
            <Text style={styles.CardTestDown}>Edit your Location</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Avatar
              rounded
              size="xlarge"
              activeOpacity={0.7}
              source={require('../Images/profileimage.jpg')}
              containerStyle={{
                height: 75,
                width: 75,
                borderRadius: 50,
                margin: "auto",
              }}
            />
          </View>
          <View style={{ flex: 4, padding: 15 }}>
            <Text style={styles.CardTestUp}>Married </Text>
            <Text style={styles.CardTestDown}>Edit Your Situation</Text>
          </View>
        </View>

        <View style={styles.AbotDesction}>
          <View style={{flexDirection:'row',margin:10}}>
            <View style={{flex:1}}>
              <Text style={{ fontSize: 25, fontWeight:'900'}}>About</Text>
            </View>
            <View style={{ flex:1,alignItems:'flex-end', marginRight:10}}>
              <MaterialIcons name="mode-edit" size={26} style={{ margin: 10, color: '#5596e6' }} />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 20, margin: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliter homines, aliter philosophos loqui putas oportere? Duo
              enim genera quae erant, fecit tria. Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Hoc simile tandem est?
          </Text>

          </View>
        </View>



      </View>
    );
  };
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 5,
    flex: 5,
    // height: 80,
    backgroundColor: '#ffffff',
    // width: '90%',
    margin: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e8e8e8',
  },
  CardTestUp: {
    fontSize: 20,

  },
  CardTestDown: {
    marginTop: 5,
    fontSize: 14,
  },
  AbotDesction: {
    // flexDirection:'row',
    padding: 5,
    // height:100,
    // width:'90%',
    backgroundColor: '#ffffff',
    margin: 10,
    marginBottom: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e8e8e8',
  },
});

export default AboutOverview;
