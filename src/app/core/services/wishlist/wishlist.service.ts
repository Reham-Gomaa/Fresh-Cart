import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient : HttpClient ) { }

  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/wishlist` )
  }

  addProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/wishlist` , {  "productId": p_id } )
  }

  removeProductFromWishlist(p_id:string):Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/wishlist/${p_id}` )
  }
}
