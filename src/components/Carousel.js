import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import firebase from 'firebase';
import User from '../config/User';
import Loading from './loading';
const { width, height } = Dimensions.get('window')
const widthImg = width * 0.8

export default class FriendsCarousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
    }

    componentDidMount(){
		let dbRef = firebase.database().ref('users');
		dbRef.on('child_added',(val)=>{
			let person = val.val();
			person.uid = val.key;
			if(person.uid == firebase.auth().currentUser.uid){
                User.uid = person.uid
            }
            else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users,person],
                        isLoading: false
                    }
                })
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
        const { users, isLoading } = this.state
        return(
            <View style={{position:'absolute',bottom: 0, height: height*0.22, justifyContent: 'center'}}>
                <Loading isLoading={isLoading} text="Fetching Data ..."/>
                <Carousel
                    ref={ ref => this.carouselRef = ref }
                    data={ users }
                    renderItem={ this.renderRow }
                    sliderWidth={ width }
                    itemWidth={ widthImg }
                    slideStyle={{paddingHorizontal:7, alignSelf: 'center'}}
                    inactiveSlideOpacity={ 1 }
                    inactiveSlideScale={ 1 }
                    loop={true}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        height: 85,
        width: width * 0.24,
        borderRadius: 90
    },
});