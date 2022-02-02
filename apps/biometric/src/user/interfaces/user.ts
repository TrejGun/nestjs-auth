import { UserRole } from "./roles";

export interface IUser {
  id: number;
  email: string;
  biometricPublicKey: string;
  roles: Array<UserRole>;
}
