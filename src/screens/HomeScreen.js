import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Carousel from '../components/Carousel';
import User from '../config/User';
const { Width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            focusedlocation: {
                latitude: -7.7651543,
                longitude: 110.3666396,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            },
            markers: [
            {
                latlng: {
                    latitude: -7.7651543,
                    longitude: 110.3666396,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                title: 'My Location',
                description: 'Jl. Kaliurang No 99'
            },
            {
                latlng: {
                    latitude: -7.7646543,
                    longitude: 110.3686396,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                title: 'Rizqi Location',
                description: 'Jl. Kaliurang No 9'
            },
            {
                latlng: {
                    latitude: -7.7658543,
                    longitude: 110.3678396,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                },
                title: 'Roziq Location',
                description: 'Jl. Kaliurang No 9'
            }
            ]
        }
    }
    
    //   pickLocationHandler = event => {
    //     const coords = event.nativeEvent.coordinate;
    //     this.map.animateToRegion({
    //       ...this.state.focusedlocation,
    //       latitude: coords.latitude,
    //       longitude: coords.longitude
    //     });
    //     this.setState(prevState => {
    //       return {
    //         focusedlocation: {
    //           ...prevState.focusedlocation,
    //           latitude: coords.latitude,
    //           longitude: coords.longitude
    //         },
    //         locationChosen: true
    //       };
    //     });
    //   }
    
    //   getLocationHandler = () => {
    //     navigator.geolocation.getCurrentPosition(pos => {
    //       const coordsEvent = {
    //         nativeEvent: {
    //           coordinate: {
    //             latitude: pos.coords.latitude,
    //             longitude: pos.coords.longitude
    //           }
    //         }
    //       };
    //       this.pickLocationHandler(coordsEvent);
    //     },
    //       err => {
    //         console.log(err);
    //         alert("Fetching the position failed, please enable GPS manually!");
    //       })
    // //   }
    render() {
        return (
            <View style={{flex:1,heigth:100}}>
                <StatusBar backgroundColor="#4dd0e1" barStyle="light-content" />
                <MapView
                    style={{...StyleSheet.absoluteFillObject}}
                    initialRegion={this.state.focusedlocation}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        />
                    ))}
                </MapView>
                {/* <TouchableOpacity 
                    style={{position:'absolute',top:40,left:20,elevation:10,backgroundColor:'#fff',borderRadius:30,width:50,height:50}} 
                    onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Image style={{width:50,height:50,marginRight:15,borderRadius:30}} source={{uri:User.avatar}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',top:40,right:20,elevation:10,backgroundColor:'#fff',borderRadius:30,width:45,height:45,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('Chat')}>
                    <Image style={{width:40,height:40,marginRight:15}} source={require('../assets/chat.png')}/>
                </TouchableOpacity>
                <View style={{position:'absolute',bottom:0}}> */}
                    <Carousel navigation={this.props.navigation}/>
                </View>
                
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    map: {
        height
    },
});