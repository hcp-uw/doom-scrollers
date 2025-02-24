import { getFeed } from '@/services/friends';
import { Genre, Playlist, Song, User } from '@/types';
import { useEffect, useState } from 'react';

export const useFeed = () => {
  const [songs, setSongs] = useState<Array<Song & { username: string }>>([]);
  const [playlists, setPlaylists] = useState<
    Array<Playlist & { username: string }>
  >([]);
  const [genres, setGenres] = useState<Array<Genre & { username: string }>>([]);
  const [friends, setFriends] = useState<Array<User>>([]);

  const fetchFeed = async () => {
    let newSongs: Array<Song & { username: string }> = [];
    let newPlaylists: Array<Playlist & { username: string }> = [];
    let newGenres: Array<Genre & { username: string }> = [];
    let newFriends: User[] = [];

    const feed = await getFeed();
    feed.forEach((element) => {
      newSongs = [
        ...newSongs,
        ...element.likedSongs.map((song) => ({
          ...song,
          username: element.username,
        })),
      ];
      newPlaylists = [
        ...newPlaylists,
        ...element.playlists.map((playlist) => ({
          ...playlist,
          username: element.username,
        })),
      ];
      newGenres = [
        ...newGenres,
        ...element.preferences.map((preference) => ({
          ...preference,
          username: element.username,
        })),
      ];
      newFriends = [...newFriends, element];
    });

    setSongs(newSongs);
    setPlaylists(newPlaylists);
    setGenres(newGenres);
    setFriends(newFriends);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return { songs, playlists, genres, friends, fetchFeed };
};
