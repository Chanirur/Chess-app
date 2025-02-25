import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Read from environment variable
});

export default pool;
