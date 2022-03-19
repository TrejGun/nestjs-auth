import { NextFunction, Handler } from "express";
import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConfigService } from "@nestjs/config";
import { ServerOptions } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import IORedis from "ioredis";
import passport from "passport";

import { sessionMiddleware } from "../middlewares/session";

const adapter = (middleware: Handler) => (socket: any, next: NextFunction) => {
  middleware(socket.request, socket.request.res || {}, next);
};

export class RedisIoAdapter extends IoAdapter {
  constructor(private readonly app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const configService = this.app.get(ConfigService);

    const server = super.createIOServer(port, {
      ...options,
      // cors options should be passed here if any
    });

    const redisUrl = configService.get<string>("REDIS_WS_URL", "redis://localhost:6379/");
    const pubClient = new IORedis(redisUrl);
    const subClient = pubClient.duplicate();
    const redisAdapter = createAdapter(pubClient, subClient);
    server.adapter(redisAdapter);

    server.use(
      adapter(
        sessionMiddleware({
          url: configService.get<string>("REDIS_SESSION_URL", "redis://localhost:6379/1"),
          secret: configService.get<string>("SESSION_SECRET_KEY", "keyboard_cat"),
          secure: configService.get<string>("NODE_ENV", "development") === "production",
        }),
      ),
    );

    server.use(adapter(passport.initialize()));
    server.use(adapter(passport.session()));

    return server;
  }
}
