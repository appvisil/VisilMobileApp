/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Svg, { Path } from "react-native-svg";
import { RadioButton } from 'react-native-paper';

import Amplify, { Auth } from 'aws-amplify';

import Popover from 'react-native-popover-view';

import Octicons from 'react-native-vector-icons/Octicons';

class PasswordReg extends React.Component {
    constructor(props, route) {

        super(props);
        // change code below this line
        // alert(props.route.params.email);
        this.state = {
            userId: props.route.params.userId,
            email: props.route.params.email,
            mobile: props.route.params.mobile,
            password: '',
            conformPassword: '',
            username: props.route.params.username,
            gender: props.route.params.gender,
            dob: props.route.params.dob,
            isDisplay: '1',
            showPopover: false,

        }

    }


    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleConformPassword = (text) => {
        this.setState({ conformPassword: text })
    }

    GoToOTP = (email, pass) => {
        if (this.state.password == this.state.conformPassword) {
            if (this.state.mobile == '') {
                console.log("email");
                this.signUp(this.state.username, this.state.email, this.state.password);
            } else {
                console.log("mobile");
                this.signUp1(this.state.username, this.state.mobile, this.state.password);
            }

        } else {
            alert("enter both are same", this.state.password, this.state.conformPassword)
        }

    }

    GoToRegistrationTypes = () => {
        this.props.navigation.navigate('Registration', this.state)
        //navigation.navigate('RegistrationTypes')
    }

    // signup = (name, email, password) => {
    //     console.log(name, email, password);
    //     Auth.signUp({
    //         username: email,
    //         password,
    //         attributes: {
    //             name,
    //             email,
    //         }
    //     })
    //         .then(data =>
    //             console.log(data),
    //             this.props.navigation.navigate('RegistrationOTP', this.state)
    //         )
    //         .catch(err => console.log(err));
    // }

    // signup2 = (name, email, phone_number, password) => {
    //     console.log(name, phone_number, password);
    //     Auth.signUp({
    //         username: phone_number,
    //         password,
    //         attributes: {
    //             name,
    //             email,
    //             phone_number,
    //         }
    //     })
    //         .then(data => alert(data),
    //         this.props.navigation.navigate('RegistrationOTP', this.state))
    //         .catch(err => alert(err));
    // }


    signUp(name, email, password) {
        // this.setState({ errorMsg: '' })
        console.log(email, password);
        try {
            Auth.signUp({
                username: email,
                password,
                attributes: {
                    name,
                    email,
                }
            })
                .then(data =>
                    console.log('success', data),
                    this.props.navigation.navigate('RegistrationOTP', this.state)
                ).catch(err => {
                    console.log(err)
                    // alert(err)
                }
                );
        } catch (error) {
            console.log(' Error signing up...', error);
        }
    }


    signUp1(name, phone_number, password) {
        // this.setState({ errorMsg: '' })
        console.log(phone_number);
        try {
            Auth.signUp({
                username: phone_number,
                password,
                attributes: {
                    name,
                    phone_number,
                }
            })
                .then(data =>
                    console.log('success', data),
                    this.props.navigation.navigate('RegistrationOTP', this.state)
                ).catch(err => {
                    console.log(err)
                    // alert(err)
                }
                );
        } catch (error) {
            console.log(' Error signing up...', error);
        }
    }

