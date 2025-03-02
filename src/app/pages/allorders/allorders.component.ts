import { Component , Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { PaymentService } from '../../core/services/orders/payment.service';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode'
import { IUserOrders } from '../../core/interfaces/userorders/iuser-orders';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit , OnDestroy{

  constructor(
    private _PaymentService : PaymentService , 
    @Inject(PLATFORM_ID) private _PLATFORM_ID:object,
    private _CartService : CartService,
    private _ToastrService : ToastrService
  ){}
  
  userInfo :any;
  userID !:string;
  userOrders !: IUserOrders[];
  subID !:Subscription;
  addCartSubID !:Subscription;

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (sessionStorage.getItem('token')) {
        this.userInfo = jwtDecode(sessionStorage.getItem('token') !);
        this.userID = this.userInfo.id;
        this.subID = this._PaymentService.getUserOrders(this.userID).subscribe({
          next:(res)=>{
            this.userOrders = res;
            console.log(this.userOrders)
          }
        })
      }
    }
  }

  addToCart(p_id:string){
    this.addCartSubID = this._CartService.AddProductToCart(p_id).subscribe({
      next: (res)=> {
        this._CartService.numOfCartItems.next(res.numOfCartItems);  
        this._ToastrService.success( res.message , 'FreshCart')
      } 
    })
  }

  ngOnDestroy(): void {
    this.subID?.unsubscribe();
    this.addCartSubID?.unsubscribe();
  }
}
