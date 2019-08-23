import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = (props) => (
        <View style={styles.containerStyle}>
            <Text style={styles.numberStyle}>{props.children}</Text>
        </View>
);

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberStyle: {
        color: Colors.accent,
        fontSize: 22
    }
});

export default NumberContainer;
