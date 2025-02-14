import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Playlist } from '@/types';
import { Button } from './Button';
import { createPlaylist } from '@/services/playlist';
import { usePlaylist } from '@/hooks/usePlaylist';

interface PlaylistSelectionModalProps {
  onSelect: (playlist: Playlist) => void;
  visible: boolean;
  onClose: () => void;
}

const PlaylistSelectionModal: React.FC<PlaylistSelectionModalProps> = ({
  onSelect,
  visible,
  onClose,
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { playlists, isLoading, fetchPlaylists } = usePlaylist();

  const handleSelect = (playlist: Playlist) => {
    onSelect(playlist);
    onClose();
  };

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim()) {
      const playlist = await createPlaylist(newPlaylistName);
      setNewPlaylistName('');
      setIsCreating(false);
      fetchPlaylists();
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Playlist</Text>

          {isCreating ? (
            <View style={styles.createContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter playlist name"
                placeholderTextColor="#808080"
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
              />
              <Button
                title="Create"
                onPress={handleCreatePlaylist}
                style={{ marginVertical: 10 }}
              />
              <Button
                title="Cancel"
                kind="secondary"
                onPress={() => {
                  setIsCreating(false);
                  setNewPlaylistName('');
                }}
              />
            </View>
          ) : (
            <>
              {isLoading ? (
                <ActivityIndicator size="large" color="#a567ff" />
              ) : (
                <FlatList
                  data={playlists}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.playlistItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.playlistItemText}>{item.name}</Text>
                      <Text style={styles.songCount}>
                        {item.songs.length} songs
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
              <Button
                title="Create New Playlist"
                onPress={() => setIsCreating(true)}
                style={{ marginVertical: 10 }}
              />
              <Button title="Close" kind="secondary" onPress={onClose} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#a567ff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
  playlistItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  playlistItemText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_500Medium',
  },
  songCount: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
  },
  createContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#272424',
    padding: 12,
    borderRadius: 8,
    color: 'white',
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
});

export default PlaylistSelectionModal;
