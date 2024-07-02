// import { Request, Response, NextFunction } from 'express';
// import { Element } from '../models/CRUDModel';

// // This middleware verifies if the user is allowed to make the request he/she asked and saves his/her credentials localy
// const requestChecker = (req: Request, res: Response, next: NextFunction, element: Element): void => {

	
//     const haveSameKeys = (obj1: any, obj2: any): boolean => {
//         const keys1 = Object.keys(obj1);
//         const keys2 = Object.keys(obj2);
//         return keys1.length === keys2.length && keys1.every(key => obj2.hasOwnProperty(key));
//     };

//     // Check if req.body and element.body have the same keys and size
//     if (haveSameKeys(req.body, element.body)) {
//         element.body = req.body;
// 		next();
//     }
// 	else {
// 		res.status(400).json({ message: 'Bad Request' });
// 	}
    
// };

// export default requestChecker;
