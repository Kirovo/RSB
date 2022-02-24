import jwt from 'jsonwebtoken';

// This middleware verifies the accessibility of the request and retreive user credentials
const tokenVerifier = (token :string): void => {

	try {

		// Verify the token throught a secret environement variable
		jwt.verify(token, process.env.TOKEN_SECRET as string);

	} catch {

		throw new Error(`Unauthorized token has been sent : '${token}' ` )
	}
};

export default tokenVerifier;
