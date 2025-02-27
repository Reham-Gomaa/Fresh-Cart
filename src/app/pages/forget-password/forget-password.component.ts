import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ ReactiveFormsModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {

  constructor( 
    private _AuthService : AuthService,
    private _ToastrService : ToastrService,
    private _Router : Router
   ){}

   subID !:Subscription;

  verifyEmailForm :FormGroup = new FormGroup({
    email : new FormControl(null , Validators.required)
  })

  sendEmail(){
    this.subID = this._AuthService.forgotPassword(this.verifyEmailForm.value).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , 'FreshCart')
        this._Router.navigate(['/verifycode'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
  }

}
