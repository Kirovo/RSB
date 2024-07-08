import express, { Request, Response, NextFunction } from 'express';
import userAccreditation from '../utilities/userAccreditation';
import { CRUDHandler } from '../handlers/CRUDHandler';
import { Element } from '../models/CRUDModel';

export class CRUDRoutes extends CRUDHandler {
    private app: express.Application;
    private handler: CRUDHandler;
    constructor(element: Element, app: express.Application) {
        super(element);
        this.element = element;
        this.app = app;
        this.handler = new CRUDHandler(element);
        this.routes();
        
    }

    routes = (): void => {
        this.app.get(`/${this.element.name}s`, this.indexMiddleware, this.handler.index);
        this.app.get(`/${this.element.name}/:id`, this.showMiddleware, this.handler.show); // New route for fetching a single post by ID
        this.app.post(`/${this.element.name}`, this.createMiddleware, this.handler.create);
        this.app.delete(`/${this.element.name}/:id`, this.removeMiddleware, this.handler.remove);
        this.app.put(`/${this.element.name}/:id`, this.updateMiddleware, this.handler.update);
    }

    indexMiddleware = (req: Request, res: Response, next: NextFunction): void => {

        if (this.element.secure.index) {
            userAccreditation(req, res, next);
        }
        else {
            next();
        }
        
    
    };

    showMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.secure.show) {
            userAccreditation(req, res, next);
        }
        else {
            next();
        }
    }

    createMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.secure.create) {
            userAccreditation(req, res, next);
        }
        else {
            next();
        }
    }
    
    updateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.secure.update) {
            userAccreditation(req, res, next);
        }
        else {
            next();
        }
    }
    
    removeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.secure.remove) {
            userAccreditation(req, res, next);
        }
        else {
            next();
        }
    }
}