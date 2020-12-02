import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPurchasesComponent } from './all-purchases/all-purchases.component';
import { AboutPurchaseComponent } from './about-purchase/about-purchase.component';

const routes: Routes = [
  {
    path: 'all-purchases',
    component: AllPurchasesComponent
  },
  {
    path: 'about-purchase/:id',
    component: AboutPurchaseComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
