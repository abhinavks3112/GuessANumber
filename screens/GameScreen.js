import React, { useState, useRef } from 'react';
import {
 View,
 Text,
 StyleSheet,
 Button,
 Alert
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return randomNumber;
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice)
        ||  (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\' Lie!!', 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
    };

    return (
        <View style={styles.screenStyle}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.cardStyle}>
                <View style={styles.buttonStyle}>
                   <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                </View>
                <View style={styles.buttonStyle}>
                   <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    cardStyle: {
        flexDirection: 'row',
        width: 300,
        maxWidth: '90%',
        justifyContent: 'space-around',
        marginTop: 20
    },
    buttonStyle: {
        width: '40%',
        marginHorizontal: 10
    }
});

export default GameScreen;