import React, {Component} from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Dimensions, Image, StatusBar } from 'react-native';

import firebase from 'firebase';
import User from '../config/User';

const { width, height } = Dimensions.get('window');

export default class Chat extends Component {
	state = {
		users: []
	};

	componentDidMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid !== firebase.auth().currentUser.uid){
				this.setState((prevState)=>{
					return {
						users: [...prevState.users, person]
					}
				})
			}
		})
	}

	renderRow = ({item}) => {
		return (
			<TouchableOpacity
			style={{backgroundColor:'#fff',width,height:65,borderWidth:1,borderColor:'#f4f4f4',flexDirection:'row',alignItems:'center',paddingLeft:20}}
			onPress={()=>this.props.navigation.navigate('ChatRoom', item)}>
				<Image style={{width:50,height:50,marginRight:15,borderRadius:30}} source={{uri:item.image}}/>
				<Text style={{marginBottom:20,fontSize:18}}>{item.name}</Text>
			</TouchableOpacity>
			
		)
	}

	render() {
		return (
			<View style={{flex:1,backgroundColor:'#03a9f4'}}>
				<StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
				<View style={{flex:1,justifyContent:'flex-start',backgroundColor:'#03a9f4'}}>
					<Text style={{color:'#fff',marginLeft:20,fontSize:25,fontWeight:'bold'}}>Message</Text>
				</View>
				<View style={{ flex:1, backgroundColor:'#fff', borderTopLeftRadius:25, borderTopRightRadius:25, flexDirection: 'column' }}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingTop: 10 }}>
						<Text style={{ fontSize: 20, color: '#03a9f4', fontWeight: 'bold' }}>List Contact</Text> 
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
						<Text style={{ fontSize: 15, color: '#999' }}>Tap to chat</Text> 
					</View>
				</View>
				<View style={{flex:8}}>
					<FlatList
						style={{width,height,backgroundColor:'#f4f4f4',bordeTopLeftRadius:25}}
						data={this.state.users}
						renderItem={this.renderRow}
						keyExtractor={(item) => item.uid}
					/>
				</View>
			</View>
		)
	}
}