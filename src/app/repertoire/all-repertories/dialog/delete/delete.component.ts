import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepertoiresService } from '../../repertoires.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repertoireService: RepertoiresService) { }

  confirmDelete(){
    this.repertoireService.deleteRepertoire(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
