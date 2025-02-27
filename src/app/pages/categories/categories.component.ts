import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy{

  categories !:ICategory[];
  category !:ICategory;
  allSubID !:Subscription;
  specificSubID !:Subscription;

  constructor( private _CategoriesService : CategoriesService ){}

  ngOnInit(): void {
    this.allSubID = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      }
    })
  }

  getCategory(c_id:string){
    this.specificSubID = this._CategoriesService.getSpecificCategory(c_id).subscribe({
      next:(res)=>{
        this.category = res.data;
      }
    })
  }

  ngOnDestroy(): void {
    this.allSubID.unsubscribe();
    this.specificSubID.unsubscribe();
  }

}
