import express from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { Redis } from "ioredis";

import { ns } from "../constants";

interface ISessionMiddlewareProps {
  url: string;
  secret: string;
  secure?: boolean;
  maxAge?: number;
  name?: string;
}

export const sessionMiddleware = (props: ISessionMiddlewareProps): express.RequestHandler => {
  const { url, secret, secure = false, name = ns, maxAge = 30 * 24 * 60 * 60 } = props;
  return session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure,
      maxAge: maxAge * 1000,
      signed: false,
      sameSite: secure ? "none" : "lax",
    },
    name,
    resave: false,
    secret,
    store: new RedisStore({ client: new Redis(url) }),
    saveUninitialized: true,
    proxy: true,
  });
};
