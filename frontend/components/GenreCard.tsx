import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GenreCard: React.FC<{ genre: string }> = ({ genre }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{genre}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#272424',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
});

export default GenreCard;
