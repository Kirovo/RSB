import { Request, Response } from 'express';
import { CRUDModel } from '../models/CRUDModel';
import { Element } from '../models/CRUDModel';


export class CRUDHandler extends CRUDModel {
    private model: CRUDModel;
    constructor(element: Element) {
        super(element);
        this.element = element;
        this.model = new CRUDModel(this.element);
        
    }


    // Creating relation between routes and database
    index = async (_req: Request, res: Response) => {
        try {
            const result = await this.model.indexInDB();
            res.json(result);
        }
        catch (err) {
            throw err;
        }
    };

    show = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await this.model.showInDB(id);
            res.json(result);
        }
        catch (err) {
            throw err;
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            
            const body = {id_profile: res.locals.id, ...req.body};
            console.log(body);
            const result = await this.model.createInDB(body);
            res.json(result);
        }
        catch (err) {
            throw err;
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = {id_profile: res.locals.id, ...req.body};

            const result = await this.model.updateInDB(id, body);
            res.json(result);
        }
        catch (err) {
            throw err;
        }
    }

    remove = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            
            const result = await this.model.removeInDB(id);
            res.json(result);
        }
        catch (err) {
            throw err;
        }
    }


}