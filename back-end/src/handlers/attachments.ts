// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { Attachment, AttachmentStore } from '../models/attachment';
import userAccreditation from '../utilities/userAccreditation';
import { CRUD } from "../types/CRUDSenarioType";
import { errorDisplayer } from '../services/errorDisplayer';
import { CRUDHandlerError } from '../errors/CRUDError';
import multer from 'multer';


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
const attachmentRoutes = (app: express.Application): void => {
	app.get('/index-attachments', index);
	app.post('/attachment', upload.single('file'), userAccreditation, create);
	app.delete('/attachment', remove)
};

// Creating a reference to the PostStore class
const store = new AttachmentStore();

// Creating relation between routes and database
const index = async (_req: Request, res: Response) => {

	try {

		try{
			store.CRUDSenario.crud = CRUD.Index

			const allActivityAttachments = await store.index();

			res.status(204);
			res.json(allActivityAttachments);
		}
		catch {

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
};


const create = async (req: Request, res: Response) => {

	try {

		try {

			const attachment: Attachment = {
				id_post: req.body.id_post,
				id_profile : res.locals.id, // id_profile from userAccreditation middleware
			}

			store.CRUDSenario.crud = CRUD.Create

			const NewAttachment = await store.create(attachment);

			res.status(205);
			res.json(NewAttachment);
		} 
		catch{

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
};


const remove = async (req: Request, res: Response) => {

	try {

		try {

			const attachment: Attachment = {
				id: req.query.id_attachment as string,
				id_post: req.query.id_post as string,
				id_profile : res.locals.id,
			}

			const deleteAttachment = await store.remove(attachment)

			res.status(205);
			res.json(deleteAttachment);
		}
		catch (err){

			throw new CRUDHandlerError(store.CRUDSenario)
		}
	}
	catch (err) {

		errorDisplayer(err,res)
	}
}


// Allowing routes to be called
export default attachmentRoutes;
