import { User } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Text } from 'react-native';

interface UserViewProps {
  user: User;
  handleFriendRequest?: (id: number) => void;
}

export const UserView: React.FC<UserViewProps> = ({
  user,
  handleFriendRequest,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 4,
        marginHorizontal: 8,
        marginBlock: 5,
        gap: 15,
        justifyContent: 'space-between',
      }}
      key={user.id}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <Image
          source={{ uri: user.profilePictureURL }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            borderWidth: 3,
            borderColor: '#a568ff',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontFamily: 'LexendDeca_500Medium',
            fontSize: 17,
          }}
        >
          {user.username}
        </Text>
      </View>
      {handleFriendRequest && (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => {
            handleFriendRequest(user.id);
          }}
        >
          <AntDesign name="adduser" size={22} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
