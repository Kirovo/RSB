export type CRUDSenario = {
	crud : CRUD | undefined,
	activityAction : ActivityAction
}

export enum CRUD {
    Index = 'index',
    Create = 'create',
    Remove = 'remove',
    Show = 'show'
}
export enum ActivityAction {
    Post = 'post',
    Comment = 'comment',
    Reaction = 'reaction',
    Attachment = 'attachment'
}