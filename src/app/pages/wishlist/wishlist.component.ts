import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit , OnDestroy {

  wishlist !:IWishlist[];
  loggedUserSubID !:Subscription;
  removeSubID !:Subscription;
  addSubID !:Subscription;

  constructor( 
    private _WishlistService : WishlistService,
    private _ToastrService : ToastrService,
    private _CartService : CartService
   ){}

  ngOnInit(): void {
    this.loggedUserSubID = this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlist = res.data;
      }
    })
  }

  deleteItemFromWishlist(p_id:string){
    this.removeSubID = this._WishlistService.removeProductFromWishlist(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , 'FreshCart' )
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next:(res)=>{
            this.wishlist = res.data;
          }
        })
      }
    })
  }

  addToCart(p_id:string){
    this.addSubID = this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        this._CartService.numOfCartItems.next(res.numOfCartItems)
        this._ToastrService.success( res.message , 'FreshCart')
      }
    })
    this.deleteItemFromWishlist(p_id);
  }

  ngOnDestroy(): void {
    this.loggedUserSubID?.unsubscribe()
    this.removeSubID?.unsubscribe()
    this.addSubID?.unsubscribe()
  }

}
