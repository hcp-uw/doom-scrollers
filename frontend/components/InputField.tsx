import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
interface Props {
  label?: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  kind?: 'text' | 'password';
  onChange?: (text: string) => void;
}
export const InputField: React.FC<Props> = ({
  label,
  placeholder,
  style,
  kind,
  onChange,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...(style as object),
      }}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={kind === 'password'}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#a568ff',
    marginBottom: 10,
    fontFamily: 'LexendDeca_500Medium',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'white',
    fontFamily: 'LexendDeca_400Regular',
  },
});
