import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
}
from 'react-native';
import Carousel from 'react-native-snap-carousel';
import firebase from 'firebase';
import User from '../config/User';
const width = Dimensions.get('window').width
const widthImg = width * 0.8

export default class FriendsCarousel extends Component {
    state = {
		users: []
	};
    componentWillMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid===firebase.auth().currentUser.uid){
				User.avatar = person.image
                User.name = person.name
            //     User.location = {
            //         latitude: person.location.latitude,
            //         longitude: person.location.longitude,
            // }
            console.warn(person.image)
			}
			else {
				this.setState((prevState)=>{
					return {
						users: [...prevState.users,person]
					}
				})
			} 
		})
	}
    renderRow = ({item}) => {
        console.log(this.state.users)
		return (
			<TouchableOpacity style={{backgroundColor:'#fff',flexDirection:'row',borderRadius:12,height:140,elevation:10}}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Text>{item.name}</Text>
                    <Image style={styles.image} source={{uri:item.image}} />
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',borderLeftWidth:2,borderColor:'#eee'}}>
                    <TouchableOpacity style={{flex:1,borderTopRightRadius:12,width:'100%',backgroundColor:'#fff',borderBottomWidth:2,borderColor:'#eee',justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:35,height:35,marginRight:15}} source={require('../assets/chat.png')}/>
                        <Text>Chat</Text>   
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:35,height:35,marginRight:15}} source={require('../assets/user.png')}/>
                        <Text>Profile</Text>   
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
		)
	}
    render(){
        return(
            <View style={styles.container}>
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
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:15,
        backgroundColor:'transparent',
        height:200,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    image: {
        height: 85,
        width: width * 0.24,
        borderRadius: 90
    },
});