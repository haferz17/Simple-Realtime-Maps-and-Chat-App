import React, { Component } from "react";
import { 
    AsyncStorage, 
    StatusBar, 
    View,
    Animated,
    Easing, 
    Image
} from "react-native";
import User from "../config/User";
import Button from "../components/button";

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animBtn: false, 
    }
    this.animValue = new Animated.Value(0);
    this.animBtnValue = new Animated.Value(0);
  }

  componentDidMount(){
    this.animTime();
  }

  animTime = () => {
    this.animValue.setValue(0);
    Animated.timing(this.animValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bounce
    }).start(() => this.animButton())
  }

  animButton = () => {
    this.animBtnValue.setValue(0);
    this.setState({ animBtn: true })
    Animated.timing(this.animBtnValue, {
      toValue: 1,
      duration: 1000,
    }).start(() => this.setState({ animBtn: false }))
  }

  _bootstrapAsync = async () => {
    User.uid = await AsyncStorage.getItem("userUid");
    this.props.navigation.navigate(User.uid ? "App" : "Auth");
  };

  render() {
    const { animBtn } = this.state;
    const size = this.animValue.interpolate({
      inputRange: [ 0, 0.5, 1 ],
      outputRange: [ 24, 28, 38 ]
    });
    const opacity = this.animBtnValue.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 0, 1]
    })
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#03a9f4' }}>
        <StatusBar backgroundColor={'#03a9f4'}/>
        <Image source={require('../assets/conversation.png')} style={{ height: 150, width: 150 }}/>
        <Animated.Text style={{ fontSize: size, color: '#fff' }}>Welcome to</Animated.Text>
        <Animated.Text style={{ fontSize: size, color: '#fff' }}>ChatQu</Animated.Text>
        <Animated.View style={{ justifyContent: 'flex-end', opacity, position: 'absolute', bottom: 100 }}>
          <Button onPress={()=> this._bootstrapAsync()} text="Next" animated={animBtn}/>
        </Animated.View>
      </View>
    );
  }
}
