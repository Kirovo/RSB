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


export class PostStore {
	
	
}
