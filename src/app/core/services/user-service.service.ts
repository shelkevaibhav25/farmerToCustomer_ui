import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin, UserModel } from '../models/classes/user.model';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constants/constant';
import { Observable, Subject } from 'rxjs';
import { ApiResponseModel, LoginResponseModel } from '../models/classes/api.response';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

   http = inject(HttpClient)
   apiUrl:string = environment.API_URL
   isUserLoggedIn:boolean = false;
   onLogin$ : Subject<boolean> = new Subject<boolean>()
  
  onLogin(obj:UserLogin):Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`,obj)
  }

  getUserById(id:number){
    return this.http.get(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.GET_USER_BY_ID}${id}`)
  }

  onCreateAccount(obj:UserModel):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.CREATE_USER}`, obj)

  }

  


}
