import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
    return(<View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{title}</Text>
    </View>);
};

const styles = StyleSheet.create({
    headerStyle: {
        width: '100%',
        height: 90,
        paddingTop: 26,
        backgroundColor: '#f7287B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTextStyle: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;