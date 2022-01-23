import { UserRole } from "./roles";

export interface IUser {
  id: number;
  sub: string;
  roles: Array<UserRole>;
}
