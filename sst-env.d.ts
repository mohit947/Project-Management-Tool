/// <reference types="sst/node/config" />
/// <reference types="sst/node/table" />

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    AUTH_SECRET: string;
  }
}
