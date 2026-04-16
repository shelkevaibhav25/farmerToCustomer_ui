import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../models/classes/user.model';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

   http = inject(HttpClient)
   apiUrl:string = environment.API_URL

  onLogin(obj:UserLogin){
    return this.http.post(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.LOGIN}`,obj)
  }

  getUserById(id:number){
    return this.http.get(`${this.apiUrl}${GlobalConstant.API_ENDPOINTS.GET_USER_BY_ID}${id}`)
  }

  


}
