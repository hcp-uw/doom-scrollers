import { getCurrentSession } from '@/services/auth/me';
import { User } from '@/types';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<User>();

  const fetchData = async () => {
    setIsLoading(true);
    setError(undefined);
    const [user, error] = await getCurrentSession();

    if (error) {
      setError(error.error);
      setUser(undefined);
    } else {
      setUser(user!);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { user, error, isLoading };
};
