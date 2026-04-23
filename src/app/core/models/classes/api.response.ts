import { UserModel } from "./user.model";

export interface LoginResponse{
    data:UserModel;
    message:string;
    token:string
}

export interface RegisterRes{
    data:UserModel,
    message:string
}