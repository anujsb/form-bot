import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon("postgresql://neondb_owner:fXuykN5UJ9cz@ep-crimson-breeze-a5ksf24b.us-east-2.aws.neon.tech/neondb?sslmode=require");

export const db = drizzle(sql);