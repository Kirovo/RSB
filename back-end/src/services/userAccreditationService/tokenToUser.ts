import { Response } from 'express';
import jwtDecode from 'jwt-decode';

// This middleware verifies the accessibility of the request and retreive user credentials
const tokenToUser = (token : string, res : Response): void => {

	try {

		// Convert the decoded token to a readable user object
		const userCredentials = 
			JSON.parse(
				JSON.stringify(
					jwtDecode(token)
				)
			)

		// Assign request's local variables to be used in the asked request
		res.locals.id = userCredentials.identity.id
		res.locals.email = userCredentials.identity.email
		res.locals.password_digest = userCredentials.identity.password_digest

	} catch {

		throw new Error('Can\'t retreive properly the user\'s credentials from the given token : ' + __filename)

	}
};

export default tokenToUser;
