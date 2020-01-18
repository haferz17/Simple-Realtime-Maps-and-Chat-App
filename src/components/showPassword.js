import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ShowPass = ({ showPass, onPress }) => {
    const imgSource = showPass ? require('../assets/hide.png'):require('../assets/eye.png')
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={imgSource} style={{ height: 23, width: 23 }}/>
        </TouchableOpacity>
    )
}

export default ShowPass;