import SongView from '@/components/SongView';
import { useFeed } from '@/hooks/useFeed';
import { useSpotify } from '@/hooks/useSpotify';
import { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Feed = () => {
  const { songs } = useFeed();
  const { accessToken } = useSpotify();

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {accessToken &&
          (songs.length > 0 ? (
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <SongView
                  accessToken={accessToken!}
                  songId={item.trackID}
                  genre={item.genre}
                  username={item.username}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={Dimensions.get('window').height}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 25,
              }}
            />
          ) : (
            <Text
              style={{
                color: 'white',
              }}
            >
              No feed to load
            </Text>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
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
  horizontalLine: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
    marginBottom: 15,
  },
});

export default Feed;
