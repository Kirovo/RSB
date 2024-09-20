// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';



export const friend: Element = {
	name: 'friend',
	CRUDOperation: {
		index: {security: 'public'},
		show: {security: 'public'},
		create: {security: 'public'},
		update: {security: 'public'},
		remove: {security: 'public'}
	}
};

// Building endpoints
const friendRoutes = (app: express.Application): void => {
	new CRUDRoutes(friend, app)
};

// Allowing routes to be called
export default friendRoutes;
