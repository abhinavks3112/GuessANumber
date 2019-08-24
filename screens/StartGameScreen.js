import React, { useState } from 'react';
import {
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [hasUserConfirmed, setHasUserConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        // Replace anything other than numbers to empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

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
            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
        );
    }

    return (
        // Close keyboard on touch
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screenStyle}>
                <TitleText style={styles.titleStyle}>Select a New Game!</TitleText>
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
                        <View style={styles.buttonStyle}>
                            <Button title="RESET" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.buttonStyle}>
                            <Button title="CONFIRM" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        width: 300,
        maxWidth: '90%',
        alignItems: 'center'
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    buttonStyle: {
        width: '40%',
        margin: 10
    },
    inputStyle: {
        width: 50,
        textAlign: 'center'
    },
    confirmSummaryStyle: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
