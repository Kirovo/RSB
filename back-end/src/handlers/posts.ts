// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Post, PostStore } from '../models/post';
import userAccreditation from '../utilities/userAccreditation';
import { CRUD } from "../types/CRUDSenarioType";



// Building endpoints
const postRoutes = (app: express.Application): void => {
	app.get('/index-posts', index);
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
		res.status(200);
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



// Allowing routes to be called
export default postRoutes;
