import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, Dimensions, Image} from 'react-native';

import firebase from 'firebase';
import User from '../config/User'; 
const { width,height } = Dimensions.get('window');

export default class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid'),
            },
            textMessage: '',
            messageList: []
        }
    }
    componentWillMount(){
        firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
            .on('child_added',(value)=>{
                this.setState((prevState)=>{
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }
	handleChange = key => val => {
        this.setState({ [key]: val })
    }

	sendMessage = async () => {
        if(this.state.textMessage.length>0){
            let msgId = firebase.database().ref('messages').child(this.state.person.uid).child(this.state.person.uid).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.uid
            }
            updates['messages/'+User.uid+'/'+this.state.person.uid+'/'+msgId] = message;
            updates['messages/'+this.state.person.uid+'/'+User.uid+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''});
        }
    }
    renderRow = ({item}) => {
        return(
            // <View style={{flex:1,flexDirection:'row',width}}>

            // {/* <View>
            //     {item.from===User.uid?
            //     <Image/>:<Image style={{width:50,height:50,marginRight:15,borderRadius:30}} source={require('../assets/profile.jpg')}/>
            //     }  
            // </View> */}
            <View style={{
                width:'60%',
                alignSelf: item.from===User.uid ? 'flex-end':'flex-start',
                backgroundColor: item.from===User.uid ? '#03a9f4':'#f4f4f4',
                marginBottom:20,
                padding:10,
                borderRadius: 15,
                borderTopLeftRadius: item.from===User.uid ? 15 : 0,
                borderTopRightRadius: item.from===User.uid ? 0 : 15
            }}>
                <Text style={{color: item.from===User.uid ? '#fff':'#333',marginBottom:5}}>{item.message}</Text>
                <Text style={{color: item.from===User.uid ? '#fff':'#333'}}>{item.time}</Text>
            </View>
            // </View>
        )
    }
	render() {
        let {height,width} = Dimensions.get('window')
        console.log(this.state.messageList)
		return (
            <View style={{flex:1,backgroundColor:'#03a9f4'}}>
                <View style={{flex:1}}>
                    
                </View>
                <View style={{flex:14,backgroundColor:'#fff',borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:10}}>
                <Text style={{alignSelf:'center'}}>Active</Text>
                <FlatList
                    style={{padding:10,height:height*0.8}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width}}>
                    <TextInput 
                        style={{borderWidth:1,width:width*0.75,paddingHorizontal:15,borderRadius:20,borderColor:'#333'}}
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
		)
	}
}