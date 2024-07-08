// Import every module to make a handler from post model
import express from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';
import { comment } from './comments';
import { reaction } from './reactions';

export const post: Element = {
	name: 'post',
	secure: {
		index: false,
		show: false,
		create: true,
		update: true,
		remove: true,
	},
	childElements: [
		comment, 
		reaction
	]
};

// Building endpoints
const postRoutes = (app: express.Application): void => {
	 new CRUDRoutes(post, app)
};

// Creating a reference to the PostStore class

// // Creating relation between routes and database
// const index = async (_req: Request, res: Response) => {
// 	try {
// 		const posts = await store.index();
// 		res.json(posts);
// 	}
// 	catch (err) {
// 		throw err;
// 	}
// };

// // Handler for fetching a single post by ID
// const show = async (req: Request, res: Response) => {
// 	try {
// 		const postId = req.params.id; // Get the ID from the route parameter
// 		const post = await store.show(postId); // Assuming there's a show method in PostStore

// 		res.status(200);
// 		res.json(post);
// 	} catch (err) {
// 		console.log(`Error fetching post: ${err}`);
// 		res.status(400);
// 		res.json(err as string);
// 	}
// }

// const create = async (req: Request, res: Response) => {


// 	try {

// 		const post: Post = {
// 			id_profile: res.locals.id,
// 			topic: req.body.topic,
// 		}

// 		const newPost = await store.create(post);
// 		res.status(200);
// 		res.json(newPost);

// 	}
// 	catch (err) {

// 		console.log(`unable create post: ${err}`);
// 		res.status(400);
// 		res.json((err as string));
// 		return;
// 	}
// };

// const remove = async (req: Request, res: Response) => {


// 	try {
// 		await store.remove(req.params.id)
// 		res.status(205);
// 		res.json('deleted');
// 	}
// 	catch (err) {
// 		res.status(400);
// 		res.json(err as string);
// 		return;
// 	}
// }




// Allowing routes to be called
export default postRoutes;
