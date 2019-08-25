import React from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 TouchableNativeFeedback,
 Platform
} from 'react-native';
import Color from '../constants/colors';

const MainButton = (props) => {
    const { style, children, onPress } = props;
    // Captial letter variable can hold components and be used in
    // JSX as tag and not small letter beginning variable
    let ButtonComponent = TouchableOpacity;
    // TouchableNativeFeedback is available from android OS version
    // 21 and onwards
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonRootContainer}>
            <ButtonComponent onPress={onPress} activeOpacity={0.6}>
                <View style={{ ...styles.buttonContainerStyle, ...style }}>
                    <Text style={styles.buttonTextStyle}>
                        {children}
                    </Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonRootContainer: {
        borderRadius: 25,
        // Child component part going outside this view will be clipped eg ripple effect shadow
        overflow: 'hidden'
    },
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
