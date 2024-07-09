// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { IdentificationStore, Profile } from '../models/identification';
import { User } from '../models/identification';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import dotenv from 'dotenv';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';


dotenv.config();

const upload = multer();

const user: Element = {
    name: 'user',
    secure: {
        index: true,
        show: true,
        create: true,
        update: true,
        remove: true,
    }
};

const profile: Element = {
    name: 'profile',
    secure: {
        index: false,
        show: false,
        create: true,
        update: true,
        remove: true,
    }
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
        console.log(identity)
        const token = jwt.sign({ identity }, process.env.TOKEN_SECRET as string)
        res.json(token);
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }
};


// Allowing routes to be called
export default identificationRoutes;
