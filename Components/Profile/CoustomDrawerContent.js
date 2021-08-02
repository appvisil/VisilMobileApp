import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import styles from '../styles/drawerNavigationStyles'

class DrawerContent extends Component{ 
    render(){
        return(
            // <LinearGradient colors={['#e60099', '#ffaa80']} start={[0, 0]} end={[1, 0]} style={styles.linearStyles}>
                <View style={{marginTop:'30%'}}>
                    {/* <Image source={require('../Images/')} style={styles.profileImage}/>
                    <Text style={styles.userTxt1}>Cienna Taylor</Text>
                    <Text style={styles.userTxt2}>Animal Lover</Text> */}

                    <View style={{marginTop:'20%'}}>
                        {/* <TouchableOpacity style={styles.screenName} 
                                onPress={() => {this.props.navigation.navigate('PersonalProfile1')}}>
                            <SimpleLineIcons name="user" size={16} color="white"/>
                            <Text style={styles.screenTxt}>User Profile</Text>
                        </TouchableOpacity> */}
                        
                    </View>
                    <Text>hi hi</Text>
                </View>
            //</LinearGradient>
        )
    }
}

export default DrawerContent;