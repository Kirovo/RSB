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
				const sql2 =
					'INSERT INTO attachments (id_post, path, filename, mime) VALUES($1, $2, $3, $4) RETURNING *;'
				const attachment = await conn.query(sql2, [postObj.id,p.path,p.filename,p.mime]);
				const attaObj = attachment.rows[0];
				delete attaObj.id_post; // To be able to return a correct Post object
				delete attaObj.id;      // To be able to return a correct Post object
			conn.release();

			return {...postObj,...attaObj}
		}
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	async remove(id: string | number) {
		try {
			const conn = await client.connect();
			const sql1 =
			'DELETE FROM attachments WHERE id_post=($1);'
			const sql2 =
			'DELETE FROM comments WHERE id_post=($1);'
			const sql3 =
			'DELETE FROM posts WHERE id=($1);'
			await conn.query(sql1,[id]);
			await conn.query(sql2,[id]);
			await conn.query(sql3,[id]);
			conn.release();
		} catch (err) {
			throw new Error(`unable delete post: ${err}`);
		}
	}

	async fileReader(id: string | number): Promise<Attachment> {
		
		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments WHERE id_post=$1;';
				const result = await conn.query(sql,[id]);
			conn.release(result.rows[0]);

			return result.rows[0];
		}
		catch (err) {
			throw new Error(`unable get posts: ${err}`);
		}
	}
}
