import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from '../../currencies.model';
import { CurrenciesService } from '../../currencies.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Currency,
    private currencyService: CurrenciesService
  ) { }

  confirmDelete(){
    this.currencyService.deleteCurrency(this.data.id);
    console.log(this.data.id);
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
