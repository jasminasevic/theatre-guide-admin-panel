import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseWithDetails } from '../all-purchases/purchaseWithDetails.model';

@Component({
  selector: 'app-about-purchase',
  templateUrl: './about-purchase.component.html',
  styleUrls: ['./about-purchase.component.scss']
})
export class AboutPurchaseComponent {

  purchase: PurchaseWithDetails;

  constructor(private activatedRoute: ActivatedRoute) {
      this.purchase = this.activatedRoute.snapshot.data['aboutPurchase']
    }
}
