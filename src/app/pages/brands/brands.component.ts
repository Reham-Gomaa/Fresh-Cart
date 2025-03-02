import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/interfaces/brands/ibrands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy{

  brands !:IBrands[];
  specificBrand !: IBrands;
  allsubID !:Subscription;
  specificsubID !:Subscription;

  constructor( private _BrandsService : BrandsService ){}

  ngOnInit(): void {
    this.allsubID = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands = res.data;
      }
    })
  }

  getBrand(b_id:string){
    this.specificsubID = this._BrandsService.getSpecificBrand(b_id).subscribe({
      next:(res)=>{
        this.specificBrand = res.data;
        
      }
    })
  }

  ngOnDestroy(): void {
    this.allsubID?.unsubscribe();
    this.specificsubID?.unsubscribe();
  }

}
