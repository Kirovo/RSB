// Importing client of database to connect to
import client from '../database';



export type Attachment = {
	id?: string | number;
	id_post?:string | number;
	id_profile?: string | number;
	path? : string;
    filename?: string;
	mime? : string;
	type? : string;
}


// Creating products's class with CRUD and addProducts functions
export class AttachmentStore {



	async index(): Promise<Attachment[]> {

		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments ORDER BY attachments.id DESC;';
				const result = await conn.query(sql);
			conn.release();

			return result.rows;
		}
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}

	async createPostImage(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'INSERT INTO attachments (id_post, path, filename, mime, type) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
				const result = await conn.query(sql2, [a.id_post,a.path,a.filename,a.mime,'post']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}

	async createProfileImage(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'INSERT INTO attachments (id_profile, path, filename, mime, type) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
				const result = await conn.query(sql2, [a.id_profile,a.path,a.filename,a.mime,'profile']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable to update profile image: ${err}`);
		}
	}

	async createBackgroundImage(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'INSERT INTO attachments (id_profile, path, filename, mime, type) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
				const result = await conn.query(sql2, [a.id_profile,a.path,a.filename,a.mime,'background']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable to update background image: ${err}`);
		}
	}

	async updatePostImage(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'UPDATE attachments SET path = $2, filename = $3, mime = $4 WHERE id_post = $1 AND type = $5 RETURNING *;'
				const result = await conn.query(sql2, [a.id_post,a.path,a.filename,a.mime,'post']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable to update post image: ${err}`);
		}
	}
	
	async updateProfileImage(a : Attachment) : Promise<Attachment[]>{

		try {
			console.log('updateProfileImage');
			const conn = await client.connect();
				const sql2 =
					'UPDATE attachments SET path = $2, filename = $3, mime = $4 WHERE id_profile = $1 AND type = $5 RETURNING *;'
				const result = await conn.query(sql2, [a.id_profile,a.path,a.filename,a.mime,'profile']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable to update profile image: ${err}`);
		}
	}
	async updateBackgroundImage(a : Attachment) : Promise<Attachment[]>{

		try {

			const conn = await client.connect();
				const sql2 =
					'UPDATE attachments SET path = $2, filename = $3, mime = $4 WHERE id_profile = $1 AND type = $5 RETURNING *;'
				const result = await conn.query(sql2, [a.id_profile,a.path,a.filename,a.mime,'background']);
			conn.release();

			return result.rows;
		} 
		catch (err) {

			throw new Error(`unable to update background image: ${err}`);
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

			throw new Error(`unable get posts: ${err}`);
		}
	}
	async postImagesReader(id: string | number): Promise<Attachment> {
		
		try {

			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments WHERE id_post=$1 AND type=$2;';
				const result = await conn.query(sql,[id,'post']);
			conn.release(result.rows[0]);

			return result.rows[0];
		}
		catch (err) {
			throw new Error(`unable get posts: ${err}`);
		}
	}
	async profileImagesReader(id: string | number): Promise<Attachment> {
		
		try {
			console.log('porfile_id_proflie',id);
			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments WHERE id_profile=$1 AND type=$2;';
				const result = await conn.query(sql,[id,'profile']);
			conn.release(result.rows[0]);
			console.log('profilerow[0]',result.rows[0]);

			return result.rows[0];
		}
		catch (err) {
			throw new Error(`unable get posts: ${err}`);
		}
	}
	async backgroundImagesReader(id: string | number): Promise<Attachment> {
		
		try {
			console.log('background_id_profile',id);
			const conn = await client.connect();
				const sql =
					'SELECT * FROM attachments WHERE id_profile=$1 AND type=$2;';
				const result = await conn.query(sql,[id,'background']);
			conn.release(result.rows[0]);
			console.log('backgroundrow[0]',result.rows[0]);

			return result.rows[0];
		}
		catch (err) {
			throw new Error(`unable get posts: ${err}`);
		}
	}
}
