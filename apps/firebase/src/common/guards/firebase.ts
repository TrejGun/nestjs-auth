import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FirebaseGuard extends AuthGuard("firebase") implements CanActivate {}
