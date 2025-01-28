import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
interface Props {
  label: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  kind?: 'text' | 'password';
}
export const InputField: React.FC<Props> = ({
  label,
  placeholder,
  style,
  kind,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...(style as object),
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={kind === 'password'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'white',
  },
});
