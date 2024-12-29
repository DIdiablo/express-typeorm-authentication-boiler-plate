import { config } from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  DB_HOST: str(),
  DB_PORT: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  JWT_SECRET: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  ORIGIN: str(),
});

export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  JWT_SECRET,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = env;
