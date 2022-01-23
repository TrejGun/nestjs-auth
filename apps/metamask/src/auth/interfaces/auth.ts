import { IUser } from "../../user/interfaces";

export interface IAuth {
  refreshToken: string;
  refreshTokenExpiresAt: number;
  user?: IUser;
  userId: number;
}
