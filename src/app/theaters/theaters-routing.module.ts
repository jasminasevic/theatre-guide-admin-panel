import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTheatersComponent } from './all-theaters/all-theaters.component';

const routes: Routes = [
  {
    path : 'all-theaters',
    component : AllTheatersComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatersRoutingModule { }
