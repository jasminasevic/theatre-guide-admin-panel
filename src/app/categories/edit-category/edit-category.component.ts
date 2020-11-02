import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CategoriesService } from '../all-categories/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categoryDetail: any;

  formData = {
    categoryName: ''
  }

  constructor(private fb: FormBuilder,
    private notificationService: NotificationService,
    private categoryService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.categoryForm = this.createCategoryForm();
    }

  createCategoryForm() : FormGroup {
    return this.fb.group({
      categoryName: [
        this.formData.categoryName,
          [
            Validators.required,
            Validators.pattern('^[A-Z][a-zA-Z0-9]{2,}([\\sa-zA-Z0-9-]{1,})*$')
          ]
      ],
    });
  }

  ngOnInit() {
    let categoryId = this.activatedRoute.snapshot.params['id'];

    this.categoryService.getCategory(categoryId)
      .subscribe(category => {
        this.categoryDetail = category;
        this.categoryForm.patchValue({
          categoryName: this.categoryDetail.categoryName
        });
      });
  }

  onSubmit(){
    this.categoryService.editCategory(this.categoryDetail.id, this.categoryForm.value)
      .subscribe(() =>{
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/categories/all-categories']);
      })
  }

  cancel(){
    this.router.navigate(['/categories/all-categories']);
  }

}
