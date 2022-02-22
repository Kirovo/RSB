// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Post, PostStore } from '../models/post';
import multer from 'multer';
import tokenReader from '../utilities/tokenReader';
import {promises as fsPromises} from 'fs'
import path from 'path'

const storage = multer.diskStorage({
	destination: function(_req,_file,cb){
		cb(null,'./images')
	},
	filename: function (_req,file,cb){
		cb(null, file.originalname)
	}
})

const upload = multer({storage:storage});
// Building endpoints
const postRoutes = (app: express.Application): void => {
	app.get('/index-posts', index);
	app.get('/attachment/:id', fileReader)
	app.post('/post', upload.single('file'), tokenReader, create);
	app.delete('/post/:id', deletePost)
};

// Creating a reference to the PostStore class
const store = new PostStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {
	try{
		const posts = await store.index();
		res.json(posts);
		}
	catch(err) {
		throw err;
	}
};

const fileReader = async (req: Request, res: Response) => {
	try{
		const attachment = await store.fileReader(req.params.id);
		if (attachment.path !== null) {
		const field = path.normalize('C:/Users/Kirovo/Desktop/Entrainement/reseaux-social-benevole/back-end/'+ attachment.path)
		await fsPromises.readFile(field)
		res.sendFile(field)
		}
	}
	catch (err){ 
		throw new Error('unable to read the file :' + err)
	}
};


const create = async (req: Request, res: Response) => {

	const id_user = res.locals.id // For the moment id_user is id_profile too

	const id_profile = id_user // ... According to the previous statement

	const post: Post = {
		id_profile: id_profile,
		topic: req.body.topic,
		path : req.file?.path,
		filename : req.file?.filename,
		mime : req.file?.mimetype
	} 

	try {
		
		const newPost = await store.create(post);
		res.status(204);
		res.json(newPost);
	} catch (err) {

		console.log(`unable create post: ${err}`);
		res.status(400);
		res.json((err as string) + post);
		return;
	}
};

const deletePost = async (req: Request, res: Response) => {


	try {
		await store.deletePost(req.params.id)
		res.status(205);
		res.json('deleted');
	}
	catch (err){
		res.status(400);
		res.json(err as string);
		return;
	}
}

// Allowing routes to be called
export default postRoutes;
