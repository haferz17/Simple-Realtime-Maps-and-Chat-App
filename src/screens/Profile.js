import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
    AsyncStorage,
    Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
import firebase from 'firebase';
import User from '../config/User';
import EditModal from './EditModal';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
        }
    }
    
    componentDidMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
			let person = val.val();
			person.uid = val.key;
			console.log(person.uid)
			if(person.uid===firebase.auth().currentUser.uid){
                User.name = person.name;
                User.email = person.email;
                User.mobile = person.mobile;
                User.avatar = person.image;
                this.setState({fetched:true})
            }
            console.log(User.name,User.email,User.mobile,User.avatar)
		})
    }
    
    _logOut = async () => {
        await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
    }
    
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,backgroundColor:'#03a9f4',justifyContent:'center',alignItems:'center',borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
                    <View style={{flex:3,alignItems:'center'}}>
                        <Image style={{width:130,height:130,borderRadius:65,marginBottom:15,backgroundColor:'#fff'}} source={{uri:User.avatar}}/>     
                        <Text style={{color:'#fff',fontSize:25,fontWeight:'bold',marginBottom:5}}>{User.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',marginHorizontal:20,marginVertical:15}}>
                        <View style={{flex:1,alignItems:'center'}}>
                            <Image style={{width:30,height:30,marginBottom:10}} source={require('../assets/photo.png')}/> 
                            <Text style={{color:'#fff'}}>Upload Photo</Text>
                        </View>
                        <View style={{flex:1,alignItems:'center'}}>
                            <Image style={{width:30,height:30,marginBottom:10}} source={require('../assets/delete.png')}/> 
                            <Text style={{color:'#fff'}}>Delete Account</Text>
                        </View>
                        <EditModal/>
                    </View>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <View style={{flex:1,width:width*0.9,height:150,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Contact</Text>
                        <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Email : {User.email}</Text>
                        <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Mobile  : {User.mobile}</Text>
                    </View>
                    <View style={{flex:1,width:width*0.9,height:200,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Biodata</Text>
                        <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Nama : {User.name}</Text>
                        <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Gender  : </Text>
                        <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Birth Date  : </Text>
                    </View>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity style={{flex:1,width:width*0.6,height:50,backgroundColor:'#03a9f4',marginVertical:20,borderRadius:9,elevation:1,padding:9}} onPress={this._logOut}>
                        <Text style={{color:'#fff',fontSize:20,alignSelf:'center'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
});