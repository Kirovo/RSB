import express, { Request, Response, NextFunction } from 'express';
import userAccreditation from '../utilities/userAccreditation';
import { CRUDHandler } from '../handlers/CRUDHandler';
import { CRUDModel, Element } from '../models/CRUDModel';
import { friend } from '../handlers/friends';
import { FriendStore } from '../models/friend';

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
        this.app.get(`/${this.element.name}/:id`, this.showMiddleware, this.handler.show);
        this.app.get(`/${this.element.name}/:id/:childName`, this.showMiddleware, this.handler.showChild);
        this.app.post(`/${this.element.name}`, this.createMiddleware, this.handler.create);
        this.app.put(`/${this.element.name}/:id`, this.updateMiddleware, this.handler.update);
        this.app.delete(`/${this.element.name}/:id`, this.removeMiddleware, this.handler.remove);
    }

    indexMiddleware = (req: Request, res: Response, next: NextFunction): void => {

        if (this.element.CRUDOperation.index) {
            if (this.element.CRUDOperation.index.security === 'user') {
                userAccreditation(req, res);
                next();
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({message: 'Not found'});
        }
        

    };

    showMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (this.element.CRUDOperation.show) {
            if (this.element.CRUDOperation.show.security === 'user') {
                userAccreditation(req, res);
                next();

            }
            else if (this.element.CRUDOperation.show.security === 'friend') {
                userAccreditation(req, res);
                if (res.locals.id != req.params.id) {
                    const isFriend = await new FriendStore().isfriend(res.locals.id, req.params.id)
                    if (isFriend) {
                        next();
                    }
                    else {
                        res.status(401).json({message: 'Unauthorized'});
                    }
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({message: 'Not found'});
        }
    }


    createMiddleware = (req: Request, res: Response, next: NextFunction): void => {

        if (this.element.CRUDOperation.create) {
            if (this.element.CRUDOperation.create.security === 'user') {
                userAccreditation(req, res);
                next();
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({message: 'Not found'});
        }
    }
    
    updateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.CRUDOperation.update) {
            if (this.element.CRUDOperation.update.security === 'user') {
                userAccreditation(req, res);
                next();
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({message: 'Not found'});
        }
    }
    
    removeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        if (this.element.CRUDOperation.remove) {
            if (this.element.CRUDOperation.remove.security === 'user') {
                userAccreditation(req, res);
                next();
            }
            else {
                next();
            }
        }
        else {
            res.status(404).json({message: 'Not found'});
        }
    }
}