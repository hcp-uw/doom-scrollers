import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Song, SpotifyTrack } from '../types';
import { hydrateTrackInfo } from '@/services/spotify';
import { useSpotify } from '@/hooks/useSpotify';
interface TrackCardProps {
  rawTrack: Song;
}

const TrackCard: React.FC<TrackCardProps> = ({ rawTrack }) => {
  const { accessToken } = useSpotify();
  const [track, setTrack] = useState<SpotifyTrack>();

  useEffect(() => {
    if (!accessToken) return;
    hydrateTrackInfo(rawTrack.trackID, accessToken).then((track) =>
      setTrack(track)
    );
  }, [accessToken]);

  if (!track) return null;

  const artistNames = track.artists.map((artist) => artist.name).join(', ');

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: track.album.images?.[0]?.url }}
        style={styles.albumCover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.trackName} numberOfLines={1}>
          {track.name}
        </Text>
        <Text style={styles.artistNames} numberOfLines={1}>
          {artistNames}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  albumCover: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  trackName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistNames: {
    color: '#B3B3B3',
    fontSize: 14,
  },
});

export default TrackCard;
