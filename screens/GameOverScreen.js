import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screenStyle}>
            <Text>The Game is Over!!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;
