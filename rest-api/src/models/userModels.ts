import pool from "../config/db";

interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export async function getUserByValue<T extends keyof User>(
  field: T,
  value: User[T],
  selectFields: (keyof User)[]
): Promise<Partial<User> | null> {
  const validFields: (keyof User)[] = [
    "id",
    "username",
    "email",
    "password_hash",
    "created_at",
  ];

  const selected = selectFields
    .filter((f) => validFields.includes(f))
    .join(", ");

  const query = `SELECT ${selected} FROM users WHERE ${field} = $1`;
  const values = [value];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return first user found
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}