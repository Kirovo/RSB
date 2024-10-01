// Importing client of database to connect to
import client from '../database';


export type Comment = {
	id?: string | number;
	id_post?: string | number;
	id_profile? : string | number;
	content?: string;
}


// Creating products's class with CRUD and addProducts functions
export class CommentStore {

	
}
