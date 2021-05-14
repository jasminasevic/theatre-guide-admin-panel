import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from 'src/app/authentication/tokenStorage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  userFirstName: string;

  constructor(private token: TokenStorageService) {
    this.userFirstName = this.token.getFirstName();
  }

}
