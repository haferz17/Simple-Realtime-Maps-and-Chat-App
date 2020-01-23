import React from 'react';
import { View, ActivityIndicator, Text, Dimensions, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

const Loading = ({ isLoading, text, backgroundColor }) => {
    return (
        <View>
        {
            isLoading ? (
            <View style={{ width, height, justifyContent:'center', alignItems: 'center', backgroundColor }}>
                <ActivityIndicator size={'large'}/>
                <Text style={{ marginTop: 10 }}>{text}</Text>
            </View>
            ) : null
        }
        </View>
    )
}

export default Loading;