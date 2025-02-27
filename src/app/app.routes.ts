import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [

    {path:'' , component: AuthLayoutComponent , children:[
        {path:'' , redirectTo:'login' , pathMatch: 'full'},
        {path:'login' , component:LoginComponent , title:'Login'},
        {path:'forgetpassword' , loadComponent: ()=> import('./pages/forget-password/forget-password.component').then( (classes)=> classes.ForgetPasswordComponent ) , title:'Forget-password'},
        {path:'verifycode' , loadComponent: ()=> import('./pages/verify-code/verify-code.component').then( (classes)=> classes.VerifyCodeComponent ) , title:'Verify-Code'},
        {path:'resetpassword' , loadComponent: ()=> import('./pages/reset-password/reset-password.component').then( (classes)=> classes.ResetPasswordComponent ) , title:'Reset-Password'},
        {path:'register' , loadComponent: ()=> import('./pages/register/register.component').then( (classes)=> classes.RegisterComponent ) , title:'Register'},
    ]},
    {path: '' , component: MainLayoutComponent , canActivate:[ authGuard ] , children:[
        {path:'' , redirectTo:'home' , pathMatch:'full'},
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'products' , loadComponent: ()=> import('./pages/products/products.component').then( (classes)=> classes.ProductsComponent ) , title:'Products'},
        {path:'brands' , loadComponent: ()=> import('./pages/brands/brands.component').then( (classes)=> classes.BrandsComponent ) , title:'Brands'},
        {path:'categories' , loadComponent: ()=> import('./pages/categories/categories.component').then( (classes)=> classes.CategoriesComponent ) , title:'Categories'},
        {path:'cart' , loadComponent: ()=> import('./pages/cart/cart.component').then( (classes)=> classes.CartComponent ) , title:'Cart'},
        {path:'wishlist' , loadComponent: ()=> import('./pages/wishlist/wishlist.component').then( (classes)=> classes.WishlistComponent ) , title:'Wishlist'},
        {path:'product-details/:p_id' , loadComponent: ()=> import('./pages/productdetail/productdetail.component').then( (classes)=> classes.ProductdetailComponent ) , title:'details'},
        {path:'checkout/:c_id' , loadComponent: ()=> import('./pages/checkout/checkout.component').then( (classes)=> classes.CheckoutComponent ) , title:'Checkout'},
        {path:'allorders' , loadComponent: ()=> import('./pages/allorders/allorders.component').then( (classes)=> classes.AllordersComponent ) , title:'All orders'},
        {path:'**' , component:NotfoundComponent , title:'Error404'}
    ]}
];
