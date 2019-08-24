import React from 'react';
import {
 View,
 Text,
 StyleSheet,
 Button,
 Image
} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

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
            <View style={styles.resultSummaryStyle}>
                <BodyText style={styles.resultText}>
                {/* For nested Text, style is passed down,
                but the same doesn't happen in View,
                also Text doesn't use flexbox in
                React, view does, but text has its own positioning sytem
                which makes it to wrap the text to other line if it doesn't
                fit in one line */}
                    Your phone needed
                    {' '}
                    <Text style={styles.highlight}>
                    {roundsNumber}
                    </Text>
                    {' '}
                    rounds to guess the number
                    {' '}
                    <Text style={styles.highlight}>
                    {userNumber}
                    </Text>
                </BodyText>
            </View>
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
    },
    resultSummaryStyle: {
        marginHorizontal: 30,
        marginBottom: 20
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
