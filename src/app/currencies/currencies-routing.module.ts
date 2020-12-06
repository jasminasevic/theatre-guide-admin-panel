import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCurrenciesComponent } from './all-currencies/all-currencies.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';

const routes: Routes = [
  {
    path: 'all-currencies',
    component: AllCurrenciesComponent
  },
  {
    path: 'add-currency',
    component: AddCurrencyComponent
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
