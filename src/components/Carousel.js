import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    ActivityIndicator
}
from 'react-native';
import Carousel from 'react-native-snap-carousel';
import firebase from 'firebase';
import User from '../config/User';
const width = Dimensions.get('window').width
const widthImg = width * 0.8

export default class FriendsCarousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentWillMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid===firebase.auth().currentUser.uid){
                User.uid = person.uid;
                User.avatar = person.image;
			}
			else {
				this.setState((prevState)=>{
					return {
                        users: [...prevState.users,person],
					}
                })
                this.setState({isLoading:false})
			} 
		})
	}
    renderRow = ({item}) => {
		return (
			<View style={{backgroundColor:'#fff',flexDirection:'row',borderRadius:12,height:140,elevation:10}}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Text>{item.name}</Text>
                    <Image style={styles.image} source={{uri:item.image}} />
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',borderLeftWidth:2,borderColor:'#eee'}}>
                    <TouchableOpacity 
                        style={{flex:1,borderTopRightRadius:12,width:'100%',backgroundColor:'#fff',borderBottomWidth:2,borderColor:'#eee',justifyContent:'center',alignItems:'center'}}
                        onPress={()=>this.props.navigation.navigate('ChatRoom', item)}>
                        <Image style={{width:35,height:35}} source={require('../assets/chat.png')}/>
                        <Text>Chat</Text>   
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}
                        onPress={()=>this.props.navigation.navigate('FriendsProfile', item)}>
                        <Image style={{width:35,height:35}} source={require('../assets/user.png')}/>
                        <Text>Profile</Text>   
                    </TouchableOpacity>
                </View>
            </View>
		)
	}
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={{position:'absolute',top:40,left:20,elevation:10,backgroundColor:'#fff',borderRadius:30,width:50,height:50}} 
                    onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Image style={{width:50,height:50,marginRight:15,borderRadius:30}} source={{uri:User.avatar}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',top:40,right:20,elevation:10,backgroundColor:'#fff',borderRadius:30,width:45,height:45,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Chat')}>
                    <Image style={{width:40,height:40,marginRight:15}} source={require('../assets/chat.png')}/>
                </TouchableOpacity>
                {
                    this.state.isLoading == true ? <ActivityIndicator style={{backgroundColor:'#fff',padding:10,alignSelf:'center',elevation:5,borderRadius:5}} size='large' color='#03a9f4'/> : 
                        (
                <View style={{position:'absolute',bottom:0}}>
                    <View style={{flex:1,alignItems: 'center'}}>
                        {/* <Text style={{margin:15,fontSize:16,fontWeight:'bold',color:'#fff'}}>Friend List</Text>  */}
                    </View>
                    <View style={{flex:3}}>
                    
                        <View>
                            <Carousel
                                ref={ ref => this.carouselRef = ref }
                                data={ this.state.users }
                                renderItem={ this.renderRow }
                                sliderWidth={ width }
                                itemWidth={ widthImg }
                                slideStyle={{paddingHorizontal:7}}
                                inactiveSlideOpacity={ 1 }
                                inactiveSlideScale={ 1 }
                                loop={true}
                            />
                        </View>
                         
                    </View> 
                     
                </View>
                )
            }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:15,
        backgroundColor:'transparent',
        height:200,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        justifyContent:'center'
    },
    image: {
        height: 85,
        width: width * 0.24,
        borderRadius: 90
    },
});