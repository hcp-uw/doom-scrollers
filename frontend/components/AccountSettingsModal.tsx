import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { InputField } from './InputField';
import { Button } from './Button';
import { Header } from './Header';
import { updateUser } from '@/services/user';

interface AccountSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  username: string;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  visible,
  onClose,
  username,
}) => {
  const [newUsername, setNewUsername] = useState(username);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string>();

  const handleSave = async () => {
    const [user, error] = await updateUser({
      username: newUsername !== username ? newUsername : undefined,
      oldPassword: oldPassword || undefined,
      newPassword: newPassword || undefined,
    });

    if (error) {
      setError(error.error);
    }

    if (user) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Header text="Account Settings" style={styles.modalTitle} />

          <InputField
            label="Username"
            placeholder={username}
            style={styles.input}
            onChange={setNewUsername}
          />

          <InputField
            label="Current Password"
            placeholder="Enter current password"
            kind="password"
            style={styles.input}
            onChange={setOldPassword}
          />

          <InputField
            label="New Password"
            placeholder="Enter new password"
            kind="password"
            style={styles.input}
            onChange={setNewPassword}
          />

          {error && <Text style={styles.errorText}>Error: {error}</Text>}

          <View style={styles.buttonContainer}>
            <Button
              title="Save Changes"
              onPress={handleSave}
              style={styles.button}
            />
            <Button
              title="Cancel"
              onPress={onClose}
              kind="secondary"
              style={styles.button}
            />
          </View>
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
    width: '90%',
    backgroundColor: 'black',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#a568ff',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    width: '100%',
  },
  errorText: {
    color: '#FA8072',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
