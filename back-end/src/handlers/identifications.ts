// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { IdentificationStore, Profile } from '../models/identification';
import { User } from '../models/identification';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import dotenv from 'dotenv';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { CRUDModel, Element } from '../models/CRUDModel';
import { post } from './posts';
import { friend } from './friends';


dotenv.config();

const upload = multer();



const profile: Element = {
    name: 'profile',
    CRUDOperation: {
        index: {security: 'public'},
        show: {security: 'friends'},
        create: {security: 'public'},
        update: {security: 'user'},
        remove: {security: 'public'}
    },
    childElements: [post, friend]
};


const user: Element = {
    name: 'user',
    CRUDOperation: {
        index: {security: 'public'},
        show: {security: 'user'},
        create: {security: 'public'},
        update: {security: 'user'},
        remove: {security: 'public'}
    },
    childElements: [profile]
};


// Building endpoints
const identificationRoutes = (app: express.Application): void => {
    app.post('/register', upload.none(), register);
    app.post('/login', upload.none(), login);
    new CRUDRoutes(user, app)
    new CRUDRoutes(profile, app)
};

// Creating a reference to the PostStore class
const store = new IdentificationStore();

const register = async (req: Request, res: Response) => { // POST /register
    const user: User = {
        email: req.body.email,
        password: req.body.password
    }
    const profile: Profile = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        birthdate: req.body.birthdate,
        gendre: req.body.gendre,
        address: req.body.address,
        city: req.body.city,
        postalcode: req.body.postalcode
    }
    const register = await store.register(user, profile)
    res.json(register)
}

const login = async (req: Request, res: Response) => { // POST /login
    try {
        const user: User = {
            email: req.body.email, 
            password: req.body.password
        }
        const identity = await store.login(user);
        const userData = identity[0]
        const profileID = identity[1]
        const token = jwt.sign({ userData }, process.env.TOKEN_SECRET as string)
        const profileModel = new CRUDModel(profile)
        const profileData = await profileModel.showInDB(profileID)
        res.json({ token, profile: profileData });
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }
};


// Allowing routes to be called
export default identificationRoutes;
