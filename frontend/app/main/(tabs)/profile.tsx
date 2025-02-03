import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { user, error, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  console.log(user?.createdAt);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.profilePicture}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={[
            styles.usernameText,
            {
              marginBottom: 5,
            },
          ]}
        >
          @{user?.username}
        </Text>
        <Text style={styles.memberSinceText}>
          member since {user?.createdAt.getFullYear()}
        </Text>
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
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    borderColor: '#a568ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'LexendDeca_500Medium',
  },
  usernameText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'LexendDeca_700Bold',
  },
  memberSinceText: {
    color: '#a568ff',
    fontSize: 16,
    fontFamily: 'LexendDeca_500Medium',
    fontStyle: 'italic',
  },
});

export default Profile;
