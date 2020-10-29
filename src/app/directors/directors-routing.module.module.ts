import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDirectorsComponent } from './all-directors/all-directors.component';
import { AddDirectorComponent } from './add-director/add-director.component';
import { EditDirectorComponent } from './edit-director/edit-director.component';
import { AboutDirectorComponent } from './about-director/about-director.component';

const routes: Routes = [
  {
    path: 'all-directors',
    component: AllDirectorsComponent
  },
  {
    path: 'add-director',
    component: AddDirectorComponent
  },
  {
    path: 'edit-director/:id',
    component: EditDirectorComponent
  },
  {
    path: 'about-director/:id',
    component: AboutDirectorComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorsRoutingModule { }
