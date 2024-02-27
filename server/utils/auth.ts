import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { db } from "./db";

import type { DatabaseUser } from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev, // determines if the session is httpOnly
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}
