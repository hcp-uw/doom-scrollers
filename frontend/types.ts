export interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface User {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponse {
  error: string;
}

export interface Genre {
  id: number;
  value: string;
}

export interface SpotifyDevice {
  id: string;
  name: string;
}

export interface Song {
  id: number;
  trackID: string;
  genre: Genre;
}

export interface SpotifyArtist {
  name: string;
  id: string;
}

export interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

export interface SpotifyAlbum {
  name: string;
  id: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  name: string;
  id: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  genre: string;
}

export interface Playlist {
  id: number;
  name: string;
  songs: Song[];
}
