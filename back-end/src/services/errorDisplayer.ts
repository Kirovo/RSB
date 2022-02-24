import { CRUDHandlerError, CRUDModelError } from "../errors/CRUDError";
import { Response } from "express";

export function errorDisplayer(err : unknown, res :Response){
    
    if (err instanceof CRUDHandlerError){

        console.error(err)
        res.status(400)
        res.json(err.message)
    }
    if (err instanceof CRUDModelError){

        console.error(err)
        res.status(400)
        res.json(err.message)
    }
    else {
        console.error(err)
        res.status(400)
    }

}