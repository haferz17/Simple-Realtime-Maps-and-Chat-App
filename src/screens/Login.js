import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import firebaseSDK from '../config/firebaseSDK';
const { width,height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    onPressLogin = async () => {
		const user = {
			email: this.state.email,
			password: this.state.password,
		};
        
		const response = firebaseSDK.login(
			user,
			this.loginSuccess,
			this.loginFailed
		);
    };
    loginSuccess = () => {
		alert('login successful');
		this.props.navigation.navigate('HomeScreen', {
			name: this.state.name,
			email: this.state.email,
		});
	};

	loginFailed = () => {
		alert('Login failure. Please tried again.');
	};

	onChangeTextEmail = email => this.setState({ email });
    onChangeTextPassword = password => this.setState({ password });
    
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
                            <Text style={{fontSize:23,marginBottom:7}}>Login</Text>
                            <Text style={{color:'#999'}}>Welcome Back</Text>
                        </View>
                        <View style={{flex:2,justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <Text style={{color:'green'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={{flex:5,justifyContent:'center'}}>
                            <Text style={{marginBottom:15}}>Your Email</Text>
                            <TextInput style={styles.input} placeholder={"Email"} onChangeText={this.onChangeTextEmail}/>
                            <Text style={{marginBottom:15}} >Your Password</Text>
                            <TextInput style={styles.input} secureTextEntry={true} placeholder={"Password"} onChangeText={this.onChangeTextPassword}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressLogin}>
                                <Text style={{color:'#fff'}}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginBottom:10,alignSelf:'center'}}>
                                <Text  style={{color:'#03a9f4'}}>Forgot Password?</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{fontSize:13,color:'#999'}}>By creating an account you agree to our</Text>
                        <TouchableOpacity>
                            <Text style={{fontSize:13,color:'#03a9f4'}}>Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection:'row',
        borderBottomWidth:2,
        borderColor:'#ddd'
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
        flex: 8,
        paddingVertical:40,
        paddingHorizontal:40,
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