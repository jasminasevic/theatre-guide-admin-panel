import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActorComponent } from './add-actor/add-actor.component';
import { AllActorsComponent } from './all-actors/all-actors.component';
import { EditActorComponent } from './edit-actor/edit-actor.component';

const routes: Routes = [
  {
    path: 'all-actors',
    component: AllActorsComponent
  },
  {
    path: 'add-actor',
    component: AddActorComponent
  },
  {
    path: 'edit-actor/:id',
    component: EditActorComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
