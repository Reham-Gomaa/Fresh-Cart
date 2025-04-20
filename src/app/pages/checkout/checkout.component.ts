import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../core/services/orders/payment.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit , OnDestroy {
  loading :boolean = false;
  cartID !:string;
  routeSubID !:Subscription;
  cashSubID !:Subscription;
  cardSubID !:Subscription;

  constructor( 
    private _PaymentService : PaymentService , 
    private _ActivatedRoute : ActivatedRoute ,
    private _ToastrService : ToastrService,
    private _Router : Router,
    private _CartService : CartService
  ){}

  ngOnInit(): void {
    this.routeSubID = this._ActivatedRoute.paramMap.subscribe({
      next: (param)=>{
        this.cartID = param.get('c_id') !
      }
    })
  }

  dataForm:FormGroup = new FormGroup({
    details: new FormControl( null , Validators.required ),
    phone: new FormControl( null , Validators.required ),
    city: new FormControl( null , Validators.required )
  })

  payNow(){
   if(this.dataForm.valid){
    this.cashSubID = this._PaymentService.createCashOrder(this.cartID , this.dataForm.value).subscribe({
      next: (res)=>{
        if(res.status == 'success'){
          this._Router.navigate(['/allorders']);
          this._CartService.numOfCartItems.next(0);  
        }
      }
    })
   }
  }

  payWithCard(){
   if(this.dataForm.valid){
    this.cardSubID = this._PaymentService.CheckOut(this.cartID , this.dataForm.value).subscribe({
      next: (res)=>{
        if(res.status == 'success'){
          window.open(res.session.url , '_self');
          this._CartService.numOfCartItems.next(0);  
        }
      }
    })
   }
  }

  ngOnDestroy(): void {
    this.routeSubID?.unsubscribe();
    this.cashSubID?.unsubscribe();
    this.cardSubID?.unsubscribe();
  }
}
