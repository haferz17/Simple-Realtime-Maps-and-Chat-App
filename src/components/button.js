import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text, animated, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, animated ? {elevation:0}:null]} activeOpacity={0.8}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        elevation: 5
    },
    text: {
        color: '#03a9f4',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    }
})

export default Button;