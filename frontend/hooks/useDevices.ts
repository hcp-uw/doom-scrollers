import { useState, useEffect } from 'react';
import { getSpotifyDevices } from '@/services/player';
import { SpotifyDevice } from '@/types';

export const useDevices = (accessToken: string) => {
  const [devices, setDevices] = useState<SpotifyDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<SpotifyDevice | null>(
    null
  );

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await getSpotifyDevices();
      console.log(devices);
      setDevices(devices);
    };
    fetchDevices();
  }, [accessToken]);

  return { devices, selectedDevice, setSelectedDevice };
};
