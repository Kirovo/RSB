import { CRUDSenario } from "../types/CRUDSenarioType";

export class CRUDHandlerError extends Error{

    constructor(CRUDSenario: CRUDSenario,  stack?: string | undefined){
        super(stack);
        this.name = 'CRUDHandlerError';
        this.message = `The server have not been able to respond to the ${CRUDSenario.crud} ${CRUDSenario.activityAction} request` ;
    }
}


export class CRUDModelError extends Error{

    constructor(CRUDSenario: CRUDSenario,  stack?: string | undefined){
        super(stack);
        this.name = 'CRUDModelError';
        this.message = `An error has occured in the ${CRUDSenario.crud} ${CRUDSenario.activityAction} operation while communating with the database ` ;
    }
}
