import { useTrack } from '@/hooks/useTrack';
import { shortenString } from '@/utils/misc';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

type SongViewProps = {
  songId: string;
  accessToken: string;
};

const SongView: React.FC<SongViewProps> = ({ songId, accessToken }) => {
  const { track, isLoading } = useTrack(songId, accessToken);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {track?.album?.images?.[0]?.url && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: track.album.images[0].url }}
              style={styles.albumImage}
            />
          </View>
        )}
        <Text style={styles.title}>{shortenString(track?.name!, 25)}</Text>
        {track?.artists.map((artist) => (
          <Text style={styles.artist} key={artist.id}>
            {artist.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: '#a567ff',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  albumImage: {
    width: 300,
    height: 300,
    borderRadius: 4,
  },
  artist: {
    color: 'white',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});

export default SongView;
