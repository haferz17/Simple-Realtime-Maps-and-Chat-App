import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

//Import Navigations
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

//Import Screens
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import ChatRoom from '../screens/ChatRoom';
import AuthLoading from '../screens/AuthLoading';
import FriendsProfile from '../screens/FriendsProfile';

const AppStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      title: "Profile",
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow:1,
        color: '#fff'
    },
    headerStyle: {
      backgroundColor:'#03a9f4',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('addNotes')}>
          <Image style={{width:30,height:30,marginRight:15}} source={require('../assets/chat.png')}/>
      </TouchableOpacity>)
    }),
    headerLeft: {
      color:'#fff'
    }
  },
  FriendsProfile: {
    screen: FriendsProfile,
    navigationOptions: ({navigation}) => ({
      title: "Profile",
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow:1,
        color: '#fff'
    },
    headerStyle: {
      backgroundColor:'#03a9f4',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('addNotes')}>
          <Image style={{width:30,height:30,marginRight:15}} source={require('../assets/chat.png')}/>
      </TouchableOpacity>)
    }),
    headerLeft: {
      color:'#fff'
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => ({
       title: '',
       headerTitleStyle: {
        textAlign: 'center',
        flexGrow:1,
        color: '#fff'
      },
      headerStyle: {
        backgroundColor:'#03a9f4',
        borderBottomWidth: 0,
        elevation: 0
      },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('addNotes')}>
            <Image style={{width:25,height:25,marginRight:15}} source={require('../assets/loupe.png')}/>
        </TouchableOpacity>)
      })
  },

  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: ({navigation}) => {
      return {
        title: navigation.getParam('name',null),
        headerTitleStyle: {
          textAlign: 'center',
          flexGrow:1,
          color: '#fff'
        },
        headerStyle: {
          backgroundColor:'#03a9f4',
          borderBottomWidth: 0,
          elevation: 0
        },
        headerRight: (
          <TouchableOpacity onPress={navigation.getParam('addNotes')}>
              <Image style={{width:30,height:30,marginRight:15}} source={require('../assets/menu.png')}/>
          </TouchableOpacity>
        )
      }
    },
  }
})
const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
})
// console.disableYellowBox = true;
export default createAppContainer(createSwitchNavigator(
  {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack
  },{
      initialRouteName: 'AuthLoading'
  }
))