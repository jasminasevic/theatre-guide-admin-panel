import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsRoutingModule } from '../shows/shows-routing.module';
import { AllShowsComponent} from './all-shows/all-shows.component';
import { AddShowComponent } from './add-show/add-show.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
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
    MatSelectModule,
    MatDatepickerModule,
    NgxMatFileInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AllShowsComponent,
    AddShowComponent,
    EditShowComponent,
    DeleteDialogComponent,
  ],
})
export class ShowsModule { }
