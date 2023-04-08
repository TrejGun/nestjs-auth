import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Request, Response } from "express";

import ormconfig from "./ormconfig";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JwtGuard, RolesGuard } from "./common/guards";

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
          url: configService.get<string>("POSTGRES_URL", "postgres://postgres:password@localhost/postgres"),
          keepConnectionAlive: configService.get<string>("NODE_ENV", "development") === "test",
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>("NODE_ENV", "development");
        return {
          includeStacktraceInErrorResponses: nodeEnv !== "production",
          playground: nodeEnv !== "production",
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
