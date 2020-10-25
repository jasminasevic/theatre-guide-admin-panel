import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllActorsComponent } from './all-actors/all-actors.component';

const routes: Routes = [
  {
    path: 'all-actors',
    component: AllActorsComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
