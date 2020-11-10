import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScenesService } from '../../scenes.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})

export class DeleteDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: ScenesService
  ) { }

  confirmDelete() : void {
    this.sceneService.deleteScene(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
