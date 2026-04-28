import { RolesModel, UserModel } from "./user.model";

export interface LoginResponseModel{
    data:UserModel;
    message:string;
    token:string
}

export interface ApiResponseModel{
    data:any;
    message:string;
}

export interface IRole{
    roleId:number;
    roleName:string;

}

