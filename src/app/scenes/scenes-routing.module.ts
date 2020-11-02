import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllScenesComponent } from './all-scenes/all-scenes.component';
import { AddSceneComponent } from './add-scene/add-scene.component';
import { EditSceneComponent } from './edit-scene/edit-scene.component';
import { AboutSceneComponent } from './about-scene/about-scene.component';

const routes: Routes = [
  {
    path: 'all-scenes',
    component: AllScenesComponent
  },
  {
    path: 'add-scene',
    component: AddSceneComponent
  },
  {
    path: 'edit-scene/:id',
    component: EditSceneComponent
  },
  {
    path: 'about-scene/:id',
    component: AboutSceneComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenesRoutingModule { }
