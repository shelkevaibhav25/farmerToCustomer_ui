import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstant } from '../constants/constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../models/classes/api.response';
import { environment } from '../../../environments/environment.development';
import { ProductMaster } from '../models/classes/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  http = inject(HttpClient)

  constructor() { }


  getAllProducts():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.GET_PRODUCT_MASTER_PRODUCTS}`)
  }

  createMasterProduct(productObj:ProductMaster):Observable<ApiResponseModel>{
   return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.CREATE_MASTER_PRODUCT}`, productObj)
  }

  updateMasterProduct(productObj:ProductMaster):Observable<ApiResponseModel>{
   return this.http.put<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.UPDATE_MASTER_PRODUCT}${productObj.productId}`, productObj)
  }

  deleteMasterProduct(productObj:ProductMaster):Observable<ApiResponseModel>{
    return this.http.delete<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.DELETE_MASTER_PRODUCT}${productObj.productId}`)
  }

}
