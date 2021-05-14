import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/authentication/tokenStorage.service';
import { PurchasesService } from 'src/app/purchases/all-purchases/purchases.service';
import { TheatreService } from '../../theatres/all-theatres/theatres.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userFirstName: string;
  purchasesNumber: any;
  approvedTheatresNumber: any;

  constructor(private token: TokenStorageService,
    private purchaseService: PurchasesService,
    private theatreService: TheatreService) {
    this.userFirstName = this.token.getFirstName();
  }

  ngOnInit() {
    this.purchaseService.getPurchasesTotalNumber()
      .subscribe(data => {
        this.purchasesNumber = data
      })

    this.theatreService.getCountedApprovedTheatres()
      .subscribe(data => {
        this.approvedTheatresNumber = data
      })
  }

}
