import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatresRoutingModule } from './theatres-routing.module';
import { AllTheatresComponent } from './all-theatres/all-theatres.component';
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
import { UsersRoutingModule } from '../users/users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TheatresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MaterialFileInputModule,
    UsersRoutingModule
  ],
  declarations: [
    AllTheatresComponent
  ]
})
export class TheatresModule { }
