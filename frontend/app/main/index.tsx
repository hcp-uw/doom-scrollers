import { getCurrentSession } from '@/services/auth/me';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

const Index = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const call = async () => {
      const [currentUser, error] = await getCurrentSession();
      setUser(currentUser!);
    };
    call();
  }, []);

  return (
    <SafeAreaView>
      <Text>{user?.username}</Text>
    </SafeAreaView>
  );
};

export default Index;
