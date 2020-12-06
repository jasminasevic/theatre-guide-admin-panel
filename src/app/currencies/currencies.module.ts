import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatMenuModule } from '@angular/material/menu';
import { CurrenciesRoutingModule } from './currencies-routing.module';
// import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
// import { MaterialFileInputModule } from 'ngx-material-file-input';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';
import { AllCurrenciesComponent } from './all-currencies/all-currencies.component';
import { DeleteDialogComponent } from './all-currencies/dialog/delete/delete.component';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AllCurrenciesComponent,
    AddCurrencyComponent,
    EditCurrencyComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    CurrenciesRoutingModule,
    MatIconModule
  ]
})
export class CurrenciesModule { }
