import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsRoutingModule } from '../actors/actors-routing.module';
import { AllActorsComponent} from './all-actors/all-actors.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { AboutActorComponent } from './about-actor/about-actor.component';
import { EditActorComponent } from './edit-actor/edit-actor.component';

@NgModule({
  declarations: [
    AllActorsComponent,
    AddActorComponent,
    AboutActorComponent,
    EditActorComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule
  ]
})
export class ActorsModule { }
