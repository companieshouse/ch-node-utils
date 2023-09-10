import { Session } from "@companieshouse/node-session-handler/lib/session/model/Session";

// Extend Express' Request with custom metadata

// to make the file a module and avoid the TypeScript error
export {}

declare global {
  namespace Express {
    export interface Request {
      lang?: string;
      session?: Session;
    }
  }
}