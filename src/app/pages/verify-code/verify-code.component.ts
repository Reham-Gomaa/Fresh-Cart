import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  imports: [ ReactiveFormsModule ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent implements OnDestroy{
  subID !:Subscription;

  constructor( 
    private _AuthService : AuthService,
    private _ToastrService : ToastrService,
    private _Router : Router
  ){}

  verifyCodeForm :FormGroup = new FormGroup({
    resetCode : new FormControl(null , Validators.required)
  })

  verifyCode(){
    this.subID = this._AuthService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , 'FreshCart')
        this._Router.navigate(['/resetpassword'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subID?.unsubscribe();
  }
}
