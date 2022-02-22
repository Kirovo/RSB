// Importing client of database to connect to
import client from '../database';


export type Reaction = {
	id?: string | number;
	id_post: string | number;
	id_profile : string | number;
}
// Creating products's class with CRUD and addProducts functions
export class ReactionStore {

	async index(): Promise<Reaction[]> {
		try {
			const conn = await client.connect();
			const sql =
				'SELECT * FROM reactions;';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get comments: ${err}`);
		}
	}
	async create(r : Reaction) {
		try {
			const conn = await client.connect();

			const sql1 =
				'SELECT * FROM reactions WHERE id_post=($1) AND id_profile=($2)';
			const result1 = await conn.query(sql1,[r.id_post,r.id_profile]);
			if(result1.rows.length==0){
				const sql2 =
				'INSERT INTO reactions (id_post, id_profile) VALUES ($1, $2);'
				await conn.query(sql2,[r.id_post,r.id_profile]);
			}
			else{
				const sql2 =
				'DELETE FROM reactions WHERE id_post=($1) AND id_profile=($2);'
				await conn.query(sql2,[r.id_post,r.id_profile]);
			conn.release();
			}

		} catch (err) {
			throw new Error(`unable insert the new comment in the database: ${err}`);
		}
	}

}
