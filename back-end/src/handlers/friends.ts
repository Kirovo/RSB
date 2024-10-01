// Import every module to make a handler from post model
import express, { Request, Response } from 'express';
import { CRUDRoutes } from '../services/CRUDRoutes';
import { Element } from '../models/CRUDModel';
import { FriendStore } from '../models/friend';



export const friend: Element = {
	name: 'friend',
	CRUDOperation: {
		index: { security: 'public' },
		show: { security: 'public' },
		create: { security: 'public' },
		update: { security: 'public' },
		remove: { security: 'public' }
	}
};

// Building endpoints
const friendRoutes = (app: express.Application): void => {
	app.delete('/friend/:id_profile/:id_friend', remove);
	app.get('/isfriend/:id_profile/:id_friend', isfriend);
	app.get('/friends/:id_profile', getFriends);
	app.get('/friends/request/:id_profile', getFriendsRequest);
	app.get('/friends/pending/:id_profile', getPendingRequest);
	app.get('/friends/suggested/:id_profile', getSuggestedProfiles);
	app.put('/friend/accept/:id_profile/:id_friend', acceptFriend);
	new CRUDRoutes(friend, app)
};

const store = new FriendStore();

const remove = async (req: Request, res: Response) => { // DELETE /friend
	const result = await store.remove(req.params.id_profile, req.params.id_friend);
	res.json(result);
}

const isfriend = async (req: Request, res: Response) => { // POST /isfriend
	const result = await store.isfriend(req.params.id_profile, req.params.id_friend);
	res.json(result);
}

const acceptFriend = async (req: Request, res: Response) => { // POST /isfriend
	const result = await store.acceptFriend(req.params.id_profile, req.params.id_friend);
	res.json(result);
}

const getFriends = async (req: Request, res: Response) => { // POST /isfriend
	const result = await store.getFriends(req.params.id_profile);
	res.json(result);
}

const getFriendsRequest = async (req: Request, res: Response) => { // POST /isfriend
	const result = await store.getFriendsRequest(req.params.id_profile);
	res.json(result);
}

const getPendingRequest = async (req: Request, res: Response) => { // POST /isfriend
	const result = await store.getPendingRequest(req.params.id_profile);
	res.json(result);
}

const getSuggestedProfiles = async (req: Request, res: Response) => { // POST /isfriend
	console.log('getSuggestedProfiles', req.params.id_profile)
	const result = await store.getSuggestedProfiles(req.params.id_profile);
	res.json(result);
}

// Allowing routes to be called
export default friendRoutes;
