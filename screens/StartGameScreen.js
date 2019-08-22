import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartGameScreen = () => {
    return (
        <View style={styles.screenStyle}>
            <Text>Game Screen!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
});

export default StartGameScreen;
