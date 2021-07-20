import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import passport from "passport";

import { AppModule } from "./app.module";
import { RedisIoAdapter } from "./common/adapters/redis-io";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  app.use(passport.initialize());

  const options = new DocumentBuilder().setTitle("jwt-ws").setDescription("API description").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  const host = configService.get<string>("HOST", "localhost");
  const port = configService.get<number>("PORT", 3000);

  await app.listen(port, host, () => {
    console.info(`Express server is running on http://${host}:${port}/`);
  });
}

void bootstrap();
