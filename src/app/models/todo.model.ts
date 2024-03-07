export interface ITodo{
    _id:string;
    title:string;
    description:string;
    status:todoStatus;
}

export type todoStatus = 'ALL' | 'OPEN' | 'CLOSE';