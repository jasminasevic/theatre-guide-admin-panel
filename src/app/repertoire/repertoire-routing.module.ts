import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRepertoriesComponent } from './all-repertories/all-repertories.component';
import { AddRepertoireComponent } from './add-repertoire/add-repertoire.component';
import { EditRepertoireComponent } from './edit-repertoire/edit-repertoire.component';
import { AboutRepertoireComponent } from './about-repertoire/about-repertoire.component';
import { AboutRepertoireResolverService } from './about-repertoire/about-repertoire-resolver.service';

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
  },
  {
    path: 'about-play/:id',
    component: AboutRepertoireComponent,
    resolve: { aboutPlay: AboutRepertoireResolverService }
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepertoireRoutingModule { }
