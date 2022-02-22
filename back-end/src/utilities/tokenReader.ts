// This file creates a identification middleware

// Importing token genrator and request properties
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';

// Manage the access thanks to the given token from the Authorization header
const tokenReader = (req: Request, res: Response, next: NextFunction): void => {

	try {

		const token = req.headers.authorization as string

		jwt.verify(token, process.env.TOKEN_SECRET as string);

		const json = JSON.parse(JSON.stringify(jwtDecode(token)))
			res.locals.id = json.identity.id
			res.locals.email = json.identity.email
			res.locals.password_digest = json.identity.password_digest
		next();

	} catch (err) {

		res.status(401);
		res.json(`Invalid token ${err}`);
		next();

	}
};

// Make available the use of the token reader
export default tokenReader;
