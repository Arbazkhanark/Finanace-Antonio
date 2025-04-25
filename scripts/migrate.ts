import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
require("dotenv").config();


console.log("migrating.....",process.env.DRIZZLE_DATABASE_URL);
const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  } catch (error) {
    console.log("error during migration", error);
    process.exit(1);
  }
};

main();
