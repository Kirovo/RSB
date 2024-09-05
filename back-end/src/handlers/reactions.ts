// Import every module to make a handler from post model
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';
import  userAccreditation  from '../utilities/userAccreditation'
import express, { Request, Response } from 'express';
import { Reaction, ReactionStore } from '../models/reaction';

export const reaction: Element = {
	name: 'reaction',
	CRUDOperation: {
		index: {security: 'user'},
		show: {security: 'user'},
		create: {security: 'user'},
		update: {security: 'user'},
		remove: {security: 'user'}
	}
};





// Building endpoints
const reactionRoutes = (app: express.Application): void => {
	new CRUDRoutes(reaction, app)
	app.post('/trigger-reaction', userAccreditation ,triggerReaction);
};

// Creating a reference to the PostStore class
const store = new ReactionStore();


const triggerReaction = async (req: Request, res: Response) => {

	try {
		const reaction: Reaction = {
			id_post: req.body.id_post,
			id_profile: res.locals.id // id_profile from userAccreditation middleware
		}
		const reactions = await store.triggerReaction(reaction);
		res.json(reactions);

	}
	catch (err) {
		throw new Error(`unable to create reaction: ${err}`)
	}

};


// Allowing routes to be called
export default reactionRoutes;
