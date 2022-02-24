// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Post, PostStore } from '../models/post';
import userAccreditation from '../utilities/userAccreditation';
import {promises as fsPromises} from 'fs'
import path from 'path'
import { CRUD } from "../types/CRUDSenarioType";



// Building endpoints
const postRoutes = (app: express.Application): void => {
	app.get('/index-posts', index);
	app.get('/attachment/:id', fileReader)
	app.post('/post',  userAccreditation, create);
	app.delete('/post/:id', remove)
};

// Creating a reference to the PostStore class
const store = new PostStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	try{
		const posts = await store.index();
		res.json(posts);
		}
	catch(err) {
		throw err;
	}
};

const create = async (req: Request, res: Response) => {


	try {

		const post: Post = {
			id_profile: res.locals.id,
			topic: req.body.topic,
		} 

		const newPost = await store.create(post);
		res.status(204);
		res.json(newPost);

	}
	catch (err) {

		console.log(`unable create post: ${err}`);
		res.status(400);
		res.json((err as string));
		return;
	}
};

const remove = async (req: Request, res: Response) => {


	try {
		await store.remove(req.params.id)
		res.status(205);
		res.json('deleted');
	}
	catch (err){
		res.status(400);
		res.json(err as string);
		return;
	}
}

const fileReader = async (req: Request, res: Response) => {
	try{
		const attachment = await store.fileReader(req.params.id);
		if (attachment.path !== null) {
		const field = path.normalize('C:/Users/Kirovo/Desktop/Entrainement/reseaux-social-benevole/back-end/'+ attachment.path)
		await fsPromises.readFile(field)
		res.sendFile(field)
		}
	}
	catch (err){ 
		throw new Error('unable to read the file :' + err)
	}
};

// Allowing routes to be called
export default postRoutes;
