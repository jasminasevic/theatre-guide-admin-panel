import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTheatresComponent } from './all-theatres/all-theatres.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { EditTheatreComponent } from './edit-theatre/edit-theatre.component';
import { AboutTheatreComponent } from './about-theatre/about-theatre.component';

const routes: Routes = [
  {
    path : 'all-theatres',
    component : AllTheatresComponent
  },
  {
    path : 'add-theatre',
    component : AddTheatreComponent
  },
  {
    path : 'edit-theatre/:id',
    component : EditTheatreComponent
  },
  {
    path : 'about-theatre/:id',
    component : AboutTheatreComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatresRoutingModule { }
