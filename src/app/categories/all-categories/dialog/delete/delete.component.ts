import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoriesService
  ) { }

  confirmDelete(){
    this.categoryService.deleteCategory(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
