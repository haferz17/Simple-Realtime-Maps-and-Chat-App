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

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            users: [],
            person: {
                uid: props.navigation.getParam('uid'),
            },
        }
    }
    
    componentWillMount(){
        firebase.database().ref('users').child(this.state.person.uid)
            .on('child_added',(value)=>{
                this.setState((prevState)=>{
                    return {
                        users: [...prevState.users, value.val()]
                    }
                })
            })
    }
    
    render() {
        console.warn(this.state.users)
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex:1,backgroundColor:'#03a9f4',justifyContent:'center',alignItems:'center',borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
                        <View style={{flex:3,alignItems:'center'}}>
                            <Image style={{width:130,height:130,borderRadius:65,marginBottom:15,backgroundColor:'#fff'}} source={{uri:User.avatar}}/>     
                            <Text style={{color:'#fff',fontSize:25,fontWeight:'bold',marginBottom:15}}>{this.state.users[2]}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <View style={{flex:1,width:width*0.9,height:150,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                            <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Contact</Text>
                            <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Email : {this.state.users[0]}</Text>
                            <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Mobile  : {User.mobile}</Text>
                        </View>
                        <View style={{flex:1,width:width*0.9,height:200,backgroundColor:'#f9f9f9',marginTop:20,borderRadius:9,elevation:1,padding:15}}>
                            <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Biodata</Text>
                            <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Nama : {this.state.users[2]}</Text>
                            <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Gender  : </Text>
                            <Text style={{color:'#777',width:'100%',borderTopWidth:1,padding:10}}>Birth Date  : </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
});