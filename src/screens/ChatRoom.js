import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions, Image} from 'react-native';

import firebase from 'firebase';
import User from '../config/User'; 
import moment from 'moment';
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
    componentDidMount(){
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
                <Text style={{color: item.from===User.uid ? '#fff':'#333',alignSelf:'flex-end',fontSize:12}}>{moment(item.time).format("hh:mm A")}</Text>
            </View>
        )
    }
	render() {
        let { height, width } = Dimensions.get('window')
		return (
            <View style={{flex:1,backgroundColor:'#03a9f4'}}>
                <View style={{flex:1}}>
                    
                </View>
                <View style={{flex:14,backgroundColor:'#fff',borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:10}}>
                    <Text style={{alignSelf:'center'}}>{User.status}</Text>
                    <FlatList
                        style={{padding:10,height:height*0.8}}
                        data={this.state.messageList}
                        renderItem={this.renderRow}
                        keyExtractor={(item,index)=>index.toString()}
                        ref = "flatList"
                        onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
                    />
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width}}>
                        <TextInput 
                            style={{borderWidth:1,width:width*0.75,paddingHorizontal:15,borderRadius:20,borderColor:'#999',marginBottom:5}}
                            value={this.state.textMessage}
                            onChangeText={this.handleChange('textMessage')}
                        />
                        <TouchableOpacity onPress={this.sendMessage}>
                            <Image style={{height:40,width:40,marginLeft:10}} source={require('../assets/send.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
		)
	}
}