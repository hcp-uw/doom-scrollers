import { useTrack } from '@/hooks/useTrack';
import { shortenString } from '@/utils/misc';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { likeTrack, dislikeTrack } from '@/services/songs';
import { Genre } from '@/types';

type SongViewProps = {
  songId: string;
  accessToken: string;
  genre: Genre;
};

const SongView: React.FC<SongViewProps> = ({ songId, accessToken, genre }) => {
  const { track, isLoading } = useTrack(songId, genre, accessToken);

  const [status, setStatus] = useState<'liked' | 'disliked' | null>(null);

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
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setStatus(status === 'disliked' ? null : 'disliked');
              dislikeTrack(songId);
            }}
          >
            <FontAwesome
              name={status === 'disliked' ? 'thumbs-down' : 'thumbs-o-down'}
              size={32}
              color="#a568ff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setStatus(status === 'liked' ? null : 'liked');
              likeTrack(songId);
            }}
          >
            <MaterialIcons
              name={status === 'liked' ? 'favorite' : 'favorite-border'}
              size={32}
              color="#a568ff"
            />
          </TouchableOpacity>
        </View>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 30,
  },
  iconButton: {
    marginHorizontal: 10,
    backgroundColor: '#272424',
    padding: 10,
    borderRadius: 10,
  },
});

export default SongView;
