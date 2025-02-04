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
