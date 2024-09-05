// Importing client of database to connect to
import client from '../database';




// Creating products's class with CRUD and addProducts functions
export class FriendStore {

	async isfriend(id_profile: number | string, id_friend: number | string): Promise<boolean> {
		try {
			const sql =
				'SELECT * FROM friends WHERE id_profile=($1) AND id_friend=($2)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile, id_friend]);
			const res = result.rows[0];
			conn.release();
			if (res) {
				return true;
			}
			else {
				return false;
			}
		} catch (err) {
			throw new Error(`not friend: ${err}`);
		}
	}

}
