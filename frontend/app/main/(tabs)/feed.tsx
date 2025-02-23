import { getFeed } from '@/services/friends';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Feed = () => {
  useEffect(() => {
    const loadFeed = async () => {
      getFeed();
    };
    loadFeed();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
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
