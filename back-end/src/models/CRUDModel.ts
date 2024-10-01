import client from '../database';


export type Element = {
	name: string; // In lowercase, used as endpoint
	CRUDOperation: {
		index?: {security: string};
		show?: {security: string};
		create?: {security: string};
		update?: {security: string};
		remove?: {security: string};
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

	showInDB: (id: string | number) => Promise<any> = async (id: string | number) => {
		const fetchChildElements: (conn: any, element: Element, id: string | number) => Promise<any> = async (conn: any, element: Element, id: string | number) => {
			if (element.childElements) {
				let results = {};
				for (const childElement of element.childElements) {

					const sql = `SELECT * FROM ${childElement.name}s WHERE id_${element.name}=($1) ORDER BY id DESC;`;
					const result = await conn.query(sql, [id]);
					// Recursively fetch sub-elements of sub-elements
					const subresult = []
					for (const row of result.rows) {
						const childResults = await fetchChildElements(conn, childElement, row.id);
						subresult.push({ ...row, ...childResults });
					}
					results = { ...results, [childElement.name]: subresult };
					// Fetch the current sub-element

				}
				return results;
			}
			return {};
		};

		try {
			if (id === 'null' || id === 'undefined') {
				return {};
			}
			const conn = await client.connect();
			const sql = `SELECT * FROM ${this.element.name}s WHERE id=($1);`;
			const result = await conn.query(sql, [id]);
			if (result.rows.length === 0) {
				throw new Error(`No ${this.element.name} found with ID ${id}`);
			}
			const parentObject = result.rows[0]
			const childObjects = await fetchChildElements(conn, this.element, id);
			conn.release();
			return { [this.element.name]: { ...parentObject, ...childObjects } };
		} catch (err) {
			const error = new Error(`Could not find ${this.element.name} ${id}. Error: ${err}`);
			console.log(error)
			throw error;
		}
	}

	showChildInDB: (id: string | number, childName: string) => Promise<any> = async (id: string | number, childName: string) => {
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

			// Recursively delete all sub-elements
			//await deletechildElements(conn, this.element, id);

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
