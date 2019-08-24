import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Header = ({ title }) => (
<View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{title}</Text>
</View>
);

const styles = StyleSheet.create({
    headerStyle: {
        width: '100%',
        height: 90,
        paddingTop: 26,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTextStyle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;
