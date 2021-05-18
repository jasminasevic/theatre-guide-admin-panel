import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLoggingsComponent } from './all-loggings/all-loggings.component';

const routes: Routes = [
{
  path: 'all-loggings',
  component: AllLoggingsComponent
}]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoggingsRoutingModule { }
