import {
  getFriendRequests,
  handleFriendRequest,
} from '@/services/friendRequests';
import { FriendRequest } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

interface FriendRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setIsLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      setIsLoading(true);
      setFriendRequests(await getFriendRequests());
      setIsLoading(false);
    };
    fetchFriendRequests();
  }, [visible]);

  if (loading) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Friend Requests</Text>
          <View style={styles.horizontalLine} />
          {friendRequests.map((item) => (
            <View style={styles.requestItem} key={item.id}>
              <View style={styles.profileView}>
                <Image
                  source={{ uri: item.from.profilePictureURL }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.requestText}>{item.from.username}</Text>
              </View>
              <View style={[styles.buttonContainer, { marginLeft: 30 }]}>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => handleFriendRequest(item.id, 'accept')}
                >
                  <Ionicons name="checkmark" size={20} color="#a568ff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => handleFriendRequest(item.id, 'decline')}
                >
                  <Ionicons name="close" size={20} color="#a568ff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, { padding: 10 }]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    width: '70%',
    borderColor: '#eee',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#a568ff',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'LexendDeca_500Semibold',
    color: 'white',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#2b2b2b',
    padding: 5,
    borderRadius: 10,
  },
  requestText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'LexendDeca_400Regular',
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  horizontalLine: {
    borderBottomColor: '#a568ff',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
    marginBottom: 15,
  },
});

export default FriendRequestModal;
