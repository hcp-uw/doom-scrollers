import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface SpinnerProps {
  style?: StyleProp<ViewStyle>;
}

export const Spinner: React.FC<SpinnerProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={'large'} color={'#a568ff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
