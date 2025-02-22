import {
  getFriendRequests,
  handleFriendRequest,
} from '@/services/friendRequests';
import { FriendRequest } from '@/types';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.requestItem}>
                <Text style={styles.requestText}>{item.from.username}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonAccept]}
                    onPress={() => handleFriendRequest(item.id, 'accept')}
                  >
                    <Text style={styles.textStyle}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonReject]}
                    onPress={() => handleFriendRequest(item.id, 'decline')}
                  >
                    <Text style={styles.textStyle}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
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
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: '#2196F3',
  },
  buttonReject: {
    backgroundColor: '#f44336',
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
    marginBottom: 15,
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
  },
  requestText: {
    fontSize: 18,
  },
});

export default FriendRequestModal;
