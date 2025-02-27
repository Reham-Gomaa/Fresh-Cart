import { Component , Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { PaymentService } from '../../core/services/orders/payment.service';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode'
import { IUserOrders } from '../../core/interfaces/userorders/iuser-orders';
import { Subscription } from 'rxjs';

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
  ){}
  
  userInfo :any;
  userID !:string;
  userOrders !: IUserOrders[];
  subID !:Subscription;

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (sessionStorage.getItem('token')) {
        this.userInfo = jwtDecode(sessionStorage.getItem('token') !);
        this.userID = this.userInfo.id;
        this.subID = this._PaymentService.getUserOrders(this.userID).subscribe({
          next:(res)=>{
            this.userOrders = res;
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
  }
}
