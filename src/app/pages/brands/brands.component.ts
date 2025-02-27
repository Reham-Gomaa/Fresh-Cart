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
export class BrandsComponent implements OnInit {

  brands !:IBrands[];
  specificBrand !: IBrands;

  constructor( private _BrandsService : BrandsService ){}

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands = res.data;
      }
    })
  }

  getBrand(b_id:string){
    this._BrandsService.getSpecificBrand(b_id).subscribe({
      next:(res)=>{
        this.specificBrand = res.data;
      }
    })
  }

}
