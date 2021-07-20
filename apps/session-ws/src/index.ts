import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import passport from "passport";

import { AppModule } from "./app.module";
import { RedisIoAdapter } from "./common/adapters/redis-io";
import { sessionMiddleware } from "./common/middlewares/session";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  app.use(
    sessionMiddleware({
      url: configService.get<string>("REDIS_SESSION_URL", "redis://localhost:6379/1"),
      secret: configService.get<string>("SESSION_SECRET_KEY", "keyboard_cat"),
      secure: configService.get<string>("NODE_ENV", "development") === "production",
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle("session-based-authorization-for-nestjs")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  const host = configService.get<string>("HOST", "localhost");
  const port = configService.get<number>("PORT", 3000);

  await app.listen(port, host, () => {
    console.info(`Express server is running on http://${host}:${port}/`);
  });
}

void bootstrap();
