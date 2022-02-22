// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { IdentificationStore, Profile } from '../models/identification';
import { User } from '../models/identification';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const upload = multer();

// Building endpoints
const identificationRoutes = (app: express.Application): void => {
	app.post('/register', upload.none(),create);
    app.get('/login', upload.none(),authenticate)
};

// Creating a reference to the PostStore class
const store = new IdentificationStore();

const create = async (req: Request, res: Response) => { // POST /register
    const user: User ={
        email: req.body.email,
        password: req.body.password
    }
    const profile: Profile={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        birthdate: req.body.birthdate,
        gendre: req.body.gendre,
        address: req.body.address,
        city: req.body.city,
        postalcode: req.body.postalcode
    }
    const register = await store.create(user,profile)
    res.json(register)
}

const authenticate = async (req: Request, res: Response) => { // GET /login
    try{
        const auth: User ={
        email: req.query.email as string,
        password: req.query.password as string
    }
        const identity = await store.authenticate(auth);
        const token = jwt.sign({identity},process.env.TOKEN_SECRET as string)
        res.json(token);
    }catch(err) {
        res.status(401)
        res.json(err)
        return
    }
};


// Allowing routes to be called
export default identificationRoutes;
