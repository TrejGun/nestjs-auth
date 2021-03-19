export interface IAuth {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken?: string;
  refreshTokenExpiresAt?: number;
}
