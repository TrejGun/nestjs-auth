import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";

interface ISessionMiddlewareProps {
  url: string;
  secret: string;
  secure?: boolean;
  maxAge?: number;
  name?: string;
}

export const sessionMiddleware = (props: ISessionMiddlewareProps): express.RequestHandler => {
  const { url, secret, secure = false, name = "sid", maxAge = 30 * 24 * 60 * 60 } = props;
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
    store: new (connectRedis(session))({ client: createClient(url) }),
    saveUninitialized: true,
    proxy: true,
  });
};
