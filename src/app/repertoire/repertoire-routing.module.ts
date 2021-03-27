import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRepertoriesComponent } from './all-repertories/all-repertories.component';
import { AddRepertoireComponent } from './add-repertoire/add-repertoire.component';
import { EditRepertoireComponent } from './edit-repertoire/edit-repertoire.component';

const routes: Routes = [
  {
    path: 'all-plays',
    component: AllRepertoriesComponent
  },
  {
    path: 'add-play',
    component: AddRepertoireComponent
  },
  {
    path: 'edit-play/:id',
    component: EditRepertoireComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepertoireRoutingModule { }
