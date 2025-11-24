import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { urlsTable } from "./schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!, {
  schema: { urlsTable },
});

export { db, eq };
