// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';



export const comment: Element = {
	name: 'comment',
	secure: {
		index: false,
		show: false,
		create: true,
		update: true,
		remove: true,
	}
};

// Building endpoints
const commentRoutes = (app: express.Application): void => {
	 new CRUDRoutes(comment, app)
};

// Allowing routes to be called
export default commentRoutes;
