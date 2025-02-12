import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSongs } from '@/hooks/useSongs';
import { playTrack } from '@/services/player';
import { useSpotify } from '@/hooks/useSpotify';
import { useRef } from 'react';
import DeviceSelection from '@/components/DeviceSelection';
import { useDevices } from '@/hooks/useDevices';
import SongView from '@/components/SongView';

const Index = () => {
  const { songs, isLoading, fetchSongs } = useSongs();
  const { accessToken } = useSpotify();

  const currentSong = useRef<string | null>(null);

  const { devices, selectedDevice, setSelectedDevice, fetchDevices } =
    useDevices(accessToken!);

  return (
    <SafeAreaView style={styles.background}>
      {selectedDevice ? (
        <FlatList
          data={songs}
          renderItem={({ item }) => (
            <SongView
              accessToken={accessToken!}
              songId={item.trackID}
              genre={item.genre}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={Dimensions.get('window').height}
          onViewableItemsChanged={({ viewableItems }) => {
            if (
              viewableItems[0].isViewable &&
              currentSong.current !== viewableItems[0].item.trackID
            ) {
              currentSong.current = viewableItems[0].item.trackID;
              playTrack(currentSong.current, accessToken!, selectedDevice.id);
            }
          }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 25,
          }}
          onEndReached={() => {
            fetchSongs();
          }}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Select a device please</Text>
        </View>
      )}
      <DeviceSelection
        devices={devices}
        selectedDevice={selectedDevice}
        onSelect={setSelectedDevice}
        refreshDevices={fetchDevices}
      />
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
