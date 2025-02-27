import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  loading :boolean = false;
  errorMsg !: string;
  successMsg !: string;
  subID !:Subscription;

  constructor(private _AuthService : AuthService , private _Router : Router){}

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  })

  login():void{
    if(this.loginForm.valid){
      this.loading = true;
      this.subID = this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loading = false;
          this.successMsg = res.message;
          sessionStorage.setItem('token' , res.token);
          this._AuthService.decodeToken();
          this._Router.navigate(['/home']);
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
  }
}
