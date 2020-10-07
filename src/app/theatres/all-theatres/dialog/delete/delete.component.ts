import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TheatreService } from '../../theatres.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public theatreService: TheatreService

  ) { }

  confirmDelete() :void {
    this.theatreService.deleteTheatre(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
