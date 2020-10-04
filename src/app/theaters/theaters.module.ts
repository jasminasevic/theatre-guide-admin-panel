import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatersRoutingModule } from './theaters-routing.module';
import { AllTheatersComponent } from './all-theaters/all-theaters.component';

@NgModule({
  imports: [
    CommonModule,
    TheatersRoutingModule
  ],
  declarations: [
    AllTheatersComponent
  ]
})
export class TheatersModule { }
