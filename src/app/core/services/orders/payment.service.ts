import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient : HttpClient  ) {}

  createCashOrder(c_id:string , data:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/orders/${c_id}` , { 'shippingAddress': data } )
  }

  CheckOut(c_id:string , data:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environment.domain}` , { 'shippingAddress': data } )
  }
 
  getUserOrders(u_id:string):Observable<any>{
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/orders/user/${u_id}` )
  }
}
