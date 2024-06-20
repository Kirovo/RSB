// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Reaction, ReactionStore } from '../models/reaction';
import userAccreditation from '../utilities/userAccreditation';
import { CRUD } from "../types/CRUDSenarioType";




// Building endpoints
const reactionRoutes = (app: express.Application): void => {
	app.get('/index-reactions', index);
	app.post('/reaction', userAccreditation, create);
};

// Creating a reference to the PostStore class
const store = new ReactionStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	try {
		const reactions = await store.index();
		res.json(reactions);
	}
	catch (err) {
		throw new Error(`unable to index reactions: ${err}`)
	}
};

const create = async (req: Request, res: Response) => {

	try {
		const reaction: Reaction = {
			id_post: req.body.id_post,
			id_profile: res.locals.id // id_profile from userAccreditation middleware
		}

		const reactions = await store.create(reaction);
		res.json(reactions);

	}
	catch (err) {
		throw new Error(`unable to create reaction: ${err}`)
	}
};


// Allowing routes to be called
export default reactionRoutes;
