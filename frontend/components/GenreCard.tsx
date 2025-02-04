import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GenreCard: React.FC<{
  genre: string;
  selected?: boolean;
  onPress?: () => void;
}> = ({ genre, selected = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected ? styles.selectedCard : styles.unselectedCard,
      ]}
      disabled={!onPress}
      onPress={onPress}
    >
      <Text style={styles.text}>{genre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  selectedCard: {
    backgroundColor: '#a568ff',
  },
  unselectedCard: {
    backgroundColor: '#272424',
  },
});

export default GenreCard;
