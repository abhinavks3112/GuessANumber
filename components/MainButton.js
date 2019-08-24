import React from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity
} from 'react-native';
import Color from '../constants/colors';

const MainButton = (props) => {
    const { style, children, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
            <View style={{ ...styles.buttonContainerStyle, ...style }}>
                <Text style={styles.buttonTextStyle}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainerStyle: {
        backgroundColor: Color.primary,
        alignContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonTextStyle: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;
