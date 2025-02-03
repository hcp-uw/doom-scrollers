import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import GenreCard from '@/components/GenreCard';
import { Header } from '@/components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { Genre } from '@/types';
import { getUserGenres } from '@/services/genre';

const Profile = () => {
  const { user, error, isLoading } = useAuth();
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchGenres = async () => {
    const userGenres = await getUserGenres();
    setGenres(userGenres);
  };

  useEffect(() => {
    fetchGenres();
  });


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
          source={{ uri: 'https://i.pravatar.cc/300' }}
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
          title="Account Settings"
        />
        <Button
          style={{
            width: '90%',
          }}
          title="Sign Out"
        />
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
  footer: {
    marginTop: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});

export default Profile;
