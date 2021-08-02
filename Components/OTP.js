//import React from 'react';
import React, { useState, useEffect } from 'react';
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

//import React, { useState } from 'react';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Svg, { Path } from "react-native-svg";
import { RadioButton } from 'react-native-paper';




const Otp = (props) => {
    console.log(props);
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const VerifyOTP = () => {
        //alert("Entered OTP is " + otp.join(""),props.location.state.regObj.email)
        if(props.location.state.mobile==''){
            conformCode( otp.join(""),props.location.state.email)
        }else{
            console.log(otp.join(""),"+"+props.location.state.mobile);
            conformCode( otp.join(""),"+"+props.location.state.mobile)
        }
       // conformCode( otp.join(""),props.location.state.regObj.email)
        //conformCode( otp.join(""),props.location.state.regObj.Mobile)
        //this.props.history.push("/Body/Registration");
      };
    
    
      const GoToRegistration = () => {
        props.history.push("/Body/Registration");
        //history.push("/Body/Registration");
        //window.location.reload(false);
      }
    
      const conformCode=(code,user)=>{
        console.log(code,user);
        Auth.confirmSignUp(
          user,
          code,
          "SMS_MFA"
        ) .then(
            data => console.log(data),
            alert("Registration Success"),
            props.history.push("/Profile/BasicInfo"),
            window.location.reload(false)

        )
        .catch(err => console.log(err));
      }

      const resendVerificationCode=()=>{
       this.resendCode(this.state.username);
     }
     const resendCode=(username)=>{
        Auth.resendSignUp(
          username
          ).then(
              console.log("success")
          )
        .catch(console.log("fail"));
      }

    return (
        <>
            <View style={{marginTop: 50}}>
      <View style={{ textAlign: "center" }}>
        <View className="OTPInputs">
        {otp.map((data, index) => {
                        return (
                            // <input
                            //     className="otp-field"
                            //     style={{width: "10%",margin:5,width: "10%",height: "50px",background: "#8048c1f5",borderRadius: "11px",color:"white",textAlign: "center",fontSize: "20px"}}
                            //     type="text"
                            //     name="otp"
                            //     maxLength="1"
                            //     key={index}
                            //     value={data}
                            //     onChange={e => handleChange(e.target, index)}
                            //     onFocus={e => e.target.select()}
                            // />
                            <TextInput
                            underlineColorAndroid="transparent"
                            placeholder=""
                            placeholderTextColor="grey"
                            autoCapitalize="none"
                            value={data}
                            onChangeText={e => handleChange(e.target, index)}
                            // onFocus={e => e.target.select()} 
                            />
                        );
                    })}
        
        </View>
      </View>
    </View>
        </>
    );
};

export default Otp;
