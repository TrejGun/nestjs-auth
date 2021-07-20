import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import ormconfig from "./ormconfig";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JwtGuard, RolesGuard } from "./common/guards";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Request, Response } from "express";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
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
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          debug: configService.get<string>("POSTGRES_URL", "development") !== "production",
          playground: configService.get<string>("POSTGRES_URL", "development") !== "production",
          context: ({ req, res }: { req: Request; res: Response }): any => ({ req, res }),
          autoSchemaFile: "./schema.gql",
        };
      },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
