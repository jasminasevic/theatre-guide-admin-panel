import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTableSummaryRowComponent } from '@swimlane/ngx-datatable';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(private router: Router, private jwtHelper: JwtHelperService ) { }

  canActivate() {
    const token = localStorage.getItem("jwt");
    let decodedToken = jwt_decode<JwtPayload>(token);
    let roleId = decodedToken['RoleId'];

    if(roleId == 1 && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }

}
