import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import GenreCard from '@/components/GenreCard';
import { Header } from '@/components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { Genre } from '@/types';
import { getUserGenres } from '@/services/genre';
import { useRouter } from 'expo-router';
import { AccountSettingsModal } from '@/components/AccountSettingsModal';
import { logout } from '@/services/auth/logout';
import FriendRequestModal from '@/components/FriendRequestModal';

const Profile = () => {
  const { user, error, isLoading, fetchUser } = useAuth();
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const [accountSettingsModalVisible, setAccountSettingsModalVisible] =
    useState(false);
  const fetchGenres = async () => {
    const userGenres = await getUserGenres();
    setGenres(userGenres);
  };
  const [isFriendRequestModalVisible, setIsFriendRequestModalVisible] =
    useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: user?.profilePictureURL }}
          style={styles.profilePicture}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 35,
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
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}
        >
          <Header
            text="My Genres"
            style={{
              fontSize: 20,
              marginLeft: 10,
            }}
          />
          <AntDesign name="edit" size={24} color="white" />
        </View>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <ScrollView horizontal>
          {genres.map((genre) => (
            <GenreCard genre={genre.value} key={genre.id} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          style={{
            width: '90%',
          }}
          onPress={() => router.navigate('/likedSongs')}
          title="Liked Songs"
        />
        <Button
          style={{
            width: '90%',
          }}
          title="Account Settings"
          onPress={() => setAccountSettingsModalVisible(true)}
        />
        <AccountSettingsModal
          visible={accountSettingsModalVisible}
          onClose={() => {
            setAccountSettingsModalVisible(false);
            fetchUser();
          }}
          username={user?.username ?? ''}
        />
        <Button
          style={{
            width: '90%',
          }}
          title="Sign Out"
          onPress={() => {
            logout();
            router.dismissAll();
            router.replace('/');
          }}
        />
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, right: 30 }}
        onPress={() => setIsFriendRequestModalVisible(true)}
      >
        <AntDesign name="bells" size={24} color="white" />
      </TouchableOpacity>
      <FriendRequestModal
        onClose={() => setIsFriendRequestModalVisible(false)}
        visible={isFriendRequestModalVisible}
      />
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
  footer: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

export default Profile;
