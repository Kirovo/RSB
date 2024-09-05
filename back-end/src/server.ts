// This file serve the application
//
// Importing modules to work with endpoints and json format
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
 
// Importing routes
import postRoutes from './handlers/posts';
import identificationRoutes from './handlers/identifications';
import commentRoutes from './handlers/comments';
import reactionRoutes from './handlers/reactions';
import attachmentRoutes from './handlers/attachments';
import friendRoutes from './handlers/friends';
// import dashboardRoutes from './handlers/dashboards';

// Listenning to the app to endpoints
const app: express.Application = express();
const port = 2000;

app.use(bodyParser.json());
app.use(cors())
app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

attachmentRoutes(app)
postRoutes(app)
commentRoutes(app)
reactionRoutes(app)
identificationRoutes(app)
friendRoutes(app)

// Launching the app on localhost:2000
app.listen(port, function () {
	console.log(`listening app on: http://localhost:${port}/`);
});

// Exporting the express application to test endpoints
export default app;
