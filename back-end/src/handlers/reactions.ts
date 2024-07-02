// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';


const Reaction: Element = {
	name: 'reaction',
	secure: {
		index: false,
		show: false,
		create: true,
		update: true,
		remove: true,
	}
};

// Building endpoints
const reactionRoutes = (app: express.Application): void => {
	new CRUDRoutes(Reaction, app)
};


// Allowing routes to be called
export default reactionRoutes;
