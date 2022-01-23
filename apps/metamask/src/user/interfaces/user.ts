import { UserRole } from "./roles";

export interface IUser {
  id: number;
  wallet: string;
  roles: Array<UserRole>;
}
