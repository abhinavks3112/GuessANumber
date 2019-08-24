import React from 'react';
import {
 View,
 StyleSheet,
 Button,
 Image
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOverScreen = (props) => {
    const { roundsNumber, userNumber, onRestart } = props;
    return (
        <View style={styles.screenStyle}>
            <TitleText>The Game is Over!!!</TitleText>
            <View style={styles.imageContainerStyle}>
                <Image
                fadeDuration={1000}
                source={require('../assets/success.png')}
                resizeMode="cover"
                style={styles.imageStyle}
                />
            </View>
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
    },
    imageContainerStyle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden', // any child which will go outside boundry will be cut off
        marginVertical: 30
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;
