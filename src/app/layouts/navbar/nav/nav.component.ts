import { Component, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit , OnDestroy{
  check :InputSignal<boolean> = input(false);
  navCartItems !: number;
  unSubCartItems !: Subscription;
  loggedUserSubID !: Subscription;

  constructor(
    private _Router : Router , 
    private _AuthService : AuthService ,
    private _CartService : CartService
  ){}

  ngOnInit(): void {
    this.loggedUserSubID = this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        this.navCartItems = res.numOfCartItems;
      }
    })

    this.unSubCartItems = this._CartService.numOfCartItems.subscribe({
      next:(value)=>{
        this.navCartItems = value;
      }
    })
  }

  logOut(){
    sessionStorage.removeItem('token');
    this._AuthService.userInfo = null;
    this._Router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unSubCartItems.unsubscribe();
    this.loggedUserSubID.unsubscribe();
  }

}
