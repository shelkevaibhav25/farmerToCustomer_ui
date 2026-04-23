import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GlobalConstant } from '../constants/constant';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)
  constructor() { }


  getAllRoles(){
    return this.http.get(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.GET_ROLES}`)
  }
}
