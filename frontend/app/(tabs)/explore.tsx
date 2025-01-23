import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { TEST } from 'react-native-dotenv';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <Text>Tab Two</Text>
      <Button
        title="asdf"
        onPress={() => {
          console.log(TEST);
        }}
      />
    </SafeAreaView>
  );
}
