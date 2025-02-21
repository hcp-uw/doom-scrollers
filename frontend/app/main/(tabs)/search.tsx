import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { InputField } from '@/components/InputField';
import CurveTextHeader from '@/components/CurveTextHeader';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Song, User } from '@/types';
import { getLikedSongs, searchSongs } from '@/services/songs';
import TrackCard from '@/components/TrackCard';
import { searchUsers } from '@/services/user';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { sendFriendRequest } from '@/services/friendRequests';

export default function SearchScreen() {
  const [songSearchResults, setSongSearchResults] = useState<Song[]>([]);
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
  const [queryTarget, setQueryTarget] = useState<'users' | 'songs'>('songs');
  const { user } = useAuth();

  const updateSearchResults = async (query: string) => {
    if (queryTarget === 'songs') {
      const newSongs = await searchSongs(query);
      setSongSearchResults(newSongs);
    } else {
      const newUsers = await searchUsers(query);
      setUserSearchResults(newUsers);
    }
  };

  const handleSearch = (query: string) => {
    updateSearchResults(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CurveTextHeader additionalStyles={{ borderBottomWidth: 0 }} />
      <InputField
        label=""
        placeholder={`Search ${queryTarget}...`}
        onChange={handleSearch}
        style={{ marginTop: 10, width: '90%' }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          gap: 5,
          marginBottom: 3,
        }}
      >
        <Button
          title="Users"
          style={{
            width: '49%',
            borderWidth: queryTarget === 'users' ? 0 : 1,
            borderColor: 'white',
          }}
          kind={queryTarget === 'users' ? 'primary' : 'secondary'}
          onPress={() => {
            setQueryTarget('users');
            setSongSearchResults([]);
          }}
        />
        <Button
          title="Songs"
          style={{
            width: '49%',
            borderWidth: queryTarget === 'songs' ? 0 : 1,
            borderColor: 'white',
          }}
          kind={queryTarget === 'songs' ? 'primary' : 'secondary'}
          onPress={() => {
            setQueryTarget('songs');
            setUserSearchResults([]);
          }}
        />
      </View>
      <ScrollView
        style={{ width: '95%', backgroundColor: 'black', marginTop: 20 }}
      >
        {queryTarget === 'songs' ? (
          songSearchResults.map((song) => {
            return <TrackCard rawTrack={song} key={song.trackID} />;
          })
        ) : (
          <UserListView users={userSearchResults} currentUserId={user!.id} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const UserListView: React.FC<{
  users: User[];
  currentUserId: number;
}> = ({ users, currentUserId }) => {
  const handleFriendRequest = async (id: number) => {
    const successValue = await sendFriendRequest(id);
  };

  return (
    <>
      {users
        .filter((value) => value.id !== currentUserId)
        .map((user) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
                backgroundColor: '#1A1A1A',
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: 4,
                marginHorizontal: 8,
                marginBlock: 5,
                gap: 15,
                justifyContent: 'space-between',
              }}
              key={user.id}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                }}
              >
                <Image
                  source={{ uri: user.profilePictureURL }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    borderWidth: 3,
                    borderColor: '#a568ff',
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'LexendDeca_500Medium',
                    fontSize: 17,
                  }}
                >
                  {user.username}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  marginRight: 10,
                }}
                onPress={() => {
                  handleFriendRequest(user.id);
                }}
              >
                <AntDesign name="adduser" size={22} color="white" />
              </TouchableOpacity>
            </View>
          );
        })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
