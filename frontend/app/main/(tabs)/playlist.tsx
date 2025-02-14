import { usePlaylist } from '@/hooks/usePlaylist';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
export default function Playlist() {
  const { playlists } = usePlaylist();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Playlists</Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'white',
          width: '100%',
          marginBottom: 20,
        }}
      />
      <ScrollView>
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistCard}
            onPress={() => {
              console.log(`/playlists/${playlist.id}`);
              router.push(`/playlists/${playlist.id}`);
            }}
          >
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName}>{playlist.name}</Text>
              <Text style={styles.playlistDetails}>
                {playlist.songs?.length || 0} songs
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 15,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  playlistCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  playlistInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  playlistDetails: {
    color: '#888888',
  },
});
