import { Request, Response, NextFunction } from 'express';
import tokenFinder from '../services/userAccreditationService/tokenFinder';
import tokenVerifier from '../services/userAccreditationService/tokenVerifier';
import tokenToUser from '../services/userAccreditationService/tokenToUser';

// This middleware verifies if the user is allowed to make the request he/she asked and saves his/her credentials localy
const userAccreditation = (req: Request, res: Response, next: NextFunction): void => {

	try {

		// Find the authorization token in the request
		const token = tokenFinder(req)

		// Verify the token throught a secret environement variable
		tokenVerifier(token)

		// retreive user credentials from the given token and save them localy
		tokenToUser(token,res)

		next();

	} catch (err) {
		const mistake = `Access to this request have been denied : `
		console.log(mistake, err)	
		
		res.status(403);
		res.json(mistake + err);

	}
};

export default userAccreditation;
