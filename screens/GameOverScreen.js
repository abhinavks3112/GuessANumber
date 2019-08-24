import React from 'react';
import {
 View, StyleSheet, Button
} from 'react-native';
import BodyText from '../components/BodyText';

const GameOverScreen = (props) => {
    const { roundsNumber, userNumber, onRestart } = props;
    return (
        <View style={styles.screenStyle}>
            <BodyText>The Game is Over!!!</BodyText>
            <BodyText>
                Number of rounds:
                {roundsNumber}
            </BodyText>
            <BodyText>
                Number was:
                {userNumber}
            </BodyText>
            <Button title="NEW GAME" onPress={onRestart} />
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
