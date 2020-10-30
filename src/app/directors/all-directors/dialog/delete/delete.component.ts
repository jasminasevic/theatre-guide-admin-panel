import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectorsService } from '../../directors.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public directorService: DirectorsService
  ) { }

  confirmDelete(directorId){
    this.directorService.deleteDirector(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
