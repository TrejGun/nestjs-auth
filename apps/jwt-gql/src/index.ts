import passport from "passport";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.use(passport.initialize());

  const host = configService.get<string>("HOST", "localhost");
  const port = configService.get<number>("PORT", 3000);

  await app.listen(port, host, () => {
    console.info(`Express server is running on http://${host}:${port}/`);

    if (process.env.NODE_ENV !== "production") {
      console.info(`GraphQL playground is at http://${host}:${port}/graphql`);
    }
  });
}

void bootstrap();
