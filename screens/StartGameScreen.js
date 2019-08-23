import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = () => {
    return (
        <View style={styles.screenStyle}>
            <Text style={styles.titleStyle}>Select a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.inputStyle} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                <View style={styles.buttonContainerStyle}>
                    <View style={styles.buttonStyle}>
                        <Button title="RESET" onPress={() => {}} color={Colors.accent} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button title="CONFIRM" onPress={() => {}} color={Colors.primary} />
                    </View>
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
    }
});

export default StartGameScreen;
