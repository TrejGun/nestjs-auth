import { NextFunction, Handler } from "express";
import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConfigService } from "@nestjs/config";
import { ServerOptions } from "socket.io";
import { createAdapter } from "socket.io-redis";
import passport from "passport";

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

    const redisUrl = configService.get<string>("REDIS_WS_URL", "redis://127.0.0.1:6379/");
    const redisAdapter = createAdapter(redisUrl);
    server.adapter(redisAdapter);

    server.use(adapter(passport.initialize()));

    return server;
  }
}
