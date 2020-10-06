import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatresRoutingModule } from './theatres-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RouterModule } from '@angular/router';

import { AllTheatresComponent } from './all-theatres/all-theatres.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSortModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    TheatresRoutingModule,
    RouterModule
  ],
  declarations: [
    AllTheatresComponent,
    AddTheatreComponent
  ]
})
export class TheatresModule { }
