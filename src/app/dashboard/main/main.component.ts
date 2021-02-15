import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private router: Router) {
  }

  isUserAuthenticated(){
    const token: string = localStorage.get("jwt");
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

}
