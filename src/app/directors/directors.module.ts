import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsRoutingModule } from './directors-routing.module.module';
import { AddDirectorComponent } from './add-director/add-director.component';
import { AboutDirectorComponent } from './about-director/about-director.component';
import { EditDirectorComponent } from './edit-director/edit-director.component';
import { AllDirectorsComponent } from './all-directors/all-directors.component';
import { DeleteDialogComponent } from './all-directors/dialog/delete/delete.component';

import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    RouterModule,
    NgxMatFileInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AddDirectorComponent,
    AboutDirectorComponent,
    EditDirectorComponent,
    AllDirectorsComponent,
    DeleteDialogComponent
  ]
})
export class DirectorsModule { }
