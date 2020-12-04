import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepertoireRoutingModule } from './repertoire-routing.module';
import { AllRepertoriesComponent } from './all-repertories/all-repertories.component';
import { AddRepertoireComponent } from './add-repertoire/add-repertoire.component';
import { EditRepertoireComponent } from './edit-repertoire/edit-repertoire.component';
import { AboutRepertoireComponent } from './about-repertoire/about-repertoire.component';
import { DeleteDialogComponent } from './all-repertories/dialog/delete/delete.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutRepertoireResolverService } from './about-repertoire/about-repertoire-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RepertoireRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
  //  MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    RouterModule,
    NgxDatatableModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AboutRepertoireComponent,
    AllRepertoriesComponent,
    AddRepertoireComponent,
    EditRepertoireComponent,
    DeleteDialogComponent
  ],
  providers: [
    AboutRepertoireResolverService
  ]
})
export class RepertoireModule { }
