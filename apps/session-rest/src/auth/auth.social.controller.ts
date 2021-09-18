import { Controller, Get, UseGuards } from "@nestjs/common";

import { FacebookGuard, GoogleGuard, OneloginGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { Public, User } from "../common/decorators";

@Public()
@Controller("/auth")
export class AuthSocialController {
  @Get("/google")
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  public googleLoginCallback(@User() userEntity: UserEntity): string {
    return `
      <html>
      	<script>
					function handleAuth() {
					  alert('${JSON.stringify(userEntity)}');
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
  public facebookLoginCallback(@User() userEntity: UserEntity): string {
    return `
      <html>
      	<script>
					function handleAuth() {
					  alert('${JSON.stringify(userEntity)}');
						window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }

  @Get("/onelogin")
  @UseGuards(OneloginGuard)
  public oneloginLogin(): void {
    // initiates the OneLogin login flow
  }

  @Get("/onelogin/callback")
  @UseGuards(OneloginGuard)
  public oneloginLoginCallback(@User() userEntity: UserEntity): string {
    return `
      <html>
      	<script>
					function handleAuth() {
					  alert('${JSON.stringify(userEntity)}');
						window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }
}
