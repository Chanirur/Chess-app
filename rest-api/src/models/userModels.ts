import pool from "../config/db";

interface User {
	id: number;
	username: string;
	email: string;
	hashedPassword: string;
	createdAt: Date;
	isVerified: boolean;
	verificationToken: string | null;
	verificationExpiry: Date;
}

const tableName = 'users'

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
	username: User['username'],
	email: User['email'],
	hashedPassword: User['hashedPassword'],
	verificationToken: User['verificationToken'],
	verificationExpiry: User['verificationExpiry']
	) => {

	const query = `INSERT INTO ${tableName} (username, email, password_hash, verification_token, verification_expiry) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
	const values = [username, email, hashedPassword, verificationToken, verificationExpiry];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (err) {
		console.error('Database Error', err)
	}
};

export const checkUsenameExists = async (username: User['username']) => {
	const query = 'SELECT id FROM users WHERE username = $1';
	const values = [username];

	try {
		const result = await pool.query(query, values);
		if (result.rows.length > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('Database Error', err)
	}
}

export const checkEmailExists = async (email: User['email']) => {
	const query = 'SELECT id FROM users WHERE email = $1';
	const values = [email];

	try {
		const result = await pool.query(query, values);
		if (result.rows.length > 0) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.error('Database Error', err)
	}
}