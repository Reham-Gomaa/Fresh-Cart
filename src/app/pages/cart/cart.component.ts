import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../core/interfaces/cart/icart';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ CurrencyPipe , RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy{

  constructor(private _CartService : CartService , private _ToastrService : ToastrService){}

  cartData !:ICart;
  loggedUserSubID !: Subscription;
  removeItemSubID !: Subscription;
  updateQuantitySubID !: Subscription;
  clearCartSubID !: Subscription;

  ngOnInit(): void {
    this.loggedUserSubID = this._CartService.GetLoggedUserCart().subscribe({
      next: (res)=>{
        this.cartData = res.data;
      }
    })
  }

  deleteItemFromCart(p_id:string){
    this.removeItemSubID = this._CartService.RemoveSpecificCartItem(p_id).subscribe({
      next: (res)=>{ 
        this.cartData = res.data ;
        this._CartService.numOfCartItems.next(res.numOfCartItems);  
      }
    })
  }

  updateQuantity(p_id:string , count:number){
   if(count >= 1){
    this.updateQuantitySubID = this._CartService.UpdateCartProductQuantity(p_id , count).subscribe({
      next: (res)=>{
        this.cartData = res.data;
      }
    })
   }
  }

  clearCart(){
    this.clearCartSubID = this._CartService.ClearUserCart().subscribe({
      next: (res)=>{
        this.cartData = res.data;
        this._CartService.numOfCartItems.next(0);  
        this._ToastrService.success( res.message , 'FreshCart' )
      }
    })
  }

  ngOnDestroy(): void {
    this.loggedUserSubID.unsubscribe();
    this.removeItemSubID.unsubscribe();
    this.updateQuantitySubID.unsubscribe();
    this.clearCartSubID.unsubscribe();
  }

}
