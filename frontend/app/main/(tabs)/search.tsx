import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
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

  const router = useRouter();

  const updateSearchResults = async (query: string) => {
    const newSongs = await searchSongs(query);
    setSearchResults(newSongs);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateSearchResults(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CurveTextHeader additionalStyles={{ borderBottomWidth: 0 }} />
      <InputField
        label=""
        placeholder="Search songs..."
        onChange={handleSearch}
        style={{ marginTop: 10, width: '90%' }}
      />
      <Button
        title="Liked Songs"
        style={{ width: '90%', marginTop: 5, marginBottom: 10 }}
        onPress={() => {
          router.push('/likedSongs');
        }}
      />
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
