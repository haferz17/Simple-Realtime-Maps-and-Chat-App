import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { Toast } from 'native-base';
import Home from './HomeScreen';
import User from '../config/User';
import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase';
import ShowPass from "../components/showPassword";
import Loading from '../components/loading';
const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            isLogin: false,
            showPass: false
        };
    }

    onPressLogin = async () => {
        if (this.state.email === "" || this.state.password === "") {
            Toast.show({
              text: 'Email or Password is required',
              buttonText: 'Okay',
              position: 'top',
              type: 'danger'
            })
        } else {
            Keyboard.dismiss()
            this.setState({ isLoading: true })
            const user = {
                email: this.state.email,
                password: this.state.password,
            };
            firebaseSDK.login(
                user,
                this.loginSuccess,
                this.loginFailed
            );
        }
    };

    loginSuccess = () => {
        this.setState({ isLoading: false, isLogin: true })
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        AsyncStorage.setItem('userEmail',user.email)
        let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
            let person = val.val();
			person.uid = val.key;
			if(person.uid===firebase.auth().currentUser.uid){
                User.name = person.name;
                User.email = person.email;
                User.mobile = person.mobile;
                User.avatar = person.image;
                User.gender = person.gender;
                User.birth = person.birth;
                User.status = "Online"
            }
		})
        
        Toast.show({
            text: 'Login Successful, Welcome !',
            position: 'top',
            type: 'success',
            duration: 3000
        })
	};

	loginFailed = () => {
        this.setState({ isLoading: false })
        Toast.show({
            text: 'Login failure. Please try again.',
            position: 'top',
            type: 'danger',
            buttonText: 'Okay'
        })
    };
    
    alertNoFeature  = () => {
        Toast.show({
            text: 'Sorry, This feature is not yet available.',
            position: 'top',
            type: 'warning',
            buttonText: 'Okay'
        })
    }

	onChangeTextEmail = email => this.setState({ email });
    onChangeTextPassword = password => this.setState({ password });
    
    render() {
        const { isLoading, isLogin, showPass } = this.state
        return (
            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" style={styles.container}>
                <StatusBar backgroundColor='#4dd0e1'/>
                <Loading isLoading={isLoading} text="Please Wait ..."/>
                { isLogin == true ? this.props.navigation.navigate('HomeScreen') : (
                <View style={styles.contain}>
                    <View style={styles.header}>
                        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.bgImage}>
                                <Image style={{width:40,height:40}} source={require('../assets/key-3.png')}/>                        
                            </View>
                        </View>
                        <View style={{flex:5,justifyContent:'center',width:100}}>
                            <Text style={{fontSize:23,marginBottom:7}}>Login</Text>
                            <Text style={{color:'#999'}}>Welcome Back</Text>
                        </View>
                        <View style={{flex:2,justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <Text style={{color:'green'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={styles.body}>
                        <View style={{flex:2.5,justifyContent:'center'}}>
                            <Text style={{marginBottom:15}}>Your Email</Text>
                            <TextInput style={styles.input} placeholder={"Email"} onChangeText={this.onChangeTextEmail}/>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{marginBottom:15}} >Your Password</Text>
                                <ShowPass onPress={()=> this.setState({ showPass: !showPass })} showPass={showPass}/>
                            </View>
                            <TextInput style={styles.input} secureTextEntry={ showPass ? false:true } placeholder={"Password"} onChangeText={this.onChangeTextPassword}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressLogin}>
                                <Text style={{color:'#fff'}}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.alertNoFeature()} style={{marginBottom:10,alignSelf:'center'}}>
                                <Text  style={{color:'#03a9f4'}}>Forgot Password?</Text>
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
        flexDirection:'row',
        borderBottomWidth:2,
        borderColor:'#ddd',
        position: 'absolute',
        zIndex:3,
        paddingVertical:15,
    },
    bgImage: {
        backgroundColor:'#03a9f4',
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
        marginTop: 80,
        zIndex: 1
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
        flex: 2,
        borderTopWidth:1,
        alignItems:'center',
        borderColor:'#ddd',
        justifyContent:'center'
    }
})