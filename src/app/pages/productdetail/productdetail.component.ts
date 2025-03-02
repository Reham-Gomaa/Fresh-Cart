import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/product/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productdetail',
  imports: [CarouselModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit , OnDestroy{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  productID !:string;
  routeSubID !:Subscription;
  specificSubID !:Subscription;
  addSubID !:Subscription;

  constructor(private _ProductService : ProductService , private _CartService : CartService){}
  productDetails : IProduct | null = null;

  ngOnInit(): void {
    this.routeSubID = this._ActivatedRoute.paramMap.subscribe({
      next: (param)=> {
        this.productID = param.get('p_id') !;
      }
    })

    this.specificSubID = this._ProductService.getSpecificProduct(this.productID).subscribe({
      next: (res)=>{
        this.productDetails = res.data
      }
    })
  }

  addToCart(){
    this.addSubID = this._CartService.AddProductToCart(this.productID).subscribe({
      next:(res)=>{
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubID?.unsubscribe();
    this.specificSubID?.unsubscribe();
    this.addSubID?.unsubscribe();
  }
}
