import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OneloginGuard extends AuthGuard("onelogin") implements CanActivate {}
