// Importing client of database to connect to
import client from '../database';




// Creating products's class with CRUD and addProducts functions
export class FriendStore {

	async remove(id_profile: number | string, id_friend: number | string): Promise<boolean> {
		try {
			const sql =
				'DELETE FROM friends WHERE (id_profile=($1) AND id_friend=($2)) OR (id_profile=($2) AND id_friend=($1))';
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile, id_friend]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`not removed friend: ${err}`);
		}
	}

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

	async acceptFriend(id_profile: number | string, id_friend: number | string): Promise<boolean> {
		try {
			const sql = 'UPDATE friends SET status = $1 WHERE id_profile = $2 AND id_friend = $3';
			const conn = await client.connect();
			const result = await conn.query(sql, ['friends', id_profile, id_friend]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`not accepted friend: ${err}`);
		}
	}

	async getFriendsRequest(id_profile: number | string): Promise<any[]> {
		try {
			const sql =
				`SELECT * FROM profiles WHERE id IN (SELECT id_profile FROM friends WHERE id_friend=($1) AND status = 'request')`;
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile]);
			const res = result.rows;
			conn.release();
			return res;
		}
		catch (err) {
			return [];
		}
	}

	async getFriends(id_profile: number | string): Promise<any[]> {
		try {
			const sql =
				`SELECT * FROM profiles WHERE id IN (SELECT id_profile FROM friends WHERE id_friend=($1) AND status = 'friends' UNION SELECT id_friend FROM friends WHERE id_profile=($1) AND status = 'friends')`;
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile]);
			const res = result.rows;
			conn.release();
			return res;
		}
		catch (err) {
			return [];
		}
	}

	async getPendingRequest(id_profile: number | string): Promise<any[]> {
		try {
			const sql =
				`SELECT * FROM profiles WHERE id IN (SELECT id_friend FROM friends WHERE id_profile=($1) AND status = 'request')`;
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile]);
			const res = result.rows;
			conn.release();
			return res;
		}
		catch (err) {
			return [];
		}
	}

	async getSuggestedProfiles(id_profile: number | string): Promise<any[]> {
		try {
			const sql =
				`SELECT * FROM profiles WHERE id <> ($1) AND id NOT IN (SELECT id_profile FROM friends WHERE id_friend=($1) UNION SELECT id_friend FROM friends WHERE id_profile=($1))`;
			const conn = await client.connect();
			const result = await conn.query(sql, [id_profile]);
			const res = result.rows;
			conn.release();
			return res;
		}
		catch (err) {
			return [];
		}
	}


}
