// Importing client of database to connect to
import client from '../database';
import { CRUDModelError } from '../errors/CRUDError';
import { ActivityAction, CRUDSenario } from "../types/CRUDSenarioType";



export type Attachment = {
	id?: string | number;
	id_post?:string | number;
	id_profile?: string | number;
	path? : string;
    filename?: string;
	mime? : string;
}


// Creating products's class with CRUD and addProducts functions
export class AttachmentStore {

	public CRUDSenario: CRUDSenario = {
		crud: undefined,
		activityAction: ActivityAction.Attachment
	}

	async index(): Promise<Attachment[]> {

		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments ORDER BY attachments.id DESC;';
				const result = await conn.query(sql);
			conn.release();

			return result.rows;
		}
		catch {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	async create(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'INSERT INTO attachments (id_post, path, filename, mime) VALUES($1, $2, $3, $4) RETURNING *;'
				const result = await conn.query(sql2, [a.id_post,a.path,a.filename,a.mime]);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
		}
	}

	async remove(a:Attachment) : Promise<Attachment[]> {

		try {

			const conn = await client.connect();
				const sql =
					'DELETE FROM attachments WHERE id=($1) AND id_profile=($2) RETURNING*;'
				const result = await conn.query(sql,[a.id,a.id_profile]);
			conn.release();

			return result.rows
		}
		catch (err) {

			throw new CRUDModelError(this.CRUDSenario)
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
