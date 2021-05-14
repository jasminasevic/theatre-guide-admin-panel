import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPurchasesComponent } from './all-purchases/all-purchases.component';
import { AboutPurchaseComponent } from './about-purchase/about-purchase.component';
import { AboutPurchaseResolverService } from './about-purchase/about-purchase-resolver.service';

const routes: Routes = [
  {
    path: 'all-reservations',
    component: AllPurchasesComponent
  },
  {
    path: 'about-reservation/:id',
    component: AboutPurchaseComponent,
    resolve: { aboutPurchase: AboutPurchaseResolverService }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
