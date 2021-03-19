import "./env";
import passport from "passport";
import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";

import {ApplicationModule} from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  app.use(passport.initialize());

  await app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);

    if (process.env.NODE_ENV !== "production") {
      console.info(`GraphQL playground is at http://${process.env.HOST}:${process.env.PORT}/graphql`);
    }
  });
}

void bootstrap();
