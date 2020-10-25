import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../all-categories/categories.model';
import { CategoriesService } from '../all-categories/categories.service';

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.scss']
})
export class AboutCategoryComponent implements OnInit {

  category: any;

  constructor(private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let categoryId = this.activatedRoute.snapshot.params['id'];

    this.category = this.categoryService.getCategory(categoryId)
      .subscribe(data =>{
        this.category = data;
      })

  }

}
