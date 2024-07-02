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
	app.post('/register', upload.none(), create);
	app.get('/login', upload.none(), authenticate);
	app.get('/users', index); // New route for listing all users
	app.get('/user/:id', show); // New route for fetching a single user by ID
	app.delete('/user/:id', remove); // New route for deleting a user by ID
	app.get('/profile/:id', showProfile); // Route for fetching a single profile by ID
    app.get('/profiles', indexProfiles); // Route for listing all profiles
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

// Handler for listing all users
const index = async (req: Request, res: Response) => {
	try {
		const users = await store.index();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

// Handler for fetching a single user by ID
const show = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const user = await store.show(userId);
		res.json(user);
	} catch (err) {
		res.status(404).json({ error: 'User not found' });
	}
};

// Handler for deleting a user by ID
const remove = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const deleted = await store.remove(userId);
		res.status(200).json(deleted);
	} catch (err) {
		res.status(500).json({ error: 'Failed to delete user' });
	}
};

// Handler for fetching a single profile by ID
const showProfile = async (req: Request, res: Response) => {
    try {
        const profileId = req.params.id;
        const profile = await store.showProfile(profileId);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Handler for listing all profiles
const indexProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await store.indexProfiles();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


// Allowing routes to be called
export default identificationRoutes;
