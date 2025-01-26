import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const GoogleAuthButton: React.FC<Props> = ({ style }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.googleButton,
        ...(style as object),
      }}
    >
      <View style={styles.googleButtonInner}>
        <AntDesign name="google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Register With Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    borderRadius: 10,
    backgroundColor: '#a568ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexShrink: 0,
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  googleButtonInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
