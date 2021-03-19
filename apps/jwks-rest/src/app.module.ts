import {Module, ValidationPipe} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_GUARD, APP_PIPE} from "@nestjs/core";

import {Auth0Guard, RolesGuard} from "./common/guards";
import {TypeOrmConfigService} from "./typeorm.options";

import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: Auth0Guard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
  ],
})
export class ApplicationModule {}
