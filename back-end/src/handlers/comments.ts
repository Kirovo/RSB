// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Comment, CommentStore } from '../models/comment';
import userAccreditation from '../utilities/userAccreditation';
import { CRUD } from "../types/CRUDSenarioType";
import { errorDisplayer } from '../services/errorDisplayer';
import { CRUDHandlerError } from '../errors/CRUDError';



// Building endpoints
const commentRoutes = (app: express.Application): void => {
	app.get('/index-comments', index);
	app.post('/comment', create);
	app.delete('/comment', remove)
};

// Creating a reference to the PostStore class
const store = new CommentStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {

	try {

		try{
			store.CRUDSenario.crud = CRUD.Index

			const allActivityComments = await store.index();

			res.status(200);
			res.json(allActivityComments);
		}
		catch {

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
};


const create = async (req: Request, res: Response) => {

	try {

		try {

			const comment: Comment = {
				id_post: req.body.id_post,
				id_profile : res.locals.id, // id_profile from userAccreditation middleware
				content: req.body.content
			}

			store.CRUDSenario.crud = CRUD.Create

			const NewComment = await store.create(comment);

			res.status(205);
			res.json(NewComment);
		} 
		catch{

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
};


const remove = async (req: Request, res: Response) => {

	try {

		try {

			const comment: Comment = {
				id: req.query.id_comment as string,
				id_post: req.query.id_post as string,
				id_profile : res.locals.id,
			}

			const deleteComment = await store.remove(comment)

			res.status(205);
			res.json(deleteComment);
		}
		catch (err){

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
}


// Allowing routes to be called
export default commentRoutes;
