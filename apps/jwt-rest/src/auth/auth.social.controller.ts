import { Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";

import { IJwt } from "../common/jwt";
import { BiometricGuard, FacebookGuard, FirebaseGuard, GoogleGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { Public, User } from "../common/decorators";

@Public()
@Controller("/auth")
export class AuthSocialController {
  constructor(private readonly authService: AuthService) {}

  @Get("/firebase")
  @UseGuards(FirebaseGuard)
  public firebaseLogin(@User() userEntity: UserEntity): Promise<IJwt> {
    return this.authService.loginUser(userEntity);
  }

  @HttpCode(200)
  @Post("/biometric")
  @UseGuards(BiometricGuard)
  public biometric(@User() userEntity: UserEntity): Promise<IJwt> {
    return this.authService.loginUser(userEntity);
  }

  @Get("/google")
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  public async googleLoginCallback(@User() userEntity: UserEntity): Promise<string> {
    const auth = await this.authService.loginUser(userEntity);
    return `
      <html lang="en">
      	<script>
					function handleAuth() {
            window.opener.postMessage(${JSON.stringify(auth)});
            window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }

  @Get("/facebook")
  @UseGuards(FacebookGuard)
  public facebookLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/facebook/callback")
  @UseGuards(FacebookGuard)
  public async facebookLoginCallback(@User() userEntity: UserEntity): Promise<string> {
    const auth = await this.authService.loginUser(userEntity);
    return `
      <html lang="en">
      	<script>
					function handleAuth() {
            window.opener.postMessage(${JSON.stringify(auth)});
            window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }
}
