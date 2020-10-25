import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CategoriesService } from '../all-categories/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm: FormGroup;

  constructor(private categoryService: CategoriesService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router) {
      this.categoryForm = this.fb.group({
        Id: 0,
        CategoryName: ['',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-zA-Z0-9]{2,}([\\sa-zA-Z0-9-]{1,})*$')
        ]]
      });
    }

  onSubmit(){
    // const categoryData = this.categoryForm.getRawValue();
    // console.log(categoryData);

    this.categoryService.addCategory(this.categoryForm.value)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/categories/all-categories']);
      })
  }

  resetForm(categoryForm?: NgForm){
    this.categoryForm.reset();
  }

  cancel(){
    this.router.navigate(['/categories/all-categories']);
  }

}
