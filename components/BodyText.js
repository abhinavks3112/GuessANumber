import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => {
    const { style, children } = props;
    return <Text style={{ ...styles.bodyTextStyle, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
    bodyTextStyle: {
        fontFamily: 'open-sans'
    }
});

export default BodyText;
