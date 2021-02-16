import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private router: Router, 
    private jwtHelper: JwtHelperService) {
  }

  isUserAuthenticated(){
    const token: string = localStorage.get("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      console.log("token je tu", token);
      return true;
    }
    else{
      console.log("token ne radi")
      return false;
    }
  }

}
