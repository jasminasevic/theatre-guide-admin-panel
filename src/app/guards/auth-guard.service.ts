import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTableSummaryRowComponent } from '@swimlane/ngx-datatable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(private router: Router, private jwtHelper: JwtHelperService ) { }

  canActivate() {
    const token = localStorage.getItem("jwt");
    console.log("token u auth guard-u", token);

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }

}
