import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from 'jwt-decode'
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo :any;

  constructor(private _HttpClient : HttpClient) { }

  private _PLATFORM_ID = inject(PLATFORM_ID)

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data);
  }

  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data);
  }

  decodeToken(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(sessionStorage.getItem('token')){
        this.userInfo = jwtDecode(sessionStorage.getItem('token') !);
      }
    }
  }

  forgotPassword(data:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/forgotPasswords` , data );
  }

  verifyResetCode(data:object):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/auth/verifyResetCode` , data );
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put( `${environment.baseUrl}/api/v1/auth/resetPassword` , data );
  }
}
