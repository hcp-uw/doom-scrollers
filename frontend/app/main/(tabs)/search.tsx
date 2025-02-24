import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { InputField } from '@/components/InputField';
import CurveTextHeader from '@/components/CurveTextHeader';
import { Button } from '@/components/Button';
import { Song, User } from '@/types';
import { searchSongs } from '@/services/songs';
import TrackCard from '@/components/TrackCard';
import { searchUsers } from '@/services/user';
import { useAuth } from '@/hooks/useAuth';
import { sendFriendRequest } from '@/services/friendRequests';
import Toast from 'react-native-toast-message';
import { UserView } from '@/components/UserView';

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
          <UserListView users={userSearchResults} currentUser={user!} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const UserListView: React.FC<{
  users: User[];
  currentUser: User;
}> = ({ users, currentUser }) => {
  const handleFriendRequest = async (id: number) => {
    const successValue = await sendFriendRequest(id);
    if (successValue) {
      Toast.show({
        type: 'success',
        text1: 'Friend request sent!',
      });
    }
  };

  const userFriends = new Set(currentUser.friends.map((friend) => friend.id));

  return (
    <>
      {users
        .filter((value) => value.id !== currentUser.id)
        .map((user) => {
          return (
            <UserView
              key={user.id}
              user={user}
              handleFriendRequest={
                userFriends.has(user.id) ? undefined : handleFriendRequest
              }
            />
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
