import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllShowsComponent } from './all-shows/all-shows.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { AddShowComponent } from './add-show/add-show.component';

const routes: Routes = [
  {
    path: 'all-shows',
    component: AllShowsComponent
  },
  {
    path: 'add-show',
    component: AddShowComponent
  },
  {
    path: 'edit-show/:id',
    component: EditShowComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowsRoutingModule { }
