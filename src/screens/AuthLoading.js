import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native';
import User from '../config/User';

export default class AuthLoading extends Component {
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        User.email = await AsyncStorage.getItem('userEmail');
        this.props.navigation.navigate(User.email? 'App' : 'Auth');
    }

    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
                <StatusBar barStyle="default"/>
            </View>
        )
    }
}
