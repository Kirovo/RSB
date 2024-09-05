// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';



export const friend: Element = {
	name: 'friend',
	CRUDOperation: {
		index: {security: 'user'},
		show: {security: 'user'},
		create: {security: ''},
		update: {security: 'user'},
		remove: {security: 'user'}
	}
};

// Building endpoints
const friendRoutes = (app: express.Application): void => {
	new CRUDRoutes(friend, app)
};

// Allowing routes to be called
export default friendRoutes;
