import React, { Component } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";

//Import Navigations
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";

//Import Screens
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import Chat from "../screens/Chat";
import ChatRoom from "../screens/ChatRoom";
import AuthLoading from "../screens/AuthLoading";
import FriendsProfile from "../screens/FriendsProfile";
import user from '../config/User';

const AppStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        color: "#03a9f4",
        fontWeight: 'bold'  
      },
      headerStyle: {
        backgroundColor: "#fff",
        borderBottomWidth: 0,
        elevation: 5,
      },
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Image
            style={{ width: 30, height: 30, marginLeft: 15 }}
            source={{uri: user.avatar}}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
          <Image
            style={{ width: 30, height: 30, marginRight: 15 }}
            source={require("../assets/chat.png")}
          />
        </TouchableOpacity>
      ),
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        color: "#fff",
        fontWeight: 'bold'
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#03a9f4",
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: (
        <View>
          <Text style={{ color: '#03a9f4' }}>Icon</Text>
        </View>
      ),
    }),
    headerLeft: {
      color: "#fff",
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Profile',
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        color: "#fff",
        fontWeight: 'bold'
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#03a9f4",
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: (
        <View>
          <Text style={{ color: '#03a9f4' }}>Icon</Text>
        </View>
      ),
    }),
    headerLeft: {
      color: "#fff",
    },
  },
  FriendsProfile: {
    screen: FriendsProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        color: "#fff",
        fontWeight: 'bold'
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#03a9f4",
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: (
        <View>
          <Text style={{ color: '#03a9f4' }}>Icon</Text>
        </View>
      ),
    }),
    headerLeft: {
      color: "#fff",
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        color: "#fff",
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#03a9f4",
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam("addNotes")}>
          <Image
            style={{ width: 25, height: 25, marginRight: 15 }}
            source={require("../assets/loupe.png")}
          />
        </TouchableOpacity>
      )
    }),
  },

  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.getParam("name", null),
        headerTitleStyle: {
          textAlign: "center",
          flexGrow: 1,
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#03a9f4",
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerRight: (
          <TouchableOpacity onPress={navigation.getParam("addNotes")}>
            <Image
              style={{ width: 30, height: 30, marginRight: 15 }}
              source={require("../assets/menu.png")}
            />
          </TouchableOpacity>
        ),
      };;
    }
  },
});;

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});
console.disableYellowBox = true;
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
;
