import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import { Toast } from 'native-base';
import Loading from '../components/loading';
import firebase from 'firebase';
import ShowPass from '../components/showPassword';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            name: '',
            email: '',
            newPass: '',
            password: '',
            image: 'https://www.iiitdm.ac.in/img/bog/4.jpg',
            isLoading: false,
            isReg: false,
            showPass: false,
            showConfirmPass: false,
        };
    }
    onPressCreate = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.name == "") {
            Toast.show({
                text: 'Name is required',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (this.state.name.length < 6) {
            Toast.show({
              text: 'At least 6 char in Name',
              buttonText: 'Okay',
              position: 'top',
              type: 'danger'
            })
        }
        else if (this.state.email == "") {
            Toast.show({
              text: 'Email is required',
              buttonText: 'Okay',
              position: 'top',
              type: 'danger'
            })
        }
        else if (reg.test(this.state.email) === false) {
            Toast.show({
                text: 'Incorrect Email Format',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (this.state.newPass == "") {
            Toast.show({
                text: 'Password is required',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (this.state.newPass.length < 6) {
            Toast.show({
                text: 'At least 6 char in Password',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (this.state.password == "") {
            Toast.show({
                text: 'Password is required',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (this.state.password !== this.state.newPass) {
            Toast.show({
                text: 'Password is not match',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else {
            this.setState({isLoading:true})
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                image: this.state.image
            };
            firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response)=> {
                    firebase.database().ref('users/'+response.user.uid).set({
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        image: user.image,
                        mobile: '',
                        gender: '',
                        birth: ''
                    });
                    this.setState({isLoading:false,isReg:true})
                    Toast.show({
                        text: 'Register Success, please login !',
                        position: 'top',
                        type: 'success'
                    })
                },
            )
            .catch((error)=> {
                Alert.alert(
                    'Register Failed',
                    error.message
                )
                this.setState({ isLoading: false })
               
            })
        }
    };

    onChangeTextName = name => this.setState({ name });
	onChangeTextEmail = email => this.setState({ email });
	onChangeTextNewPass = newPass => this.setState({ newPass });
	onChangeTextPassword = password => this.setState({ password });
	

	// onImageUpload = async () => {
	// 	const { status: cameraRollPerm } = await Permissions.askAsync(
	// 		Permissions.CAMERA_ROLL
	// 	);
	// 	try {
	// 		// only if user allows permission to camera roll
	// 		if (cameraRollPerm === 'granted') {
	// 			let pickerResult = await ImagePicker.launchImageLibraryAsync({
	// 				allowsEditing: true,
	// 				aspect: [4, 3]
	// 			});
	// 			console.log(
	// 				'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
	// 			);

	// 			var wantedMaxSize = 150;
	// 			var rawheight = pickerResult.height;
	// 			var rawwidth = pickerResult.width;
	// 			var ratio = rawwidth / rawheight;
	// 			var wantedwidth = wantedMaxSize;
	// 			var wantedheight = wantedMaxSize / ratio;
	// 			// check vertical or horizontal
	// 			if (rawheight > rawwidth) {
	// 				wantedwidth = wantedMaxSize * ratio;
	// 				wantedheight = wantedMaxSize;
	// 			}
	// 			let resizedUri = await new Promise((resolve, reject) => {
	// 				ImageEditor.cropImage(
	// 					pickerResult.uri,
	// 					{
	// 						offset: { x: 0, y: 0 },
	// 						size: { width: pickerResult.width, height: pickerResult.height },
	// 						displaySize: { width: wantedwidth, height: wantedheight },
	// 						resizeMode: 'contain'
	// 					},
	// 					uri => resolve(uri),
	// 					() => reject()
	// 				);
	// 			});
	// 			let uploadUrl = await firebaseSDK.uploadImage(resizedUri);
	// 			this.setState({ avatar: uploadUrl });
	// 			await firebaseSDK.updateAvatar(uploadUrl);
	// 		}
	// 	} catch (err) {
	// 		console.log('onImageUpload error:' + err.message);
	// 		alert('Upload image error:' + err.message);
    //     }
    // }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    alertNoFeature  = () => {
        Toast.show({
            text: 'Sorry, This feature is not yet available.',
            position: 'top',
            type: 'warning',
            buttonText: 'Okay'
        })
    }

    render() {
        const { isLoading, isReg, showPass, showConfirmPass } = this.state
        return (
            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" style={styles.container}>
                <StatusBar backgroundColor='#4dd0e1'/>
                <Loading isLoading={isLoading} text="Please Wait ..."/>
                {  isReg == true ? this.props.navigation.navigate('Login') : (
                <View style={styles.contain}>
                    <View style={styles.header}>
                        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.bgImage}>
                                <Image style={{width:40,height:40}} source={require('../assets/key-3.png')}/>                        
                            </View>
                        </View>
                        <View style={{flex:5,justifyContent:'center',width:100}}>
                            <Text style={{fontSize:23,marginBottom:7}}>Register</Text>
                            <Text style={{color:'#999'}}>Create an account</Text>
                        </View>
                        <View style={{flex:2,marginTop:20}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                                <Text style={{color:'green'}}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <KeyboardAvoidingView behavior="padding" style={styles.body}>
                        <View style={{flex:7,justifyContent:'center'}}>

                            <Text style={{marginBottom:15,marginTop:25}}>Your Name</Text>
                            <TextInput style={styles.input} placeholder={"Name"} 
                            onChangeText={this.onChangeTextName}
					        value={this.state.name}/>

                            <Text style={{marginBottom:15}}>Your Email</Text>
                            <TextInput style={styles.input} placeholder={"Email"}
                            onChangeText={this.onChangeTextEmail}
					        value={this.state.email}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{marginBottom:15}} >Your Password</Text>
                                <ShowPass onPress={()=> this.setState({ showPass: !showPass })} showPass={showPass}/>
                            </View>
                            <TextInput style={styles.input} placeholder={"Password"}
                            onChangeText={this.onChangeTextNewPass}
                            value={this.state.newPass}
                            secureTextEntry={showPass ? false:true}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{marginBottom:15}} >Confirm Password</Text>
                                <ShowPass onPress={()=> this.setState({ showConfirmPass: !showConfirmPass })} showPass={showConfirmPass}/>
                            </View>
                            <TextInput style={styles.input} placeholder={"Password"}
                            onChangeText={this.onChangeTextPassword}
                            value={this.state.password}
                            secureTextEntry={showConfirmPass ? false:true}/>

                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressCreate}>
                                <Text style={{color:'#fff'}}>Register</Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                    <View style={styles.footer}>
                        <Text style={{fontSize:13,color:'#999'}}>By creating an account you agree to our</Text>
                        <TouchableOpacity onPress={()=> this.alertNoFeature()}>
                            <Text style={{fontSize:13,color:'#03a9f4'}}>Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width,
        height,
        position:'absolute',
    },
    contain: {
        flex:1,
        width,
        height,
        backgroundColor:'#f9f9f9'
    },
    header: {
        flex: 2,
        backgroundColor:'#f9f9f9',
        flexDirection:'row',
        borderBottomWidth:2,
        borderColor:'#ddd',
        position:'absolute',
        zIndex:3,
        paddingVertical:15,
    },
    bgImage: {
        backgroundColor:'#ffeb3b',
        borderRadius:30,
        justifyContent:'center',
        height:65,
        width:65,
        alignItems:'center'
    },
    body: {
        flex: 10,
        paddingVertical:40,
        paddingHorizontal:40,
        marginTop:80,
        zIndex:1
    },
    input: {
        width:width*0.8,
        borderWidth:2,
        borderColor:'#ddd',
        alignSelf:'center',
        marginBottom:20,
        borderRadius:12,
        paddingHorizontal:20
    },
    btnLogin: {
        marginTop:15,
        backgroundColor:'#03a9f4',
        width:width*0.8,
        borderRadius:12,
        alignSelf:'center',
        height:45,
        justifyContent:'center',
        alignItems:'center'
    },
    footer: {
        flex:1.9,
        borderTopWidth:1,
        alignItems:'center',
        borderColor:'#ddd',
        justifyContent:'center',
    }
})