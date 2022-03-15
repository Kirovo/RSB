// Importing environement variable manipulation module and postgreSQL database module
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Getting environement variables
dotenv.config();

// Initializing environement variables as variables
const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV_DB
} = process.env;


// Initializing port as number from environment variables
const POST_PORT = process.env.POST_PORT as unknown as number;


// Creatting a client
let client = new Pool();

// Giving the client appropriate database to work with
// depending on of working environement (dev,test)

if (ENV_DB === 'dev') {
	client = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		port: POST_PORT,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

// Exporting the client to work with it
export default client;
