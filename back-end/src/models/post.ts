// Importing client of database to connect to
import client from '../database';
import { CRUDModelError } from '../errors/CRUDError';
import { ActivityAction, CRUD, CRUDSenario } from "../types/CRUDSenarioType";



// Create Post type
export type Post = {
	id?: string | number;
	id_profile : string;
	topic: string;
	path? : string;
    filename?: string;
	mime? : string;
};


// Creating products's class with CRUD and addProducts functions
export class PostStore {

	public CRUDSenario: CRUDSenario = {
		crud: undefined,
		activityAction: ActivityAction.Post
	}
	
	async index(): Promise<Post[]> {

		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM posts ORDER BY posts.id DESC;';
					// Change to ORDER BY date
				const result = await conn.query(sql);
			conn.release();

			return result.rows;
		}
		catch (err) {
			
			throw new CRUDModelError(this.CRUDSenario)
		}
	}
	
	async create(p: Post): Promise<Post> {

		try {

			const conn = await client.connect();
				const sql =
					'INSERT INTO posts (id_profile, topic) VALUES ($1 ,$2) RETURNING *;'
				const post = await conn.query(sql, [p.id_profile,p.topic]);
				const postObj = post.rows[0]
			conn.release();

			return postObj
		}
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	async remove(id: string | number) {
		try {
			const conn = await client.connect();
			let sql =
			'DELETE FROM reactions WHERE id_post=($1);'
			await conn.query(sql,[id]);
			sql =
			'DELETE FROM attachments WHERE id_post=($1);'
			await conn.query(sql,[id]);
				sql =
			'DELETE FROM comments WHERE id_post=($1);'
			await conn.query(sql,[id]);
				sql =
			'DELETE FROM posts WHERE id=($1);'
			await conn.query(sql,[id]);
			conn.release();
		} catch (err) {
			throw new Error(`unable delete post: ${err}`);
		}
	}
}