    render() {
        return (
            <View>
                <View style={styles.pattern}>
                    <View style={styles.mask1}>
                        <View style={styles.pattern1}>
                            <Svg viewBox="0 0 536 534" style={styles.shapePath}>
                                <Path
                                    strokeWidth={0}
                                    fill="rgba(92,38,156,1)"
                                    fillOpacity={1}
                                    strokeOpacity={1}
                                    d="M270.91 531.44 C270.91 531.44 268.90 527.96 269.02 525.96 C269.15 523.95 270.07 522.08 271.58 520.74 C282.86 510.82 293.93 504.28 304.64 497.95 C317.14 490.58 328.95 483.60 341.09 471.51 C353.24 459.41 360.24 447.66 367.65 435.21 C375.21 422.51 383.03 409.37 396.53 395.93 C410.03 382.48 423.22 374.69 435.98 367.16 C448.48 359.78 460.28 352.81 472.43 340.72 C484.57 328.62 491.57 316.86 498.98 304.42 C505.53 293.43 512.30 282.06 522.78 270.48 C525.59 267.40 530.38 267.17 533.48 269.95 C536.59 272.74 536.86 277.50 534.08 280.62 C524.61 291.09 518.52 301.32 512.07 312.15 C504.51 324.85 496.69 337.99 483.19 351.43 C469.69 364.87 456.50 372.66 443.74 380.20 C431.24 387.58 419.44 394.55 407.29 406.64 C395.15 418.74 388.15 430.49 380.74 442.94 C373.17 455.64 365.35 468.78 351.85 482.22 C338.35 495.67 325.16 503.46 312.41 510.99 C301.84 517.23 291.86 523.12 281.66 532.10 C278.51 534.87 270.91 531.44 270.91 531.44 L270.91 531.44 Z M233.69 531.41 C233.69 531.41 231.04 528.38 230.78 526.38 C230.53 524.39 231.07 522.37 232.31 520.78 C236.06 515.92 240.13 511.32 244.49 506.99 C258.02 493.54 271.24 485.74 284.03 478.20 C296.56 470.82 308.39 463.84 320.56 451.74 C332.74 439.64 339.75 427.87 347.18 415.42 C354.76 402.71 362.60 389.56 376.13 376.11 C389.66 362.66 402.89 354.86 415.67 347.32 C428.20 339.94 440.03 332.96 452.20 320.86 C464.38 308.76 471.39 296.99 478.82 284.54 C486.40 271.83 494.24 258.68 507.77 245.23 C512.46 240.57 517.47 236.23 522.77 232.27 C524.94 230.63 527.82 230.27 530.33 231.33 C532.84 232.38 534.60 234.69 534.93 237.37 C535.27 240.06 534.14 242.73 531.97 244.36 C527.23 247.91 522.75 251.78 518.56 255.95 C506.39 268.06 499.37 279.82 491.94 292.27 C484.36 304.99 476.52 318.13 462.99 331.58 C449.46 345.04 436.24 352.83 423.45 360.37 C410.93 367.75 399.09 374.73 386.92 386.83 C374.74 398.94 367.73 410.70 360.30 423.16 C352.72 435.87 344.88 449.01 331.35 462.46 C317.82 475.92 304.60 483.71 291.81 491.25 C279.28 498.63 267.45 505.61 255.28 517.71 C251.38 521.58 247.75 525.70 244.39 530.04 C241.82 533.36 233.69 531.42 233.69 531.42 Z M204.09 527.82 C204.09 527.82 201.15 525.05 200.69 523.09 C200.24 521.13 200.58 519.06 201.65 517.35 C206.97 508.81 213.85 498.64 224.45 488.07 C237.96 474.59 251.16 466.78 263.92 459.23 C276.43 451.83 288.24 444.84 300.39 432.72 C312.55 420.59 319.55 408.80 326.97 396.33 C334.54 383.59 342.36 370.42 355.87 356.95 C369.38 343.47 382.58 335.66 395.34 328.11 C407.85 320.71 419.66 313.72 431.81 301.60 C443.97 289.47 450.97 277.69 458.38 265.21 C465.95 252.47 473.78 239.30 487.29 225.83 C498.02 215.12 508.43 208.14 517.21 202.72 C519.52 201.23 522.46 201.11 524.90 202.39 C527.33 203.68 528.88 206.17 528.95 208.92 C529.01 211.67 527.59 214.24 525.23 215.64 C517.19 220.60 507.68 226.97 498.06 236.57 C485.90 248.70 478.90 260.48 471.48 272.96 C463.91 285.69 456.09 298.86 442.58 312.34 C429.07 325.82 415.87 333.63 403.11 341.18 C390.60 348.57 378.79 355.56 366.64 367.69 C354.48 379.82 347.48 391.60 340.07 404.08 C332.49 416.81 324.67 429.98 311.16 443.46 C297.65 456.94 284.45 464.74 271.69 472.30 C259.18 479.69 247.37 486.68 235.22 498.81 C225.71 508.30 219.45 517.56 214.58 525.38 C213.51 527.09 211.81 528.31 209.84 528.76 C207.87 529.22 204.09 527.81 204.09 527.81 L204.09 527.82 Z M334.68 520.42 C334.68 520.42 333.23 516.67 333.67 514.71 C334.10 512.74 335.29 511.03 336.99 509.95 C346.63 503.79 354.03 497.94 360.99 490.98 C373.09 478.88 380.07 467.12 387.46 454.66 C395.00 441.95 402.79 428.80 416.25 415.35 C429.71 401.90 442.86 394.10 455.57 386.56 C468.03 379.18 479.80 372.20 491.90 360.10 C498.88 353.12 504.76 345.68 510.94 336.00 C513.19 332.47 517.88 331.43 521.41 333.68 C524.94 335.94 525.98 340.63 523.73 344.16 C516.92 354.81 510.42 363.03 502.63 370.82 C489.17 384.28 476.02 392.07 463.31 399.61 C450.85 406.99 439.08 413.97 426.98 426.07 C414.87 438.18 407.89 449.94 400.51 462.40 C392.97 475.11 385.17 488.26 371.71 501.71 C363.95 509.47 355.76 515.95 345.16 522.73 C341.63 524.99 334.68 520.42 334.68 520.42 L334.68 520.42 Z M175.54 515.20 C175.05 513.25 176.37 509.47 176.37 509.47 L177.70 507.23 C177.70 507.23 193.04 481.42 206.50 467.99 C219.96 454.56 233.11 446.78 245.82 439.26 C258.28 431.89 270.05 424.93 282.15 412.85 C294.26 400.77 301.24 389.03 308.62 376.60 C316.16 363.92 323.96 350.80 337.41 337.37 C350.87 323.95 364.02 316.17 376.73 308.65 C389.19 301.28 400.96 294.32 413.06 282.24 C425.17 270.16 432.15 258.42 439.53 245.99 C447.07 233.30 454.87 220.18 468.32 206.76 C481.78 193.33 507.64 178.03 507.64 178.03 L510.43 176.38 C510.43 176.38 515.65 174.96 518.01 176.28 C520.38 177.60 521.86 180.07 521.89 182.78 C521.93 185.48 518.19 189.38 518.19 189.38 L515.38 191.05 C515.38 191.05 491.16 205.38 479.05 217.46 C466.94 229.54 459.97 241.28 452.58 253.71 C445.04 266.39 437.25 279.51 423.79 292.94 C410.33 306.36 397.19 314.14 384.47 321.67 C372.01 329.03 360.25 336.00 348.14 348.07 C336.03 360.15 329.06 371.89 321.67 384.32 C314.13 397.01 306.33 410.13 292.88 423.55 C279.42 436.98 266.27 444.76 253.56 452.28 C241.10 459.65 229.33 466.61 217.23 478.69 C205.12 490.77 190.75 514.95 190.75 514.95 L189.41 517.20 C189.41 517.20 186.71 520.17 184.76 520.67 C182.81 521.16 179.02 519.84 179.02 519.84 C179.02 519.84 176.04 517.14 175.54 515.20 Z M152.66 508.64 C152.66 508.64 149.74 505.85 149.30 503.88 C148.85 501.91 149.21 499.85 150.29 498.14 C152.67 494.38 154.97 490.51 157.19 486.77 C164.76 474.01 172.59 460.82 186.10 447.32 C199.61 433.82 212.82 426.00 225.59 418.43 C238.10 411.02 249.91 404.02 262.07 391.88 C274.21 379.75 281.26 367.86 288.09 356.37 C290.23 352.76 294.90 351.56 298.52 353.71 C302.14 355.85 303.33 360.52 301.19 364.14 C294.23 375.86 286.33 389.16 272.84 402.64 C259.33 416.14 246.12 423.96 233.35 431.52 C220.85 438.93 209.03 445.93 196.87 458.08 C184.72 470.23 177.71 482.03 170.29 494.53 C168.02 498.36 165.66 502.32 163.17 506.27 C160.92 509.83 152.66 508.64 152.66 508.64 Z M128.21 494.38 C126.56 493.25 125.42 491.50 125.06 489.53 C124.69 487.56 125.13 485.52 126.27 483.87 C130.26 478.07 133.65 472.37 137.23 466.33 C144.76 453.66 152.54 440.55 165.97 427.14 C179.40 413.73 192.53 405.97 205.22 398.45 C217.65 391.09 229.40 384.14 241.48 372.07 C245.40 368.17 249.05 364.01 252.41 359.63 C254.96 356.32 259.71 355.69 263.03 358.24 C266.34 360.78 266.96 365.53 264.42 368.84 C260.65 373.74 256.57 378.39 252.19 382.76 C238.76 396.17 225.64 403.94 212.94 411.46 C200.51 418.82 188.76 425.77 176.68 437.84 C164.59 449.90 157.63 461.63 150.26 474.04 C146.70 480.03 143.02 486.22 138.74 492.44 C136.37 495.88 131.66 496.75 128.21 494.38 Z M407.69 490.60 C407.69 490.60 404.73 487.90 404.24 485.96 C403.75 484.01 404.06 481.96 405.10 480.24 C406.16 478.49 407.20 476.73 408.25 474.98 C415.78 462.33 423.57 449.24 437.01 435.86 C450.46 422.47 463.60 414.71 476.30 407.21 C478.55 405.88 480.80 404.55 483.06 403.19 C485.37 401.72 488.30 401.62 490.71 402.92 C493.13 404.22 494.65 406.71 494.69 409.44 C494.73 412.18 493.29 414.72 490.92 416.09 C488.62 417.48 486.33 418.83 484.03 420.19 C471.58 427.54 459.83 434.48 447.73 446.53 C435.64 458.58 428.67 470.28 421.29 482.68 C420.23 484.46 419.17 486.24 418.09 488.02 C417.05 489.74 415.38 490.98 413.42 491.46 C411.47 491.94 407.69 490.60 407.69 490.60 Z M103.83 480.11 C103.83 480.11 101.13 477.12 100.83 475.13 C100.54 473.14 101.05 471.12 102.26 469.50 C107.74 462.19 112.03 455.00 116.58 447.39 C124.17 434.68 132.01 421.54 145.56 408.10 C159.10 394.65 172.34 386.86 185.14 379.32 C197.68 371.94 209.52 364.97 221.71 352.87 C222.05 352.53 222.39 352.19 222.72 351.85 C225.68 348.90 230.46 348.87 233.46 351.78 C236.45 354.68 236.54 359.44 233.64 362.44 C233.27 362.82 232.89 363.20 232.50 363.59 C218.96 377.03 205.72 384.82 192.93 392.36 C180.39 399.74 168.54 406.72 156.35 418.81 C144.17 430.91 137.14 442.67 129.71 455.12 C125.17 462.73 120.46 470.61 114.51 478.55 C112.00 481.91 103.83 480.11 103.83 480.11 Z M80.67 455.90 C80.40 453.91 80.94 451.90 82.16 450.30 C88.07 442.57 92.59 434.96 97.38 426.91 C104.93 414.22 112.74 401.10 126.21 387.67 C139.68 374.24 152.85 366.45 165.58 358.93 C176.96 352.20 187.71 345.85 198.72 335.62 C200.69 333.72 203.54 333.03 206.17 333.82 C208.79 334.60 210.79 336.74 211.39 339.41 C212.00 342.08 211.11 344.86 209.07 346.70 C196.86 358.04 184.90 365.11 173.32 371.95 C160.85 379.32 149.07 386.29 136.95 398.37 C124.83 410.46 117.84 422.20 110.45 434.64 C105.65 442.71 100.68 451.05 94.24 459.48 C91.69 462.81 83.59 460.91 83.59 460.91 C83.59 460.91 80.94 457.89 80.67 455.90 Z M63.50 440.78 C63.50 440.78 60.81 437.76 60.53 435.77 C60.24 433.77 60.77 431.75 62.00 430.14 C67.76 422.57 72.22 415.12 76.94 407.23 C84.56 394.50 92.43 381.33 106.03 367.85 C119.63 354.37 132.92 346.56 145.77 339.01 C157.70 332.00 168.97 325.38 180.53 314.41 C183.59 311.55 188.40 311.67 191.31 314.68 C194.22 317.69 194.14 322.46 191.14 325.38 C178.30 337.56 165.74 344.94 153.59 352.08 C141.00 359.48 129.11 366.47 116.88 378.59 C104.64 390.72 97.59 402.51 90.12 414.98 C85.40 422.88 80.51 431.04 74.24 439.29 C71.69 442.64 63.50 440.78 63.50 440.78 Z M46.50 418.72 C46.50 418.72 43.76 415.77 43.43 413.77 C43.10 411.78 43.57 409.74 44.74 408.09 C49.46 401.47 53.31 394.96 57.39 388.07 C64.94 375.30 72.75 362.09 86.23 348.57 C99.71 335.06 112.89 327.22 125.62 319.65 C138.11 312.23 149.89 305.22 162.02 293.06 C163.76 291.32 165.46 289.52 167.07 287.69 C168.88 285.66 171.62 284.74 174.28 285.29 C176.94 285.84 179.10 287.77 179.96 290.36 C180.81 292.94 180.23 295.79 178.43 297.82 C176.61 299.87 174.71 301.89 172.77 303.83 C159.29 317.35 146.12 325.18 133.38 332.76 C120.90 340.18 109.11 347.19 96.98 359.35 C84.85 371.51 77.86 383.33 70.46 395.84 C66.40 402.71 62.20 409.81 57.10 416.96 C54.66 420.38 46.50 418.72 46.50 418.72 L46.50 418.72 Z M32.69 391.73 C32.69 391.73 29.81 388.93 29.39 386.97 C28.96 385.01 29.34 382.96 30.44 381.28 C33.30 376.88 35.99 372.36 38.60 367.99 C46.15 355.32 53.97 342.22 67.45 328.82 C80.93 315.41 94.11 307.64 106.85 300.13 C119.33 292.77 131.12 285.81 143.26 273.75 C152.88 264.18 159.40 254.72 166.24 243.45 C168.41 239.88 173.08 238.73 176.67 240.88 C180.26 243.04 181.42 247.69 179.25 251.26 C171.84 263.48 164.71 273.79 154.00 284.44 C140.52 297.85 127.35 305.61 114.60 313.13 C102.12 320.49 90.33 327.44 78.20 339.50 C66.06 351.57 59.07 363.29 51.67 375.70 C48.99 380.20 46.22 384.85 43.20 389.49 C40.92 393.00 32.69 391.73 32.69 391.73 L32.69 391.73 Z M18.83 360.64 C18.83 360.64 15.84 357.94 15.35 355.99 C14.85 354.04 16.18 350.25 16.18 350.25 L17.93 347.32 C17.93 347.32 33.32 321.48 46.82 308.04 C60.33 294.60 73.53 286.80 86.29 279.26 C98.79 271.88 110.60 264.91 122.76 252.81 C134.91 240.71 141.91 228.96 149.32 216.51 C156.89 203.80 164.72 190.66 178.23 177.21 C191.73 163.77 204.93 155.97 217.69 148.44 C230.20 141.06 242.01 134.09 254.16 121.99 C266.31 109.89 273.31 98.13 280.73 85.68 C288.30 72.97 296.12 59.83 309.63 46.39 C323.14 32.94 336.33 25.15 349.10 17.61 C350.45 16.81 351.81 16.01 353.17 15.20 C355.50 13.79 358.42 13.74 360.80 15.06 C363.19 16.37 364.68 18.86 364.72 21.58 C364.76 24.30 363.33 26.83 360.98 28.21 C359.61 29.03 358.24 29.85 356.86 30.65 C344.36 38.04 332.55 45.01 320.40 57.11 C308.24 69.21 301.24 80.96 293.83 93.41 C286.26 106.12 278.43 119.26 264.93 132.71 C251.42 146.15 238.22 153.94 225.46 161.48 C212.95 168.86 201.15 175.83 188.99 187.93 C176.84 200.03 169.84 211.79 162.42 224.24 C154.85 236.95 147.03 250.09 133.52 263.53 C120.02 276.98 106.82 284.77 94.06 292.30 C81.55 299.69 69.74 306.66 57.59 318.76 C45.44 330.85 31.03 355.06 31.03 355.06 L29.27 358.00 L18.83 360.64 L18.83 360.64 Z M8.53 326.26 C8.53 326.26 5.65 323.46 5.21 321.50 C4.78 319.54 5.15 317.48 6.24 315.79 C12.98 305.27 19.44 297.13 27.18 289.41 C40.64 275.97 53.80 268.18 66.52 260.65 C78.98 253.28 90.75 246.31 102.86 234.22 C114.97 222.13 121.95 210.38 129.34 197.93 C136.89 185.24 144.68 172.11 158.14 158.67 C171.60 145.23 184.76 137.45 197.48 129.92 C209.94 122.54 221.71 115.57 233.82 103.48 C245.94 91.39 252.92 79.64 260.31 67.20 C267.85 54.50 275.65 41.37 289.11 27.93 C299.35 17.70 309.28 10.96 316.78 6.23 C319.07 4.77 321.97 4.64 324.38 5.90 C326.79 7.16 328.34 9.61 328.45 12.32 C328.55 15.04 327.19 17.60 324.89 19.04 C318.05 23.35 309.02 29.47 299.84 38.64 C287.73 50.73 280.75 62.48 273.36 74.92 C265.81 87.62 258.02 100.75 244.55 114.19 C231.09 127.63 217.94 135.42 205.22 142.95 C192.76 150.32 180.99 157.29 168.88 169.38 C156.76 181.47 149.78 193.22 142.40 205.66 C134.85 218.36 127.05 231.49 113.59 244.93 C100.13 258.37 86.98 266.15 74.26 273.68 C61.80 281.06 50.02 288.03 37.91 300.12 C30.98 307.04 25.15 314.39 19.02 323.96 C16.76 327.49 8.53 326.26 8.53 326.26 L8.53 326.26 Z M356.72 296.54 C356.72 296.54 355.39 292.74 355.89 290.79 C356.38 288.83 357.63 287.16 359.35 286.13 C371.29 278.99 382.08 272.18 393.14 261.06 C405.20 248.95 412.15 237.17 419.51 224.70 C427.02 211.97 434.79 198.81 448.19 185.34 C461.60 171.87 474.69 164.07 487.36 156.52 C491.23 154.22 495.23 151.84 499.12 149.35 C501.40 147.85 504.30 147.70 506.72 148.95 C509.14 150.21 510.70 152.68 510.81 155.42 C510.91 158.15 509.54 160.73 507.22 162.17 C503.13 164.78 499.03 167.22 495.07 169.58 C482.66 176.98 470.94 183.96 458.88 196.08 C446.82 208.19 439.87 219.97 432.51 232.44 C425.00 245.17 417.23 258.33 403.83 271.80 C391.55 284.14 379.43 291.79 367.07 299.18 C363.49 301.32 356.72 296.54 356.72 296.54 L356.72 296.54 Z M2.52 285.20 C2.52 285.20 0.12 281.97 0.01 279.96 C-0.09 277.95 0.61 275.98 1.96 274.49 C3.57 272.70 5.27 270.91 7.01 269.19 C20.51 255.73 33.71 247.93 46.47 240.39 C58.97 233.00 70.78 226.02 82.93 213.91 C95.08 201.80 102.08 190.03 109.50 177.57 C117.07 164.85 124.89 151.70 138.40 138.24 C151.90 124.78 165.10 116.98 177.86 109.44 C190.36 102.05 202.17 95.07 214.32 82.96 C226.47 70.85 233.48 59.08 240.89 46.62 C248.46 33.90 256.28 20.75 269.79 7.29 C271.59 5.49 273.47 3.72 275.37 2.02 C277.38 0.16 280.25 -0.47 282.87 0.36 C285.48 1.20 287.44 3.38 287.99 6.06 C288.55 8.75 287.61 11.52 285.53 13.32 C283.84 14.83 282.17 16.41 280.56 18.02 C268.40 30.13 261.40 41.90 253.99 54.36 C246.42 67.08 238.59 80.23 225.09 93.69 C211.58 107.15 198.39 114.95 185.63 122.49 C173.12 129.88 161.31 136.86 149.16 148.97 C137.01 161.08 130.01 172.85 122.59 185.31 C115.03 198.03 107.20 211.18 93.70 224.64 C80.19 238.10 67.00 245.90 54.23 253.44 C41.73 260.83 29.92 267.81 17.77 279.92 C16.22 281.46 14.71 283.05 13.27 284.64 C10.45 287.76 2.52 285.20 2.52 285.20 Z M359.28 263.07 C359.28 263.07 357.48 259.48 357.73 257.49 C357.98 255.49 359.01 253.68 360.60 252.45 C364.77 249.23 368.72 245.75 372.45 242.04 C384.60 229.96 391.60 218.21 399.01 205.77 C406.58 193.07 414.41 179.94 427.91 166.51 C441.41 153.08 454.61 145.29 467.37 137.76 C473.70 134.03 479.68 130.50 485.76 126.29 C487.99 124.75 490.88 124.50 493.34 125.65 C495.80 126.80 497.46 129.17 497.69 131.87 C497.92 134.57 496.68 137.18 494.45 138.73 C487.92 143.25 481.42 147.08 475.14 150.79 C462.63 158.17 450.83 165.13 438.68 177.22 C426.53 189.31 419.52 201.06 412.11 213.49 C404.54 226.19 396.72 239.32 383.21 252.75 C379.04 256.90 374.62 260.79 369.96 264.39 C366.64 266.96 359.28 263.07 359.28 263.07 L359.28 263.07 Z M2.47 244.75 C2.47 244.75 0.79 241.10 1.10 239.11 C1.41 237.12 2.49 235.34 4.12 234.16 C11.69 228.63 19.20 224.18 26.46 219.88 C38.92 212.50 50.69 205.53 62.80 193.43 C74.91 181.33 81.89 169.57 89.28 157.12 C96.82 144.42 104.62 131.28 118.07 117.83 C131.53 104.39 144.68 96.60 157.40 89.06 C169.86 81.68 181.63 74.71 193.74 62.61 C205.85 50.52 212.82 38.76 220.21 26.31 C224.69 18.76 229.33 10.95 235.18 3.07 C236.79 0.89 239.45 -0.26 242.14 0.05 C244.83 0.36 247.15 2.08 248.23 4.56 C249.31 7.05 248.98 9.92 247.37 12.10 C241.98 19.35 237.75 26.49 233.26 34.04 C225.72 46.75 217.92 59.89 204.47 73.33 C191.01 86.78 177.86 94.57 165.14 102.10 C152.68 109.48 140.91 116.45 128.80 128.55 C116.69 140.65 109.72 152.41 102.33 164.85 C94.79 177.56 86.99 190.70 73.53 204.15 C60.07 217.59 46.92 225.38 34.20 232.92 C26.93 237.23 20.05 241.30 13.07 246.40 C9.69 248.87 2.47 244.75 2.47 244.75 L2.47 244.75 Z M351.80 233.49 C351.80 233.49 349.59 230.10 349.61 228.08 C349.62 226.05 351.88 222.70 351.88 222.70 L352.49 222.10 C352.49 222.10 371.68 198.08 379.10 185.55 C386.68 172.76 394.52 159.53 408.05 145.99 C421.58 132.46 434.80 124.61 447.58 117.03 C455.40 112.39 462.78 108.01 470.29 102.37 C472.46 100.67 475.38 100.28 477.93 101.35 C480.47 102.42 482.24 104.77 482.55 107.52 C482.87 110.26 481.68 112.96 479.44 114.58 C471.27 120.71 463.18 125.51 455.36 130.15 C442.83 137.58 431.00 144.60 418.83 156.78 C406.66 168.96 399.65 180.80 392.22 193.33 C384.64 206.12 363.28 232.89 363.28 232.89 L362.59 233.57 L351.80 233.49 L351.80 233.49 Z M8.13 208.90 C8.13 208.90 6.79 205.11 7.28 203.16 C7.78 201.21 9.03 199.54 10.76 198.51 C21.13 192.33 32.18 185.39 43.15 174.47 C55.29 162.37 62.29 150.61 69.71 138.16 C77.27 125.46 85.10 112.32 98.60 98.87 C112.10 85.43 125.30 77.64 138.06 70.10 C150.56 62.72 162.36 55.75 174.51 43.65 C185.44 32.77 192.33 21.93 198.45 11.75 C199.84 9.43 202.38 8.02 205.10 8.06 C207.81 8.10 210.30 9.59 211.63 11.95 C212.95 14.32 212.90 17.21 211.51 19.54 C204.90 30.52 197.43 42.27 185.28 54.37 C171.77 67.82 158.58 75.61 145.82 83.14 C133.32 90.52 121.51 97.49 109.36 109.59 C97.21 121.69 90.21 133.45 82.80 145.89 C75.23 158.60 67.41 171.74 53.91 185.18 C41.71 197.33 29.76 204.85 18.57 211.52 C14.96 213.67 8.13 208.90 8.13 208.90 Z M336.93 208.58 C336.93 208.58 334.58 205.33 334.50 203.33 C334.42 201.33 335.14 199.38 336.51 197.91 C346.52 187.11 352.80 176.56 359.45 165.38 C366.98 152.74 374.76 139.65 388.19 126.27 C401.63 112.88 414.75 105.13 427.45 97.63 C435.65 92.78 443.39 88.21 451.27 82.17 C454.59 79.63 459.34 80.25 461.89 83.55 C464.44 86.85 463.82 91.59 460.50 94.13 C451.90 100.72 443.40 105.75 435.17 110.61 C422.73 117.96 410.99 124.90 398.90 136.94 C386.81 148.98 379.85 160.69 372.47 173.08 C365.72 184.44 358.73 196.17 347.63 208.15 C344.79 211.21 336.93 208.58 336.93 208.58 Z M315.71 190.38 C315.71 190.38 315.71 190.38 315.71 190.38 C315.71 190.38 315.71 190.38 315.71 190.38 L315.71 190.38 Z M313.34 185.11 C313.28 183.10 314.03 181.16 315.41 179.71 C326.02 168.53 332.51 157.64 339.38 146.10 C346.92 133.45 354.71 120.36 368.17 106.97 C381.62 93.57 394.77 85.81 407.49 78.31 C415.60 73.52 423.26 69.00 431.05 63.07 C433.20 61.39 436.09 60.99 438.61 62.03 C441.14 63.06 442.91 65.37 443.25 68.07 C443.59 70.76 442.45 73.44 440.26 75.06 C431.76 81.53 423.35 86.50 415.22 91.29 C402.77 98.65 391.00 105.59 378.89 117.64 C366.79 129.69 359.81 141.41 352.43 153.80 C345.43 165.54 338.20 177.68 326.43 190.08 C323.57 193.09 315.80 190.41 315.71 190.38 C315.67 190.32 313.40 187.09 313.34 185.11 Z M288.09 177.83 C288.09 177.83 288.09 177.83 288.09 177.83 C288.09 177.83 288.09 177.83 288.09 177.83 L288.09 177.83 Z M286.15 172.35 C286.25 170.34 287.16 168.45 288.66 167.11 C290.33 165.60 291.99 164.04 293.58 162.45 C305.72 150.32 312.72 138.54 320.13 126.06 C327.70 113.33 335.52 100.16 349.02 86.68 C362.52 73.21 375.71 65.40 388.47 57.85 C395.53 53.67 402.19 49.73 408.96 44.85 C411.16 43.20 414.08 42.86 416.60 43.97 C419.13 45.08 420.85 47.47 421.11 50.20 C421.37 52.94 420.13 55.61 417.86 57.17 C410.54 62.45 403.27 66.75 396.24 70.91 C383.74 78.31 371.93 85.30 359.78 97.42 C347.64 109.55 340.64 121.33 333.23 133.81 C325.66 146.55 317.84 159.72 304.34 173.19 C302.56 174.97 300.71 176.72 298.83 178.40 C295.72 181.20 288.13 177.85 288.09 177.83 C288.07 177.80 286.04 174.35 286.15 172.35 Z M241.90 173.70 C241.90 173.70 240.54 169.94 241.01 167.99 C241.49 166.05 242.72 164.37 244.43 163.33 C253.69 157.71 263.64 151.13 273.58 141.20 C285.65 129.15 292.61 117.44 299.97 105.04 C307.48 92.39 315.25 79.30 328.66 65.91 C342.07 52.52 355.18 44.77 367.85 37.26 C372.58 34.46 377.48 31.56 382.24 28.44 C384.49 26.96 387.37 26.80 389.78 28.01 C392.19 29.22 393.77 31.63 393.93 34.32 C394.08 37.01 392.79 39.58 390.53 41.06 C385.48 44.37 380.44 47.36 375.56 50.25 C363.14 57.60 351.42 64.54 339.35 76.59 C327.29 88.63 320.33 100.35 312.97 112.74 C305.46 125.40 297.69 138.48 284.28 151.87 C273.20 162.93 262.35 170.11 252.28 176.23 C250.57 177.27 248.51 177.59 246.57 177.11 C244.62 176.64 241.90 173.70 241.90 173.70 L241.90 173.70 Z M26.61 161.20 C26.61 161.20 24.26 157.95 24.19 155.94 C24.11 153.94 24.84 151.99 26.21 150.52 C36.42 139.61 42.78 128.96 49.51 117.69 C57.07 105.01 64.90 91.91 78.40 78.50 C91.90 65.09 105.10 57.32 117.86 49.81 C129.38 43.03 140.26 36.62 151.41 26.23 C154.47 23.37 159.29 23.52 162.16 26.57 C165.04 29.61 164.89 34.40 161.82 37.26 C149.46 48.78 137.34 55.91 125.62 62.81 C113.12 70.17 101.32 77.13 89.17 89.19 C77.02 101.25 70.02 112.98 62.60 125.40 C55.76 136.86 48.68 148.71 37.37 160.81 C34.51 163.87 26.61 161.20 26.61 161.20 Z"
                                ></Path>
                            </Svg>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>

                    <Text style={styles.WelcomeText}>User Password</Text>
                    {/* <Text style={styles.Heading}>Visil </Text> */}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{width:"90%"}}>
                            <Text style={styles.LableHeadings}>Password</Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Password"
                                placeholderTextColor="grey"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword} />
                        </View>
                        <View  style={{width:"10%"}}>
                            <TouchableOpacity onPress={() => this.setState({ showPopover: true })}>
                                <Text style={{ marginTop: 10 }}>
                                    <Octicons name="info" size={25} style={{ margin: 30, }} />
                                </Text>
                            </TouchableOpacity>
                            <Popover isVisible={this.state.showPopover} onRequestClose={() => this.setState({ showPopover: false })}>
                                <Text style={{ fontSize: 20, color: "black", margin: 10 }}>Please enter at least one capital letter and one special character.</Text>
                            </Popover>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View  style={{width:"90%"}}>
                            <Text style={styles.LableHeadings}>Conform Password</Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Conform Password"
                                placeholderTextColor="grey"
                                autoCapitalize="none"
                                onChangeText={this.handleConformPassword} />
                        </View>
                        <View  style={{width:"10%"}}>
                            <TouchableOpacity onPress={() => this.setState({ showPopover: true })}>
                                <Text style={{ marginTop: 10 }}>
                                    <Octicons name="info" size={25} style={{ margin: 30, }} />
                                </Text>
                            </TouchableOpacity>
                            <Popover isVisible={this.state.showPopover} onRequestClose={() => this.setState({ showPopover: false })}>
                                <Text style={{ fontSize: 20, color: "black", margin: 10 }}>Please enter at least one capital letter and one special character.</Text>
                            </Popover>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row',justifyContent:"center" }}>
                        <TouchableOpacity
                            onPress={
                                () => this.GoToRegistrationTypes()
                            }>
                            <Text style={styles.BackButton}> {"<< "}Back </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            //style={styles.NextButton}
                            onPress={
                                () => this.GoToOTP(this.state.email, this.state.password)
                            }>
                            <Text style={styles.NextButton}> Next{" >>"} </Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={{ textAlign: "center" }}>Do you have a account?<Text style={{ color: "#821282" }}> Sign in </Text></Text> */}

                </View>

            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        overflow: "scroll"
        //alignItems: 'center',
        //paddingTop: 23,
        //flex: 1,
        //justifyContent: 'center',
    },
    input: {
        margin: 15,
        marginTop: 0,
        height: 40,
        borderColor: 'grey',
        //width:350,
        //borderWidth: 1
        borderBottomWidth: 1
    },
    RadioText: {
        //marginLeft: 5,
        fontSize: 15,
        marginBottom: 5,
        marginRight: 10
    },
    BackButton: {
        backgroundColor: '#6f008d',
        padding: 15,
        margin: 20,
        //marginLeft: 50,
        marginTop: 20,
        borderRadius: 25,
        fontSize: 15,
        width: 150,
        color: 'white',
        textAlign: 'center',
    },
    NextButton: {
        backgroundColor: '#4d089e',
        padding: 15,
        margin: 20,
        fontSize: 15,
        marginTop: 20,
        borderRadius: 25,
        width: 150,
        color: 'white',
        textAlign: 'center',
    },

    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    Heading: {
        textAlign: 'center',
        color: '#4d089e',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10
    },
    LableHeadings: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4d089e'
    },
    WelcomeText: {
        marginLeft: 15,
        fontSize: 30,
        marginBottom: 30,
        color: '#4d089e',
        //marginTop: -25
    },
    pattern: {
        height: 150,
        //width: 375,
        marginRight: 1,
        marginTop: 1
    },
    mask1: {
        height: 150,
        width: 410,
        overflow: "hidden",
        backgroundColor: "transparent"
    },
    pattern1: {
        height: 535,
        width: 537,
        transform: [
            {
                rotate: "14.00deg"
            }
        ],
        marginTop: -410,
        marginLeft: -10
    },
    shapePath: {
        height: 534,
        width: 536,
        backgroundColor: "transparent",
        borderColor: "transparent",
        marginLeft: 10
    },
    TabBtn: {
        padding: 15,
        paddingTop: 5,
        //margin: 20,
        //marginLeft: 50,
        marginBottom: 5,
        fontSize: 15,
        color: "black",
        width: 190,
        textAlign: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    SelectedTabBtn: {
        padding: 15,
        paddingTop: 5,
        marginBottom: 5,
        //margin: 20,
        fontSize: 15,
        color: "blue",
        width: 190,
        textAlign: 'center',
        borderBottomColor: '#4d089e',
        borderBottomWidth: 2
    },
    TabsBlock: {
        marginLeft: 15
    }

});

export default PasswordReg;
