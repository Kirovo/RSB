// Importing client of database to connect to
import client from '../database';
import bcrypt from 'bcrypt'

export type User = {
	id?: string | number,
	email: string,
	password: string
}

export type Profile = {
	id?: string | number,
	firstname: string,
	lastname: string,
	mobile: string,
	birthdate: string,
	gendre: string,
	address: string,
	city: string,
	postalcode: string
};


const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS


// Creating products's class with CRUD and addProducts functions
export class IdentificationStore {

	async login(u: User): Promise<String> {
		try {
			const sql =
				'SELECT * FROM users WHERE email=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [u.email]);
			const res = result.rows[0];
			conn.release();

			if (result.rows.length && bcrypt.compareSync(u.password + pepper, res.password_digest)) {
				return res;
			}
			else {
				throw new Error('wrong creditencials')
			}
		} catch (err) {
			throw new Error(`unable to authenticate: ${err}`);
		}
	}

	async register(u: User, i: Profile): Promise<[User, Profile]> {
		try {
			const hash = bcrypt.hashSync(
				u.password + pepper, parseInt(saltRounds as string)
			);
			const conn = await client.connect();

			const sql1 =
				'INSERT INTO users (email, password_digest) VALUES($1, $2) RETURNING (id)';
			const sql2 =
				'INSERT INTO profiles (id_user, firstname, lastname, mobile, birthdate, gendre, address, city, postalcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
			const result1 = await conn.query(sql1, [u.email, hash]);
			const user = result1.rows[0];
			const result2 = await conn.query(sql2, [user.id, i.firstname, i.lastname, i.mobile, i.birthdate, i.gendre, i.address, i.city, i.postalcode]);
			const profile = result2.rows[0];
			conn.release();
			return profile;
		} catch (err) {
			throw new Error(`unable create post: ${err}`);
		}
	}


	// Method to delete a user by ID
	// async remove(id: string | number): Promise<null> {
	//     try {
	// 		const sql1 = 'DELETE FROM profiles WHERE id=($1) RETURNING (id_user)';
	//         const sql2 = 'DELETE FROM users WHERE id=($1)';
	//         const conn = await client.connect();
	//         const result = await conn.query(sql1, [id]);
	// 		await conn.query(sql2, [result.rows[0].id_user]);
	//         conn.release();

	//         return null;

	//     } catch (err) {
	//         throw new Error(`Could not delete user ${id}. Error: ${err}`);
	//     }
	// }



}
