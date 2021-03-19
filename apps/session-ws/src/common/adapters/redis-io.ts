import {NextFunction, Handler} from "express";
import {IoAdapter} from "@nestjs/platform-socket.io";
import {ServerOptions} from "socket.io";
import redisIoAdapter from "socket.io-redis";
import passport from "passport";

import {sessionMiddleware} from "../middlewares/session";

const adapter = (middleware: Handler) => (socket: any, next: NextFunction) => {
  middleware(socket.request, socket.request.res || {}, next);
};

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    const redisAdapter = redisIoAdapter(process.env.REDIS_URL);
    server.adapter(redisAdapter);

    server.use(adapter(sessionMiddleware()));
    server.use(adapter(passport.initialize()));
    server.use(adapter(passport.session()));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return server;
  }
}
