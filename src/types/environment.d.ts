export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      MY_API_KEY: string;
    }
  }
}
