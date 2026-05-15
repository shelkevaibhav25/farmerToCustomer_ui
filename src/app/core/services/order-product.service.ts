import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponseModel } from '../models/classes/api.response';
import { HttpClient } from '@angular/common/http';
import { GlobalConstant } from '../constants/constant';
import { IProduct } from '../models/interfaces/farmerProduct.interface';
import { Icart } from '../models/interfaces/order.intergace';
import { environment } from '../../../environments/environment.development';
import { PlaceOrder } from '../models/classes/Product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  addToCart$: Subject<boolean>= new Subject<boolean>();
  http = inject(HttpClient);

  constructor() { }


  addProductToCart( productObj: Icart):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.ADD_TO_CART}`,productObj)

  }

  getCartItems( customerId: number):Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.GET_CART_ITEMS}${customerId}`)

  }

  deleteCartItem(cartId:number):Observable<ApiResponseModel>{
    return this.http.delete<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.DELETE_CART_ITEM_BY_CARTID}${cartId}`)
  }

  placeOrder(orderObj:PlaceOrder):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(`${environment.API_URL}${GlobalConstant.API_ENDPOINTS.PLACE_ORDER}`,orderObj)
  }
}

