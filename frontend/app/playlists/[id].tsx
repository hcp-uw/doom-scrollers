import { useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { getSpecificPlaylist } from '@/services/playlist';
import { useState, useEffect } from 'react';
import { Playlist, Song, SpotifyTrack } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { hydrateTrackInfo } from '@/services/spotify';
import { useSpotify } from '@/hooks/useSpotify';

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams();

  const [playlist, setPlaylist] = useState<Playlist>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlist = await getSpecificPlaylist(parseInt(id as string));
      console.log(playlist.songs);
      setPlaylist(playlist);
    };
    fetchPlaylist();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}
    >
      {playlist && (
        <ScrollView style={{ width: '100%', height: '100%' }}>
          {/* Header Section */}
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              {playlist.name}
            </Text>
            <Text style={{ color: '#888', marginBottom: 16 }}>
              Created By {user?.username} • {playlist?.songs.length} songs
            </Text>
          </View>

          {/* Songs List */}
          <View style={{ padding: 20, marginTop: -40 }}>
            {/* Placeholder song items */}
            {playlist.songs.map((song, idx) => (
              <SongItem key={idx} rawSong={song} idx={idx + 1} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const SongItem = ({ rawSong, idx }: { rawSong: Song; idx: number }) => {
  const [song, setSong] = useState<SpotifyTrack>();
  const { accessToken } = useSpotify();

  useEffect(() => {
    const fetchSong = async () => {
      const song = await hydrateTrackInfo(
        rawSong.trackID,
        rawSong.genre,
        accessToken!
      );
      console.log(song);
      setSong(song);
    };
    fetchSong();
  }, []);

  return (
    <View
      key={idx}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#333',
        marginBottom: 10,
      }}
    >
      <Text style={{ color: '#888', marginRight: 12 }}>{idx}</Text>
      <Image
        source={{ uri: song?.album.images[0].url }}
        style={{ width: 50, height: 50, marginRight: 12, borderRadius: 10 }}
      />
      <View>
        <Text style={{ color: 'white', fontSize: 16 }}>{song?.name}</Text>
        <Text style={{ color: '#888' }}>
          {song?.artists.map((artist) => artist.name).join(', ')}
        </Text>
      </View>
    </View>
  );
};
