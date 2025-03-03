import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductService } from '../../core/services/products/product.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [ SearchPipe , FormsModule , RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy{
  
    searchValue :string = '';
    categoryData !: ICategory[];
    productData !: IProduct[];
    categorySub !: Subscription;
    productSub !: Subscription;
    addCartSubID !: Subscription;
    addListSubID !: Subscription;
    loggedUserSubID !: Subscription;
    removeSubID !: Subscription;
    homeWishlist !:IWishlist[] ;
    wishlistIds: Set<string> = new Set();
  
    constructor(
      private _ProductService:ProductService , 
      private _CategoriesService: CategoriesService , 
      private _AuthService : AuthService ,
      private _CartService : CartService,
      private _ToastrService : ToastrService,
      private _WishlistService : WishlistService
    ){};
  
    ngOnInit(): void {
      this._AuthService.userInfo
  
      this.loggedUserSubID = this._WishlistService.getLoggedUserWishlist().subscribe({
        next:(res)=>{
          this.homeWishlist = res.data;
          this.wishlistIds = new Set(res.data.map((item: IWishlist) => item._id));
        }
      })
  
      this.categorySub = this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoryData = res.data;
        }
      });
  
      this.productSub = this._ProductService.getAllProducts().subscribe({
        next:(res)=>{
          this.productData = res.data;
        }
      });
    }
  
    addToCart(p_id:string){
      this.addCartSubID = this._CartService.AddProductToCart(p_id).subscribe({
        next: (res)=> {
          this._CartService.numOfCartItems.next(res.numOfCartItems);  
          this._ToastrService.success( res.message , 'FreshCart')
        } 
      })
    }
  
    isInWishlist(productId: string): boolean {
      return this.wishlistIds.has(productId);
    }
  
    addToWishlist(p_id:string){
      if (this.isInWishlist(p_id)) {
        this.removeSubID = this._WishlistService.removeProductFromWishlist(p_id).subscribe({
          next: () => {
            this.wishlistIds.delete(p_id);
            this._ToastrService.warning('Removed from Wishlist', 'FreshCart');
          }
        });
      } else {
        this.addListSubID = this._WishlistService.addProductToWishlist(p_id).subscribe({
          next: (res) => {
            this.wishlistIds.add(p_id);
            this._ToastrService.success('Added to Wishlist', 'FreshCart');
          }
        });
      }
    }
  
    ngOnDestroy(): void {
      this.categorySub?.unsubscribe();
      this.productSub?.unsubscribe();
      this.addCartSubID?.unsubscribe();
      this.addListSubID?.unsubscribe();
      this.loggedUserSubID?.unsubscribe();
      this.removeSubID?.unsubscribe();
    }
}
