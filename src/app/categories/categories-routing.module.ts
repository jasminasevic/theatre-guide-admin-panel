import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path : 'all-categories',
    component : AllCategoriesComponent
  },
  {
    path : 'add-category',
    component : AddCategoryComponent
  },
  {
    path : 'edit-category/:id',
    component : EditCategoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
