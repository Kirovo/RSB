// Importing client of database to connect to
import client from '../database';
import bcrypt from 'bcrypt'

export type User = {
	id?:string | number,
    email: string,
    password: string
}

export type Profile = {
	id?:string | number,
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


	async show(id: string | number): Promise<User | null> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();

			if (result.rows.length) {
				return result.rows[0];
			} else {
				return null;
			}
		} catch (err) {
			throw new Error(`Could not find user ${id}. Error: ${err}`);
		}
	}
	
	async authenticate(u: User): Promise<String> {
		try {
			const sql =
				'SELECT * FROM users WHERE email=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [u.email]);
			const res = result.rows[0];
			conn.release();

			if(result.rows.length && bcrypt.compareSync(u.password + pepper, res.password_digest)){
				return res;
			}
			else {
				throw new Error('wrong creditencials')
			}
		} catch (err) {
			throw new Error(`unable to authenticate: ${err}`);
		}
	}

	async create(u:User,i:Profile): Promise<[User,Profile]> {
		try {
            const hash = bcrypt.hashSync(
				u.password + pepper, parseInt(saltRounds as string)
			);
			const conn = await client.connect();

			const sql1 =
				'INSERT INTO users (email, password_digest) VALUES($1, $2) RETURNING (id)';
			const sql2=	
                'INSERT INTO profiles (id_user, firstname, lastname, mobile, birthdate, gendre, address, city, postalcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING (id)';
			const result1 = await conn.query(sql1, [u.email,hash]);
			const user = result1.rows[0];
			const result2 = await conn.query(sql2, [user.id,i.firstname,i.lastname,i.mobile,i.birthdate,i.gendre,i.address,i.city,i.postalcode]);
			const profile = result2.rows[0];
			conn.release();
			return profile;
		} catch (err) {
			throw new Error(`unable create post: ${err}`);
		}
	}

    // Method to fetch all users
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not fetch users. Error: ${err}`);
        }
    }

    // Method to delete a user by ID
    async remove(id: string | number): Promise<User | null> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            if (result.rows.length) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

}
