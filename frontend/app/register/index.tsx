import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { register } from '@/services/auth/register';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async () => {
    setError(undefined);
    setIsLoading(true);
    const [_, error] = await register(username, password);

    if (error) {
      setError(error.error);
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Header
          text="Register"
          style={{
            marginBottom: 20,
          }}
        />
        <InputField
          label="Username"
          placeholder="Username"
          style={{
            marginBottom: 10,
            width: '80%',
          }}
          onChange={setUsername}
        />
        <InputField
          label="Password"
          placeholder="Password"
          style={{
            marginBottom: 20,
            width: '80%',
          }}
          kind="password"
          onChange={setPassword}
        />
        <SpotifyAuthButton
          style={{
            marginBottom: 20,
          }}
        />
        <Button
          style={{
            paddingLeft: 80,
            paddingRight: 80,
            marginBottom: 20,
          }}
          title="Register"
          onPress={registerUser}
        />
        {isLoading && <Spinner />}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    color: 'white',
  },
  errorText: {
    color: '#FA8072',
    fontSize: 16,
  },
});

export default Index;
