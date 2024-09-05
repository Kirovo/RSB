// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';



export const comment: Element = {
	name: 'comment',
	CRUDOperation: {
		index: {security: 'user'},
		show: {security: 'user'},
		create: {security: 'user'},
		update: {security: 'user'},
		remove: {security: 'user'},
	}
};

// Building endpoints
const commentRoutes = (app: express.Application): void => {
	 new CRUDRoutes(comment, app)
};

// Allowing routes to be called
export default commentRoutes;
