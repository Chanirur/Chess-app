import pool from "../config/db";

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  is_verified: boolean;
  verification_token: string | null;
  verification_expiry: Date;
}

const tableName = "users";

export async function getUserByValue<T extends keyof User>(
  field: T,
  value: User[T],
  selectFields: (keyof User)[]
): Promise<Partial<User> | null> {
  const selected = selectFields.join(", ");

  const query = `SELECT ${selected} FROM ${tableName} WHERE ${field} = $1`;
  const values = [value];

  try {
    const result = await pool.query(query, values);
    return result.rows[0] || null; // Return first user found
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
}

export const createUser = async (
  username: User["username"],
  email: User["email"],
  password_hash: User["password_hash"],
  verification_token: User["verification_token"],
  verification_expiry: User["verification_expiry"]
) => {
  const query = `INSERT INTO ${tableName} (username, email, password_hash, verification_token, verification_expiry) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [
    username,
    email,
    password_hash,
    verification_token,
    verification_expiry,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Database Error", err);
  }
};

export const checkUsenameExists = async (username: User["username"]) => {
  const query = "SELECT id FROM users WHERE username = $1";
  const values = [username];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Database Error", err);
  }
};

export const checkEmailExists = async (email: User["email"]) => {
  const query = "SELECT id FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Database Error", err);
  }
};

export const checkUserExistsFromIdAndUsername = async (
  id: User["id"],
  username: User["username"]
) => {
  const query =
    "SELECT EXISTS (SELECT 1 FROM users WHERE id = $1 AND username = $2) AS user_exists";
  const values = [id, username];

  try {
    const result = await pool.query(query, values);
    return result.rows[0].user_exists;
  } catch (err) {
    console.error("Database Error", err);
  }
};
