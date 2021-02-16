import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCurrenciesComponent } from './all-currencies/all-currencies.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';
import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'all-currencies',
    component: AllCurrenciesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-currency',
    component: AddCurrencyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-currency/:id',
    component: EditCurrencyComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class CurrenciesRoutingModule { }
