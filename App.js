import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; // prolong the default loading screen to stay active until certain task is done eg font loading

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => (
    Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
);

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}// fetchFonts must return a promise and must be async
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHanler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numofRounds) => {
    setGuessRounds(numofRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = (
    <GameOverScreen
    roundsNumber={guessRounds}
    userNumber={userNumber}
    onRestart={configureNewGameHanler}
    />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  }
});
