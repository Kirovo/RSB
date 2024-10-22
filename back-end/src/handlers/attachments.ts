// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Attachment, AttachmentStore } from '../models/attachment';
import userAccreditation from '../utilities/userAccreditation';
import multer from 'multer';
import path from 'path';
import { promises as fsPromises } from 'fs'
import { Element } from '../models/CRUDModel';


const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, './images')
	},
	filename: function (_req, file, cb) {
		cb(null, file.originalname)
	}
})

export const attachment: Element = {
	name: 'attachment',
	CRUDOperation: {
		index: { security: 'user' },
		show: { security: 'user' },
		create: { security: 'user' },
		update: { security: 'user' },
		remove: { security: 'user' }
	}
}

const upload = multer({ storage: storage });

// Building endpoints
const attachmentRoutes = (app: express.Application): void => {
	app.get('/index-attachments', index);
	app.get('/attachment/post/:id', postImagesReader);
	app.get('/attachment/profile/:id', profileImagesReader);
	app.get('/attachment/profile/background/:id', backgroundImagesReader);
	app.post('/attachment/post', upload.single('file'), createPostImage);
	app.post('/attachment/profile', upload.single('file'), createProfileImage);
	app.post('/attachment/profile/background', upload.single('file'), createBackgroundImage);
	app.put('/attachment/post', upload.single('file'), updatePostImage);
	app.put('/attachment/profile', upload.single('file'), updateProfileImage);
	app.put('/attachment/profile/background', upload.single('file'), updateBackgroundImage);
	app.delete('/attachment', remove);


};

// Creating a reference to the PostStore class
const store = new AttachmentStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {


	try {

		const allActivityAttachments = await store.index();

		res.status(200);
		res.json(allActivityAttachments);
	}
	catch (err) {

	}
};


const createPostImage = async (req: Request, res: Response) => {



	try {

		const attachment: Attachment = {
			id_post: req.body.id_post,
			path: req.file?.path,
			filename: req.file?.filename,
			mime: req.file?.mimetype,
			type: 'post'
		}


		const NewAttachment = await store.createPostImage(attachment);

		res.status(205);
		res.json(NewAttachment);
	}
	catch (err) {

	}
};

const createProfileImage = async (req: Request, res: Response) => {
	try {

		try {

			const attachment: Attachment = {
				id_profile: req.body.id_profile,
				path: req.file?.path,
				filename: req.file?.filename,
				mime: req.file?.mimetype,
				type: 'profile'
			}


			const NewAttachment = await store.createProfileImage(attachment);

			res.status(205);
			res.json(NewAttachment);
		}
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}
	catch (err) {

		throw new Error(`unable get posts: ${err}`);
	}
};

const createBackgroundImage = async (req: Request, res: Response) => {

	try {

		try {

			const attachment: Attachment = {
				id_profile: req.body.id_profile,
				path: req.file?.path,
				filename: req.file?.filename,
				mime: req.file?.mimetype,
				type: 'background'
			}


			const NewAttachment = await store.createBackgroundImage(attachment);

			res.status(205);
			res.json(NewAttachment);
		}
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}
	catch (err) {
		throw new Error(`unable get posts: ${err}`);
	}

};

const updatePostImage = async (req: Request, res: Response) => {


	try {

		const attachment: Attachment = {
			id_post: req.body.id_post,
			path: req.file?.path,
			filename: req.file?.filename,
			mime: req.file?.mimetype,
			type: 'post'
		}

		const NewAttachment = await store.updatePostImage(attachment)

		res.status(205);
		res.json(NewAttachment);
	}
	catch (err) {

		throw new Error(`unable get posts: ${err}`);
	}
}

const updateProfileImage = async (req: Request, res: Response) => {

	try {

		const attachment: Attachment = {
			id_profile: req.body.id_profile,
			path: req.file?.path,
			filename: req.file?.filename,
			mime: req.file?.mimetype,
			type: 'profile'
		}

		const NewAttachment = await store.updateProfileImage(attachment);

		res.status(205);
		res.json(NewAttachment);
	}
	catch (err) {

		throw new Error(`unable get posts: ${err}`);
	}
}

const updateBackgroundImage = async (req: Request, res: Response) => {

	try {

		try {

			const attachment: Attachment = {
				id_profile: req.body.id_profile,
				path: req.file?.path,
				filename: req.file?.filename,
				mime: req.file?.mimetype,
				type: 'background'
			}

			const NewAttachment = await store.updateBackgroundImage(attachment);

			res.status(205);
			res.json(NewAttachment);
		}
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}
	catch (err) {

		throw new Error(`unable get posts: ${err}`);
	}
}


const remove = async (req: Request, res: Response) => {

	try {

		try {

			const attachment: Attachment = {
				id: req.query.id_attachment as string,
				id_post: req.query.id_post as string,
				id_profile: res.locals.id,
			}

			const deleteAttachment = await store.remove(attachment)

			res.status(205);
			res.json(deleteAttachment);
		}
		catch (err) {

			throw new Error(`unable get posts: ${err}`);
		}
	}
	catch (err) {

		throw new Error(`unable get posts: ${err}`);
	}
}

const postImagesReader = async (req: Request, res: Response) => {
	try {
		const attachment = await store.postImagesReader(req.params.id);
		if (attachment) {
			const field = path.normalize('D:/ProjetsDéveloppementsWeb/RSB/back-end/' + attachment.path)
			await fsPromises.readFile(field)
			res.sendFile(field)
		}
	}
	catch (err) {
		throw new Error('unable to read the file :' + err)
	}
};

const profileImagesReader = async (req: Request, res: Response) => {
	try {
		const attachment = await store.profileImagesReader(req.params.id);
		if (attachment) {
			const field = path.normalize('D:/ProjetsDéveloppementsWeb/RSB/back-end/' + attachment.path)
			await fsPromises.readFile(field)
			res.sendFile(field)
		}
	}
	catch (err) {
		throw new Error('unable to read the file :' + err)
	}

};

const backgroundImagesReader = async (req: Request, res: Response) => {
	try {
		const attachment = await store.backgroundImagesReader(req.params.id);
		if (attachment) {
			const field = path.normalize('D:/ProjetsDéveloppementsWeb/RSB/back-end/' + attachment.path)
			await fsPromises.readFile(field)
			res.sendFile(field)
		}
	}
	catch (err) {
		throw new Error('unable to read the file :' + err)
	}
}


// Allowing routes to be called
export default attachmentRoutes;
