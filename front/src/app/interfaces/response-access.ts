import { User } from "./user";

export interface ResponseAccess {
    accessToken:string,
    data:{
        user:User
    }
    
}
