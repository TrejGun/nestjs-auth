import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class BiometricGuard extends AuthGuard("biometric") implements CanActivate {}
