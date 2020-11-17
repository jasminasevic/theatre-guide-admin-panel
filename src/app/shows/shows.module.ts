import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsRoutingModule } from '../shows/shows-routing.module';
import { AllShowsComponent} from './all-shows/all-shows.component';
import { AddShowComponent } from './add-show/add-show.component';
import { AboutShowComponent } from './about-show/about-show.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { DeleteDialogComponent } from './all-shows/dialog/delete/delete.component';
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
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  imports: [
    CommonModule,
    ShowsRoutingModule,
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
    MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AllShowsComponent,
    AddShowComponent,
    EditShowComponent,
    AboutShowComponent,
    DeleteDialogComponent,
  ],
})
export class ShowsModule { }
