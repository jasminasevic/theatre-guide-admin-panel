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
import { RouterModule } from '@angular/router';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { AllTheatresComponent } from './all-theatres/all-theatres.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeleteDialogComponent } from './all-theatres/dialog/delete/delete.component';
import { EditTheatreComponent } from './edit-theatre/edit-theatre.component';
import { AboutTheatreComponent } from './about-theatre/about-theatre.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    MatProgressSpinnerModule,
    TheatresRoutingModule,
    RouterModule,
    NgxMatFileInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AllTheatresComponent,
    AddTheatreComponent,
    DeleteDialogComponent,
    EditTheatreComponent,
    AboutTheatreComponent
  ]
})
export class TheatresModule { }
