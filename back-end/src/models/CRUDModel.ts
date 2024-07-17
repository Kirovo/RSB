import client from '../database';


export type Element = {
	name: string; // In lowercase, used as endpoint
	secure: {
		index: boolean;
		show: boolean;
		create: boolean;
		update: boolean;
		remove: boolean;
	},
	childElements?: Element[];
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

	indexChildInDB: (id: string | number, childName: string) => Promise<any> = async (id: string | number, childName: string) => {
		try {
			if (this.element.childElements) {

					const sql = `SELECT * FROM ${childName} WHERE id_${this.element.name}=($1) ORDER BY ${childName}.id DESC;`;
					const conn = await client.connect();
					const result = await conn.query(sql, [id]);
					conn.release();
				return result.rows;
			}
			
			else {
				throw new Error(`No child elements for ${this.element.name}`);
			}
		}
		catch (err) {
			throw new Error(`Could not find ${this.element.name}s from ${this.element.name}. Error: ${err}`);
		}
	}

	showInDB: (id: string | number) => Promise<any> = async (id: string | number) => {

		try {
			if (this.element.childElements) {
				const results = [];
				for (const childElement of this.element.childElements) {
					const sql = `SELECT * FROM ${childElement.name}s WHERE id_${this.element.name}=($1);`;
					const conn = await client.connect();
					const result = await conn.query(sql, [id]);
					conn.release();
					results.push({ [childElement.name]: result.rows });
				}
				return results;
			}
			else {
				throw new Error(`No child elements for ${this.element.name}`);
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
		const deletechildElements = async (conn: any, element: Element, id: string | number) => {
			if (element.childElements) {
				console.log(element.childElements)
				for (const childElement of element.childElements) {
					// Recursively delete sub-elements of sub-elements
					await deletechildElements(conn, childElement, id);

					// Delete the current sub-element
					const sql = `DELETE FROM ${childElement.name}s WHERE id_${element.name}=($1) RETURNING *;`;
					await conn.query(sql, [id]);
				}
			}
		};

		try {
			const conn = await client.connect();

			// Recursively delete all sub-elements
			await deletechildElements(conn, this.element, id);

			// Delete the main element
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



