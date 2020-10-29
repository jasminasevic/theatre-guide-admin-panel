import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from '../../actors.model';
import { ActorsService } from '../../actors.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private actorService: ActorsService
  ) { }

  confirmDelete(){
    this.actorService.deleteActor(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
