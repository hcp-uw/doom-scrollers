import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
}
export const Header: React.FC<Props> = ({ text, style }) => {
  return (
    <Text
      style={{
        ...styles.header,
        ...(style as object),
      }}
    >
      {text}
    </Text>
  );
};
const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
  },
});
