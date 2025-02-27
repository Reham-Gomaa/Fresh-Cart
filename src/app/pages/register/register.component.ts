import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  constructor(private _AuthService : AuthService , private _Router : Router){}

  loading :boolean = false;
  errorMsg !:string;
  successMsg !:string;
  subID !:Subscription;

  registerForm : FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null ,  [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null , Validators.required),
    phone: new FormControl(null , Validators.pattern(/^01[0215][0-9]{8}$/))
  } , this.compare)

  compare(group:AbstractControl){
    if(group.get('password')?.value === group.get('rePassword')?.value ){
      return null;
    }else{
      return {missMatcg : true};
    }
  }

  register():void{
    if(this.registerForm.valid){
      this.loading = true;
      this.subID = this._AuthService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          this.loading = false;
          this.successMsg = res.message;
          this._Router.navigate(['/login']);
        }
      })
    }else{
      this.registerForm.setErrors({missMatcg : true});
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subID.unsubscribe();
  }
}
