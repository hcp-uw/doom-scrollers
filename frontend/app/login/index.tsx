import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { SpotifyAuthButton } from '@/components/SpotifyAuthButton';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { useRouter } from 'expo-router';
import { validateSpotifyCredentials } from '@/utils/spotify';
import { CheckBox } from 'react-native-elements';
import { login } from '@/services/auth/login';
import LoginPageSVG from '@/assets/svgs/loginPage.svg';
const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const loginUser = async () => {
    await validateSpotifyCredentials();
    setError(undefined);
    setIsLoading(true);
    const [_, error] = await login(username, password);

    setIsLoading(false);
    if (error) {
      setError(error.error);
      return;
    }

    router.navigate('/main');
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <Header text="login" style={{ maxWidth: '40%' }} />
      </View>
      <View style={styles.container}>
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
        <View style={styles.optionsContainer}>
          <CheckBox
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            checkedColor="white"
            title="Remember me"
            containerStyle={{
              backgroundColor: 'black',
              borderWidth: 0,
              padding: 0,
              margin: 0,
            }}
            textStyle={{
              color: '#a568ff',
              marginLeft: 3,
            }}
          />
          <Text style={[styles.optionText, styles.forgotPassword]}>
            Forgot Password?
          </Text>
        </View>
        {isLoading && <Spinner style={{ marginBottom: 20 }} />}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
        <Button
          style={{
            paddingLeft: 80,
            paddingRight: 80,
            marginBottom: 5,
            width: '80%',
          }}
          title="Sign In"
          onPress={loginUser}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => router.navigate('/register')}
          >
            Register
          </Text>
        </Text>
      </View>
      <LoginPageSVG />
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
    color: 'white',
  },
  errorText: {
    color: '#FA8072',
    fontSize: 16,
    marginBottom: 20,
  },
  headerContainer: {
    marginLeft: 40,
    marginBottom: 30,
    marginTop: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  optionText: {
    color: 'white',
    fontSize: 14,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPassword: {
    textDecorationLine: 'underline',
  },
  footerContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'LexendDeca_5 00Medium',
  },
  footerLink: {
    color: '#a568ff',
    fontSize: 16,
    fontFamily: 'LexendDeca_500Medium',
  },
});

export default Index;
