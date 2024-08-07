// Importing client of database to connect to
import client from '../database';
import { CRUDModelError } from '../errors/CRUDError';
import { ActivityAction, CRUD, CRUDSenario } from "../types/CRUDSenarioType";
import { CRUDModel } from "./CRUDModel";


// Create Post type
export type Post = {
	id?: string | number;
	id_profile : string;
	topic: string;
	path? : string;
    filename?: string;
	mime? : string;
};


// const postStore = new CRUDModel('post',{})


export class PostStore extends CRUDModel {
	
	public CRUDSenario: CRUDSenario = {
		crud: undefined,
		activityAction: ActivityAction.Post
	}
	
	async index(): Promise<Post[]> {

		try {

			const conn = await client.connect();
			const sql =
			'SELECT * FROM posts ORDER BY posts.id DESC;';
			const result = await conn.query(sql);
			conn.release();
			
			return result.rows;
		}
		catch (err) {
			
			throw new CRUDModelError(this.CRUDSenario)
		}
	}
	
	async show(id: string | number): Promise<Post | null> {
		try {
			const sql = 'SELECT * FROM posts WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
	
			if (result.rows.length) {
				return result.rows[0];
			} else {
				return null;
			}
		} catch (err) {
			throw new Error(`Could not find post ${id}. Error: ${err}`);
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

	async remove(id: string | number) : Promise<void> {
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

    // Method to fetch a single post by ID
}
