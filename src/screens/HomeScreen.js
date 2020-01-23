import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Carousel from '../components/Carousel';
import firebase from 'firebase';
import user from '../config/User';

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

    componentDidMount() {
        firebase.database().ref('status/'+user.uid).set({
            status: "Online"
        });
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
            <View style={{ flex:1 }}>
                <StatusBar backgroundColor="#4dd0e1" barStyle="light-content" />
                <MapView
                    style={styles.map}
                    initialRegion={this.state.focusedlocation}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
                <Carousel navigation={this.props.navigation}/>
            </View>
                
        )
    }
}
const styles = StyleSheet.create({
    map: {
        height,
    },
});