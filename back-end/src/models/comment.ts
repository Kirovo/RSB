// Importing client of database to connect to
import client from '../database';


export type Comment = {
	id?: string | number;
	id_post: string | number;
	id_profile : string | number;
	content: string;
}
// Creating products's class with CRUD and addProducts functions
export class CommentStore {

	async index(): Promise<Comment[]> {
		try {
			const conn = await client.connect();
			const sql =
				'SELECT * FROM comments ORDER BY comments.id DESC;';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get comments: ${err}`);
		}
	}
	async create(c : Comment) : Promise<Comment>{
		try {
			const conn = await client.connect();
			const sql =
				'INSERT INTO comments (id_post, id_profile, content) VALUES ($1, $2 ,$3) RETURNING *;'
			const result = await conn.query(sql,[c.id_post,c.id_profile,c.content]);
			conn.release();
			return result.rows[0];
			
		} catch (err) {
			throw new Error(`unable insert the new comment in the database: ${err}`);
		}
	}

	async deleteCom(id_post: string | number , id_comment: string | number) {
		try {
			const conn = await client.connect();
			const sql =
			'DELETE FROM comments WHERE id_post=($1) AND id=($2);'
			await conn.query(sql,[id_post,id_comment]);
			conn.release();
			return
		} catch (err) {
			throw new Error(`unable delete post: ${err}`);
		}
	}

}
