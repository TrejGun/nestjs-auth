import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule, ConfigService } from "@nestjs/config";

import ormconfig from "./ormconfig";
import { LocalGuard, RolesGuard } from "./common/guards";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { join } from "path";

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...ormconfig,
          url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@localhost/postgres"),
          keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
