import React, { Component } from 'react';
import { Root } from 'native-base';
import Navigation from './src/navigation/navigation';
import Profile from './src/screens/Profile';

export default class App extends Component {
  render(){
    return (
      <Root>
        <Navigation/>
        {/* <Profile/> */}
      </Root>
    )
  }
}