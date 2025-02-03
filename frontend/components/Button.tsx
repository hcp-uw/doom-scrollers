import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  kind?: 'primary' | 'secondary';
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  kind = 'primary',
}) => {
  const buttonStyle = kind === 'primary' ? styles.primary : styles.secondary;

  return (
    <TouchableOpacity
      style={{
        ...buttonStyle,
        ...(style as object),
      }}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#a568ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'LexendDeca_500Medium',
  },
  secondary: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
