import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from 'src/app/authentication/tokenStorage.service';
import { PurchasesService } from 'src/app/purchases/all-purchases/purchases.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userFirstName: string;
  purchasesNumber: any;

  constructor(private token: TokenStorageService,
    private purchaseService: PurchasesService) {
    this.userFirstName = this.token.getFirstName();
  }

  ngOnInit() {
    this.purchaseService.getPurchasesTotalNumber()
      .subscribe(data => {
        this.purchasesNumber = data
      })
  }

}
