import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenesRoutingModule } from '../scenes/scenes-routing.module';
import { AllScenesComponent} from './all-scenes/all-scenes.component';
import { AddSceneComponent } from './add-scene/add-scene.component';
import { AboutSceneComponent } from './about-scene/about-scene.component';
import { EditSceneComponent } from './edit-scene/edit-scene.component';
import { DeleteDialogComponent } from './all-scenes/dialog/delete/delete.component';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ScenesRoutingModule,
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
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AllScenesComponent,
    AddSceneComponent,
    EditSceneComponent,
    AboutSceneComponent,
    DeleteDialogComponent
  ],
})
export class ScenesModule { }
