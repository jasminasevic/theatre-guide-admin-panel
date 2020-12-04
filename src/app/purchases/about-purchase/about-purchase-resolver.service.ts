import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PurchasesService } from '../all-purchases/purchases.service';
import { PurchaseWithDetails } from '../all-purchases/purchaseWithDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AboutPurchaseResolverService implements Resolve<PurchaseWithDetails> {

constructor(private purchaseService: PurchasesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PurchaseWithDetails>  {
    return this.purchaseService.getPurchase(+route.paramMap.get('id'))
  }

}
