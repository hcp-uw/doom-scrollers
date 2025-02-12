import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import { InputField } from '@/components/InputField';
import CurveTextHeader from '@/components/CurveTextHeader';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
// This will be replaced with actual song data type
interface Song {
  id: string;
  title: string;
  artist: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);

  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement actual search logic here
    // This is just mock data for now
    const mockResults: Song[] = [
      { id: '1', title: 'Song 1', artist: 'Artist 1' },
      { id: '2', title: 'Song 2', artist: 'Artist 2' },
    ];
    setSearchResults(mockResults);
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <View style={styles.songItem}>
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.artistName}>{item.artist}</Text>
    </View>
  );

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
        style={{ width: '90%', marginTop: 5 }}
        onPress={() => {
          router.push('/likedSongs');
        }}
      />
      <FlatList
        data={searchResults}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  resultsList: {
    flex: 1,
  },
  songItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker separation line
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff', // White text
  },
  artistName: {
    fontSize: 14,
    color: '#a855f7', // Purple text for artist name
  },
});
