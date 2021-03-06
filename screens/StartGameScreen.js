import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView // To avoid overlapping keyboard over our display
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [hasUserConfirmed, setHasUserConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = (inputText) => {
        // Replace anything other than numbers to empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    /* Using useEffect to add event listener otherwise a new event listener will be
    generated on each render, but in this case we can use a cleanup function to first
    remove any previous event listener and then add a new one so that only one instance
    of event listener remain in any point of time */
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);
        return (() => {
            Dimensions.removeEventListener('change', updateLayout);
        });
    });

    const resetInputHandler = () => {
        setEnteredValue('');
        setHasUserConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber)
            || chosenNumber <= 0
            || chosenNumber > 99
            ) {
            Alert.alert(
                'Invalid number',
                'Number has to be number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setHasUserConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (hasUserConfirmed) {
        confirmedOutput = (
        <Card style={styles.confirmSummaryStyle}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                {/* Close keyboard on touch */}
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screenStyle}>
                        <TitleText style={styles.titleStyle}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                            style={styles.inputStyle}
                            blurOnSubmit
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue}
                            />
                            <View style={styles.buttonContainerStyle}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="RESET" onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="CONFIRM" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        maxWidth: '90%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    /* buttonStyle: {
        // width: '40%',
        // It gives us absolute width and not with respect to parent
        // regardless from where its called
        // Setting dimension here only runs once so need it to put somewhere,
        // where it can recalculate each time orientation changes
        width: Dimensions.get('window').width / 4,
        margin: 10
    }, */
    inputStyle: {
        width: 50,
        textAlign: 'center'
    },
    confirmSummaryStyle: {
        width: '80%',
        backgroundColor: 'white',
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
