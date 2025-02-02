import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView, Text } from 'react-native';

const Index = () => {
  const { user, error, isLoading } = useAuth();

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Loading</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Text>{user?.username}</Text>
      )}
    </SafeAreaView>
  );
};

export default Index;
