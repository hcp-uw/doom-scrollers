import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { InputField } from '@/components/InputField';
import CurveTextHeader from '@/components/CurveTextHeader';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Song } from '@/types';
import { getLikedSongs, searchSongs } from '@/services/songs';
import TrackCard from '@/components/TrackCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [queryTarget, setQueryTarget] = useState<'users' | 'songs'>('songs');

  const updateSearchResults = async (query: string) => {
    if (queryTarget === 'songs') {
      const newSongs = await searchSongs(query);
      setSearchResults(newSongs);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
          }}
        />
      </View>
      <ScrollView style={{ width: '90%', backgroundColor: 'black' }}>
        {searchResults.map((song) => {
          return <TrackCard rawTrack={song} key={song.trackID} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
