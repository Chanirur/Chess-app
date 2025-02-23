import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();

const db = pgp(process.env.DATABASE_URL);

db.connect()
  .then(obj => {
    obj.done();
    console.log("Connected to PostgreSQL inside Docker!");
  })
  .catch(error => {
    console.error("Database connection error:", error.message);
  });

export default db;
