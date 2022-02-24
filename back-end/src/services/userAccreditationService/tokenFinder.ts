import { Request } from 'express';

// Find the authorization token in the request
const tokenFinder = (req: Request): string => {

	try {

		// Retreive token from the authorization header of the request
		const token : string = req.headers.authorization!
		if(token === undefined) {
			const err  = new Error('There is no Authorization header sent in this request')
			throw err
		}

		return token

	} catch (err) {
		if(err instanceof Error){
			throw err
		}
		else
			throw new Error(`Could not find the token`)

	}
};

export default tokenFinder;
