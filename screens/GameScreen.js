import React, { useState, useRef, useEffect } from 'react';
import {
 View,
 StyleSheet,
 Button,
 Alert
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

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
    const { userChoice, onGameOver } = props;

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, userChoice)
    );
    const [numRounds, setNumRounds] = useState(0);

     /* The difference to store in ref than state is that component doesn't re-initialize
        on each re-render but will retain value that we have changes of it elsewhere
        eg. somewhere down below when we change its value  */
    // useRef allows to define value which survives component re-render
    const currentLow = useRef(1);
    // useRef allows to define value which survives component re-render
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(numRounds);
        }
    }, [currentGuess, userChoice, onGameOver]);
    // above:notified as dependencies so that useEffect only re-run,
    // when there is change in either of these values

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < userChoice)
        || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Don\' Lie!!', 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            /* The difference to store in ref than state
            is that component doesn't re-render when we change value */
            // references generated by useRef are objects
            // with current property which stores actual value
            currentHigh.current = currentGuess;
        } else {
            // references generated by useRef are objects with
            // current property which stores actual value
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        setNumRounds((curRounds) => curRounds + 1);
    };

    return (
        <View style={styles.screenStyle}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.cardStyle}>
                <View style={styles.buttonStyle}>
                   <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        LOWER
                   </MainButton>
                </View>
                <View style={styles.buttonStyle}>
                   <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        GREATER
                   </MainButton>
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
        width: 400,
        maxWidth: '90%',
        justifyContent: 'space-around',
        marginTop: 20
    },
    buttonStyle: {
        width: '48%',
        textAlign: 'center'
    }
});

export default GameScreen;
