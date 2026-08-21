import type { ROLES } from "../constant/role.constant";


export type IRole = (typeof ROLES)[keyof typeof ROLES];


export interface IUser{
     "id": string,
    "username": string,
    "email": string,
    "phone": string | null,
    "firstName": string,
    "lastName": string,
    "profilePhoto": string |null,
    "emailVerified": boolean,
    "phoneVerified": boolean,
    "role": IRole,
    "createdAt": string,
    "updatedAt": string
 
}