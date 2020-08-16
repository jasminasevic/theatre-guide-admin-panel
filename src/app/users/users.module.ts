import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { UsersRoutingModule } from './users-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddUserComponent } from './add-user/add-user.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AboutUserComponent } from './about-user/about-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { DeleteDialogComponent } from './all-users/dialog/delete/delete.component';
import { FormDialogComponent } from './all-users/dialog/form-dialog/form-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AddUserComponent,
    AboutUserComponent,
    EditUserComponent,
    AllUsersComponent,
    DeleteDialogComponent,
    FormDialogComponent
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
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MaterialFileInputModule,
    UsersRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class UsersModule { }
