import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    CheckBox,
    ScrollView
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from 'firebase';
const { width,height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkedMale:false,
            checkedFemale:false,
            disabledMale:false,
            disabledFemale:false,
            date:"July 16, 2019",
            isDateTimePickerVisible: false,
            name: '',
            email: '',
            password: '',
            avatar: '',
            mobile: '',
            image: ''
        };
    }
    onPressCreate = async () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
            image: this.state.image
        };
		firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((response)=> {
                firebase.database().ref('users/'+response.user.uid).set({name:user.name,email:user.email,mobile:user.mobile,image:user.image});
                alert('User ' + user.name + ' was created successfully. Please login.');
                this.props.navigation.navigate('Auth');
            },
            function(error) {
                alert('Create account failed. Error: ' + error.message);
            }
        );
    };
    // onPressCreate = async () => {
	// 	try {
	// 		const user = {
	// 			name: this.state.name,
	// 			email: this.state.email,
	// 			password: this.state.password,
	// 		};
	// 		await firebaseSDK.createAccount(user);
	// 	} catch ({ message }) {
	// 		console.log('create account failed. catch error:' + message);
	// 	}
	// };

	onChangeTextEmail = email => this.setState({ email });
	onChangeTextPassword = password => this.setState({ password });
	onChangeTextName = name => this.setState({ name });
	onChangeTextMobile = mobile => this.setState({ mobile });
	onChangeTextImage = image => this.setState({ image });

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
    render() {
        return (
            <View style={styles.container}>
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
                    <ScrollView>
                    <View style={styles.body}>
                        <View style={{flex:5,justifyContent:'center'}}>
                            <Text style={{marginBottom:15}}>Your Name</Text>
                            <TextInput style={styles.input} placeholder={"Name"} 
                            
                            onChangeText={this.onChangeTextName}
					        value={this.state.name}/>
                            <Text style={{marginBottom:15}}>Your Email</Text>
                            <TextInput style={styles.input} placeholder={"Email"}
                            
                            onChangeText={this.onChangeTextEmail}
					        value={this.state.email}/>
                            <Text style={{marginBottom:5}}>Gender</Text>
                            <View style={{height:50,flexDirection:'row',marginBottom:10}}>
                                <TouchableOpacity 
                                onPress={() => this.setState({checkedMale: !this.state.checkedMale,disabledFemale:!this.state.disabledFemale})} 
                                style={{flex:1,flexDirection:'row',backgroundColor:'#eee',marginRight:7,alignItems:'center',padding:10,borderRadius:9}}>
                                    <CheckBox
                                        value={this.state.checkedMale}
                                        onChange={() => this.setState({checkedMale: !this.state.checkedMale,disabledFemale:!this.state.disabledFemale})}
                                        disabled={this.state.disabledMale}
                                    />
                                    <Text>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => this.setState({checkedFemale: !this.state.checkedFemale,disabledMale:!this.state.disabledMale})} 
                                style={{flex:1,flexDirection:'row',backgroundColor:'#eee',marginLeft:7,alignItems:'center',padding:10,borderRadius:9}}>
                                    <CheckBox
                                        value={this.state.checkedFemale}
                                        onChange={() => this.setState({checkedFemale: !this.state.checkedFemale,disabledMale:!this.state.disabledMale})}
                                        disabled={this.state.disabledFemale}
                                    />
                                    <Text>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{marginBottom:5}}>Birth Date</Text>
                            <TouchableOpacity onPress={this.showDateTimePicker} style={[styles.input,{height:55,flexDirection:'row',alignItems:'center'}]}>
                            <Image style={{width:20,height:20,marginRight:15}} source={require('../assets/calendar.png')}/> 
                                <Text>{this.state.date}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                            />
                            <Text style={{marginBottom:15}} >Your Password</Text>
                            <TextInput style={styles.input} placeholder={"Password"}
                            onChangeText={this.onChangeTextPassword}
                            value={this.state.password}
                            secureTextEntry={true}/>
                            <Text style={{marginBottom:15}} >Mobile</Text>
                            <TextInput style={styles.input} placeholder={"+62"}
                            onChangeText={this.onChangeTextMobile}
					        value={this.state.mobile}/>
                            <Text style={{marginBottom:15}} >Image Url</Text>
                            <TextInput style={styles.input} placeholder={"Image Url"}
                            onChangeText={this.onChangeTextImage}
					        value={this.state.Image}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressCreate}>
                                <Text style={{color:'#fff'}}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}>
                        <Text style={{fontSize:13,color:'#999'}}>By creating an account you agree to our</Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:13,color:'#03a9f4'}}>Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width,
        height,
        position:'absolute'
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
        flex: 8,
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
        marginTop:20,
        marginBottom:10,
        backgroundColor:'#03a9f4',
        width:width*0.8,
        borderRadius:12,
        alignSelf:'center',
        height:45,
        justifyContent:'center',
        alignItems:'center'
    },
    footer: {
        borderTopWidth:1,
        alignItems:'center',
        borderColor:'#ddd',
        justifyContent:'center',
        marginTop:20,
        padding:5
    }
})