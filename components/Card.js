import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ style, children }) => (
    <View style={{ ...styles.cardStyle, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
 cardStyle: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: 'white',
    elevation: 10,
    padding: 20,
    borderRadius: 10
 }
});

export default Card;
