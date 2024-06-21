// Importing client of database to connect to
import client from '../database';
import { CRUDModelError } from '../errors/CRUDError';
import { ActivityAction, CRUDSenario } from "../types/CRUDSenarioType";



export type Comment = {
	id?: string | number;
	id_post?: string | number;
	id_profile? : string | number;
	content?: string;
}


// Creating products's class with CRUD and addProducts functions
export class CommentStore {

	public CRUDSenario: CRUDSenario = {
		crud: undefined,
		activityAction: ActivityAction.Comment
	}

	async index(): Promise<Comment[]> {

		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM comments ORDER BY comments.id DESC;';
				const result = await conn.query(sql);
			conn.release();

			return result.rows;
		}
		catch {

			throw new CRUDModelError(this.CRUDSenario)
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
		} 
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	async remove(id: string | number) : Promise<void> {

		try {

			const conn = await client.connect();
				const sql =
					'DELETE FROM comments WHERE id=($1) RETURNING *;'
				const result = await conn.query(sql,[id]);
			conn.release();

		}
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	// Method to fetch a single comment by ID
	async show(id: string | number): Promise<Comment | null> {
		try {
			const sql = 'SELECT * FROM comments WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();

			if (result.rows.length) {
				return result.rows[0];
			} else {
				return null;
			}
		} catch (err) {
			throw new Error(`Could not find comment ${id}. Error: ${err}`);
		}
	}
}
