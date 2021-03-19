import "./env";
import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {NestExpressApplication} from "@nestjs/platform-express";

import {ApplicationModule} from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle("jwks-based-authorization-for-nestjs")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);
  });
}

void bootstrap();
