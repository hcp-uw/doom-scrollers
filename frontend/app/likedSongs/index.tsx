import CurveTextHeader from '@/components/CurveTextHeader';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LikedSongsSVG from '@/assets/svgs/likedSongsPage.svg';
import { Header } from '@/components/Header';
import { getLikedSongs } from '@/services/songs';
import { useEffect, useState } from 'react';
import { Genre, Song } from '@/types';
import TrackCard from '@/components/TrackCard';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';

const Index = () => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allGenres, setAllGenres] = useState<
    { value: string; label: string }[]
  >([]);
  const [genreSelection, setGenreSelection] = useState<string[]>([]);

  useEffect(() => {
    getLikedSongs().then((songs) => {
      setLikedSongs(songs);
      setIsLoading(false);
      const genres = [{ value: 'all' }, ...songs.map((song) => song.genre)];
      const uniqueGenres = [...new Set(genres.map((genre) => genre.value))];
      setAllGenres(
        uniqueGenres.map((genre) => ({ value: genre, label: genre }))
      );
    });
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
      <CurveTextHeader />
      <Header
        text="Liked Songs"
        style={{
          marginTop: 20,
          fontSize: 22,
          marginLeft: 20,
          fontFamily: 'Inter_700Bold',
          marginBottom: 20,
        }}
      />
      <Dropdown
        data={allGenres}
        labelField="value"
        valueField="value"
        placeholder="Select Genre"
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{ color: 'white' }}
        itemContainerStyle={{
          backgroundColor: '#1A1A1A',
          borderWidth: 0.3,
          borderColor: '#272727',
        }}
        activeColor="#a567ff"
        containerStyle={{ backgroundColor: '#1A1A1A', borderWidth: 0 }}
        onChange={(item) => {
          setGenreSelection([item.value]);
        }}
        renderLeftIcon={() => (
          <MaterialIcons name="library-music" size={24} color="#a567ff" />
        )}
      />
      <ScrollView>
        {likedSongs
          .filter((song) =>
            genreSelection.length > 0 && genreSelection[0] !== 'all'
              ? genreSelection.includes(song.genre.value)
              : true
          )
          .map((song) => (
            <TrackCard key={song.id} rawTrack={song} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#a567ff',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1A1A1A',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#808080',
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Index;
