import { useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header Section */}
        <View style={{ padding: 20 }}>
          <Image
            source={{ uri: 'https://placeholder.com/350' }}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 8,
            }}
          >
            Playlist Name, {id}
          </Text>
          <Text style={{ color: '#888', marginBottom: 16 }}>
            Created by • 23 songs • 1hr 24min
          </Text>
        </View>

        {/* Songs List */}
        <View style={{ padding: 20 }}>
          {/* Placeholder song items */}
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 0.5,
                borderBottomColor: '#333',
              }}
            >
              <Text style={{ color: '#888', marginRight: 12 }}>{item}</Text>
              <View>
                <Text style={{ color: 'white', fontSize: 16 }}>Song Name</Text>
                <Text style={{ color: '#888' }}>Artist Name</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
