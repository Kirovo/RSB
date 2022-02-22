// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import {Comment, CommentStore } from '../models/comment';
import tokenReader from '../utilities/tokenReader';



// Building endpoints
const commentRoutes = (app: express.Application): void => {
	app.get('/index-comments', index);
	app.post('/comment',create);
	app.delete('/comment' , deleteCom)
};

// Creating a reference to the PostStore class
const store = new CommentStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	try{
		const comments = await store.index();
		res.json(comments);
	}
	catch(err) {
		throw new Error(`unable to index comments: ${err}`)
	}
};

const create = async (req: Request, res: Response) => {

	try {
		const comment: Comment = {
			id_post: req.body.id_post,
			id_profile : res.locals.id, // id_profile from tokenReader middleware
			content: req.body.content
		}

		const comments = await store.create(comment);
		res.json(comments);

	} 
	catch(err){
		throw new Error(`unable to create comment: ${err}`)
	}
};

const deleteCom = async (req: Request, res: Response) => {


	try {
		await store.deleteCom(req.query.id_post as string,req.query.id_comment as string)
		res.status(204);
		res.json('deleted');
	}
	catch (err){
		res.status(400);
		res.json(err as string);
		return;
	}
}

// Allowing routes to be called
export default commentRoutes;
