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
