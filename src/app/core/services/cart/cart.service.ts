import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //userToken:any ;
  numOfCartItems :BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient : HttpClient  ) { //, @Inject(PLATFORM_ID) private _PLATFORM_ID:any
    // if(isPlatformBrowser(_PLATFORM_ID)){
    //   this.userToken = { token: sessionStorage.getItem('token') !};
    // }else{
    //   this.userToken = {};
    // }
  }

  GetLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart` ); // , { headers:  this.userToken }
  }

  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/cart` , { "productId": p_id }  );//, {headers : this.userToken}
  }

  RemoveSpecificCartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart/${p_id}`  );//, { headers: this.userToken }
  }

  UpdateCartProductQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put( `${environment.baseUrl}/api/v1/cart/${p_id}` , { "count": count } );// , { headers: this.userToken }
  }

  ClearUserCart():Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart`  );//, { headers: this.userToken }
  }
}
