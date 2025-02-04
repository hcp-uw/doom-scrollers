import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSongs } from '@/hooks/useSongs';
import { Button } from '@/components/Button';
import { playTrack } from '@/services/player';
import { useSpotify } from '@/hooks/useSpotify';
const Index = () => {
  const { songs, isLoading } = useSongs();
  const { accessToken } = useSpotify();
  if (isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        {songs.map((song) => (
          <Button
            key={song.id}
            title={song.trackID}
            onPress={() => {
              playTrack(song.trackID, accessToken!, '');
            }}
          />
        ))}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default Index;
