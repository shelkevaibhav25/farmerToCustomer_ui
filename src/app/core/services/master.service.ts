import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GlobalConstant } from '../constants/constant';
import { environment } from '../../../environments/environment';
import { Observable, retry } from 'rxjs';
import { Category, Role } from '../models/classes/Master.model';
import { ApiResponseModel } from '../models/classes/api.response';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  http = inject(HttpClient)
  constructor() { }


  getAllRoles():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.GET_ROLES}`)
  }

  createRole(roleObj:Role):Observable<ApiResponseModel>{
     return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.CREATE_ROLE}`,roleObj)
  }

  createCategory(CateObj:Category):Observable<ApiResponseModel>{
     return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.CREATE_CATEGORY}`, CateObj)
  }

  getAllCategories():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.GET_CATEGORY}`)
  }

  updateRole(roleObj:Role):Observable<ApiResponseModel>{
    return this.http.put<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.UPDATE_ROLE}${roleObj.roleId}`, roleObj)
  }
  
  updateCategory(cateObj:Category):Observable<ApiResponseModel>{
    return this.http.put<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.UPDATE_CATEGORY}${cateObj.categoryId}`, cateObj)
  }
}
