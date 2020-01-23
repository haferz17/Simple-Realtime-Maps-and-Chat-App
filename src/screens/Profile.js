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
import moment from 'moment';
import { Toast } from 'native-base';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFetched: false
        }
    }

    componentDidMount(){
        const didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => { 
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
                    }
                    this.setState({ isFetched: true })
                })
            }
        )
    }
    
    _logOut = async () => {
        await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
    }

    alertNoFeature  = () => {
        Toast.show({
            text: 'Sorry, This feature is not yet available.',
            position: 'top',
            type: 'warning',
            buttonText: 'Okay'
        })
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
                        <TouchableOpacity onPress={()=> this.alertNoFeature()} style={{flex:1,alignItems:'center'}}>
                            <Image style={{width:30,height:30,marginBottom:10}} source={require('../assets/photo.png')}/> 
                            <Text style={{color:'#fff'}}>Upload Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.alertNoFeature()} style={{flex:1,alignItems:'center'}}>
                            <Image style={{width:30,height:30,marginBottom:10}} source={require('../assets/delete.png')}/> 
                            <Text style={{color:'#fff'}}>Delete Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.props.navigation.navigate('EditProfile')}>
                            <Image style={{width:30,height:30,marginBottom:10,alignSelf:'center'}} source={require('../assets/edit.png')}/> 
                            <Text style={{color:'#fff'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                    <View style={{flex:1,width:width*0.9,height:150,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Contact</Text>
                        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 }}>
                            <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Email</Text></View>
                            <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {User.email}</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                            <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Mobile</Text></View>
                            <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {User.mobile}</Text></View>
                        </View>
                    </View>
                    <View style={{flex:1,width:width*0.9,height:200,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Biodata</Text>
                        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 }}>
                            <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Name</Text></View>
                            <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {User.name}</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                            <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Gender</Text></View>
                            <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {User.gender ? (User.gender == "l" ? "Male" : "Female") : null}</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                            <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Birth Date</Text></View>
                            <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {User.birth !== '' ? moment(User.birth).format("DD MMMM YYYY"):''}</Text></View>
                        </View>
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