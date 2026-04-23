import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin, UserModel } from '../models/classes/user.model';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constants/constant';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterRes } from '../models/classes/api.response';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

   http = inject(HttpClient)
   apiUrl:string = environment.API_URL
   isUserLoggedIn:boolean = false;

  onLogin(obj:UserLogin):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`,obj)
  }

  getUserById(id:number){
    return this.http.get(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.GET_USER_BY_ID}${id}`)
  }

  onCreateAccount(obj:UserModel):Observable<RegisterRes>{
    return this.http.post<RegisterRes>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.CREATE_USER}`, obj)

  }

  


}
