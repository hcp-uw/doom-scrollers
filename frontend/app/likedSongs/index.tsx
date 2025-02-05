import CurveTextHeader from '@/components/CurveTextHeader';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LikedSongsSVG from '@/assets/svgs/likedSongsPage.svg';
import { Header } from '@/components/Header';
import { getLikedSongs } from '@/services/songs';
import { useEffect, useState } from 'react';
import { Song } from '@/types';
import TrackCard from '@/components/TrackCard';

const Index = () => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLikedSongs().then((songs) => {
      setLikedSongs(songs);
      setIsLoading(false);
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
      <LikedSongsSVG style={{ position: 'absolute', top: 0, left: 0 }} />
      <ScrollView>
        {likedSongs.map((song) => (
          <TrackCard key={song.id} rawTrack={song} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
