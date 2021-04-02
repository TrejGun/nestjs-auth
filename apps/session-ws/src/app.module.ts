import {Module, ValidationPipe} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_GUARD, APP_PIPE} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";

import ormconfig from "./ormconfig";
import {LocalGuard, RolesGuard} from "./common/guards";
import {AuthModule} from "./auth/auth.module";
import {EventModule} from "./events/event.module";
import {UserModule} from "./user/user.module";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: LocalGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...ormconfig,
          url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@127.0.0.1/postgres"),
          keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    }),
    AuthModule,
    EventModule,
    UserModule,
  ],
})
export class AppModule {}
