import {config} from "dotenv";

config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test" | "staging";

      // SERVER
      HOST: string;
      PORT: string;

      // DB
      REDIS_URL: string;
      POSTGRES_URL: string;

      // SESSION
      SESSION_SECRET_KEY: string;
    }
  }
}
