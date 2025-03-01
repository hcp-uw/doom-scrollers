import { useFeed } from '@/hooks/useFeed';
import {
  getFriendRequests,
  handleFriendRequest,
} from '@/services/friendRequests';
import { FriendRequest } from '@/types';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { UserView } from './UserView';
import { removeFriend } from '@/services/friends';

interface FriendRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

const FriendViewModal: React.FC<FriendRequestModalProps> = ({
  visible,
  onClose,
}) => {
  const { friends } = useFeed();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Friends</Text>
          <View style={styles.horizontalLine} />
          <ScrollView>
            {friends.map((user) => (
              <UserView
                user={user}
                key={user.id}
                removeFriend={(id) => {
                  removeFriend(id);
                }}
              />
            ))}
          </ScrollView>
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

export default FriendViewModal;
