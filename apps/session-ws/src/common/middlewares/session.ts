import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import * as redis from "redis";

export const sessionMiddleware = (): express.RequestHandler =>
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      signed: false,
    },
    name: "sid",
    resave: false,
    secret: process.env.SESSION_SECRET_KEY,
    store: new (connectRedis(session))({client: redis.createClient(process.env.REDIS_URL)}),
    saveUninitialized: true,
    proxy: true,
  });
