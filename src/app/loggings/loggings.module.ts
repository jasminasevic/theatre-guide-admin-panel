import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllLoggingsComponent } from './all-loggings/all-loggings.component';
import { LoggingsRoutingModule } from './loggings-routing.module';

import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    LoggingsRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxDatatableModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AllLoggingsComponent]
})
export class LoggingsModule { }
