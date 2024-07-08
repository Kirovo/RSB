import client from '../database';


export type Element = {
    name: string; // In lowercase, used as endpoint
    secure: {
        index: boolean;
        show: boolean;
        create: boolean;
		update: boolean;
        remove: boolean;
    }
}

export class CRUDModel {
    public element: Element;

    constructor(element: Element) {
        this.element = element;
    }
	indexInDB: () => Promise<any> = async () => {

		try {
			const conn = await client.connect();
			const sql = `SELECT * FROM ${this.element.name}s ORDER BY ${this.element.name}s.id DESC;`
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		}
		catch (err) {

			throw new Error(`Could not find ${this.element.name}s. Error: ${err}`);
		}
	}

	showInDB: (id: string | number) => Promise<any> = async (id: string | number) => {

		try {
			const sql = `SELECT * FROM ${this.element.name}s WHERE id=($1)`;
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();

			if (result.rows.length) {
				return result.rows[0];
			} else {
				return null;
			}
		} catch (err) {
			throw new Error(`Could not find ${this.element.name} ${id}. Error: ${err}`);
		}
	}

	createInDB: (body: any) => Promise<any> = async (body: any) => {
		try {
			const conn = await client.connect();
			const columns = Object.keys(body).join(', ');
			const values = Object.values(body);
			const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
			const sql = `INSERT INTO ${this.element.name}s (${columns}) VALUES (${placeholders}) RETURNING *;`;
			const result = await conn.query(sql, values);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not create ${this.element.name}. Error: ${err}`);
		}
	}

	updateInDB: (id: string | number, body: any) => Promise<any> = async (id, body) => {
		try {
			const conn = await client.connect();
			const columns = Object.keys(body).map((key, index) => `${key}=$${index + 2}`).join(', ');
			const values = Object.values(body);
			const sql = `UPDATE ${this.element.name}s SET ${columns} WHERE id=$1 RETURNING *;`;
			const result = await conn.query(sql, [id, ...values]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not update ${this.element.name} with ID ${id}. Error: ${err}`);
		}
	}
	
	removeInDB: (id: string | number) => Promise<any> = async (id: string | number) => {
		try {
			const conn = await client.connect();
			const sql = `DELETE FROM ${this.element.name}s WHERE id=($1) RETURNING *;`;
			const result = await conn.query(sql, [id]);
			conn.release();
			if (result.rows.length) {
				return result.rows[0];
			} else {
				return null;
			}
		} catch (err) {
			throw new Error(`Could not delete ${this.element.name} with ID ${id}. Error: ${err}`);
		}

	}
	// removeInDB: () => Promise<any> = async () => {
	// 	try {
	// 		const conn = await client.connect();
	// 		let sql =
	// 			'DELETE FROM reactions WHERE id_post=($1);'
	// 		await conn.query(sql, [id]);
	// 		sql =
	// 			'DELETE FROM attachments WHERE id_post=($1);'
	// 		await conn.query(sql, [id]);
	// 		sql =
	// 			'DELETE FROM comments WHERE id_post=($1);'
	// 		await conn.query(sql, [id]);
	// 		sql =
	// 			'DELETE FROM posts WHERE id=($1);'
	// 		await conn.query(sql, [id]);
	// 		conn.release();
	// 	} catch (err) {
	// 		throw new Error(`unable delete post: ${err}`);
	// 	}
	// }


}




