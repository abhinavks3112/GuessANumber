import React, { useState, useRef, useEffect } from 'react';
import {
 View,
 StyleSheet,
 Alert,
 ScrollView,
 FlatList,
 Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return randomNumber;
};

// for ScrollView
/* const renderListItem = (value, numofRound) => (
        <View key={value} style={styles.listItemStyle}>
            <BodyText>
                #
                {numofRound}
            </BodyText>
            <BodyText>{value}</BodyText>
        </View>
); */

/* For FlatList, itemData is implicit and default argument, hence
needs to placed as last argument, any other argument that we expects
must be placed before the default argument */
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItemStyle}>
        <BodyText>
            #
            {listLength - itemData.index}
        </BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);


const GameScreen = (props) => {
    const { userChoice, onGameOver } = props;

    const initialGuess = generateRandomBetween(1, 100, userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);// for flatlist

     /* The difference to store in ref than state is that component doesn't re-initialize
        on each re-render but will retain value that we have changes of it elsewhere
        eg. somewhere down below when we change its value  */
    // useRef allows to define value which survives component re-render
    const currentLow = useRef(1);
    // useRef allows to define value which survives component re-render
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        // Adding past guesses to front of list so that recent one always show on top
        // setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
        setPastGuesses((curPastGuesses) => [
            nextNumber.toString(), ...curPastGuesses
        ]); // for flatlist
    };

    return (
        <View style={styles.screenStyle}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.cardStyle}>
                <View style={styles.buttonStyle}>
                   <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                   </MainButton>
                </View>
                <View style={styles.buttonStyle}>
                   <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                   </MainButton>
                </View>
            </Card>
            {/* To control the list items style in Scroll View,
            we need to add it to encapsulating view,
            rather than to ScrollView or its list item */}
            <View style={styles.listContainerStyle}>
                {/* To add styles to ScrollView we cannot directly use styles but we
                must use ContentContainerStyle prop, same for flatList */}
                {/* <ScrollView contentContainerStyle={styles.listStyle}>
                    {pastGuesses.map(
                        (guess, index) => renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                 {/* Flatlist expects a string in key and not a number, so
                 we need to convert our number to string */}
                <FlatList
                /* Using only style instead of contentContainerStyle allows eg. to adjust margin
                inside the list but not align content inside the list */
                contentContainerStyle={styles.listStyle}
                data={pastGuesses}
                /* ItemData will be passed by default, other argument must be passed by binding
                it and also this is always the first argument or null,second argument we add
                here will be the first argument we receive since ItemData is default and default
                argument are always at last position, we don't have access to index here but
                ItemData does, along with data, it contain index as well */
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                /* Flatlist expects an array of objects with key property since we only have
                an array, we can override the default beahviour by providing a key using
                KeyExtractor */
                keyExtractor={(guess) => guess}
                />
            </View>
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
        maxWidth: '80%',
        justifyContent: 'space-around',
       // marginTop: 20
       marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    },
    buttonStyle: {
        textAlign: 'center'
    },
    listContainerStyle: {
        flex: 1,
        width: '80%'
    },
    listStyle: {
        /* The flex-grow property specifies how much the item will grow
        relative to the rest of the flexible items inside the same container.
        Note: If the element is not a flexible item, the flex-grow property
        has no effect.
        Using only flex=1, when leaving scrolling, last/first item won't be visible,
        it will jump back */
        flexGrow: 1, // same as flex, but more flexible, best for scroll view
        justifyContent: 'flex-end'
    },
    listItemStyle: {
        borderColor: Colors.primary,
        borderWidth: 2,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default GameScreen;
