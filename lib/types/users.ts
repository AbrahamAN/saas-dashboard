export type User = { 
    name:string;
    email:string;
    id:number;
}

export type CreateUserInput = {
    name:string;
    email:string;
}

export type FormErrors = {
    name?:string;
    email?:string;
}