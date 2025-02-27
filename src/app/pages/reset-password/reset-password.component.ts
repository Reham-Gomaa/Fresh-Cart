import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [ ReactiveFormsModule ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnDestroy{
  subID !:Subscription;

  constructor( 
      private _AuthService : AuthService,
      private _ToastrService : ToastrService,
      private _Router : Router
  ){}
  
  resetPasswordForm :FormGroup = new FormGroup({
    email : new FormControl(null , Validators.required),
    newPassword : new FormControl(null , Validators.required)
  })

  resetPass(){
    this.subID = this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        this._ToastrService.success( 'password reset successfully' , 'FreshCart')
        sessionStorage.setItem('token' , res.token)
        this._AuthService.decodeToken();
        this._Router.navigate(['/home'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
  }
}
