import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [ CarouselModule , SearchPipe , FormsModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  searchValue :string = '';
  categoryData !: ICategory[];
  productData !: IProduct[];
  categorySub !: Subscription;
  productSub !: Subscription;
  addCartSubID !: Subscription;
  addListSubID !: Subscription;
  added :boolean = false;

  constructor(
    private _ProductService:ProductService , 
    private _CategoriesService: CategoriesService , 
    private _AuthService : AuthService ,
    private _CartService : CartService,
    private _ToastrService : ToastrService,
    private _WishlistService : WishlistService
  ){};

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  };
  categoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this._AuthService.userInfo

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

  addToWishlist(p_id:string){
    this.addListSubID = this._WishlistService.addProductToWishlist(p_id).subscribe({
      next:(res)=>{
        this.added = true;
        this._ToastrService.success(res.message , 'FreshCart')
      }
    })
    this.added = false;
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.productSub?.unsubscribe();
    this.addCartSubID?.unsubscribe();
    this.addListSubID?.unsubscribe();
  }
}
