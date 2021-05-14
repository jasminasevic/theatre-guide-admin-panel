import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { FIRST_NAME, ROLE_KEY, TOKEN_KEY, USER, USER_ID_KEY, USER_KEY } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router,
    private jwtHelper: JwtHelperService) { }

  public saveToken(token: string) : void{
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  
  public getToken() : string {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  isTokenExpired: boolean = true;
  token: any;
  
  isExpired(){
    this.token = this.getToken();
    if(!this.jwtHelper.isTokenExpired(this.token)){
      return this.isTokenExpired = false;
    } 
  }

  public saveUser(user) : void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } 

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public saveUserId(userId) : void {
    localStorage.setItem(USER_ID_KEY, userId);
  }

  public getUserId() : any {
    return localStorage.getItem(USER_ID_KEY);
  }

  public saveRoleId(roleId) : void {
    localStorage.setItem(ROLE_KEY, roleId);
  }

  public saveUsername(username) : void {
    localStorage.setItem(USER, username);
  }

  public getUsername() : any {
    return localStorage.getItem(USER);
  }

  public saveFirstName(firstName) : void {
    localStorage.setItem(FIRST_NAME, firstName);
  }

  public getFirstName() : any {
    return localStorage.getItem(FIRST_NAME);
  }

  public setRoleId() {
    const token = this.getToken()
    this.saveToken(token);

    const decodedToken = jwtDecode<JwtPayload>(token);
        let userData = decodedToken[USER_KEY]
        let storageData = JSON.parse(userData);
        let keys = Object.keys(storageData);
        let values = keys.map(k => storageData[k]);
        let roleId = values[3];
        return roleId;
  }

  public setUserId(){
    const token = this.getToken()
    this.saveToken(token);

    const decodedToken = jwtDecode<JwtPayload>(token);
        let userData = decodedToken[USER_KEY]
        let storageData = JSON.parse(userData);
        let keys = Object.keys(storageData);
        let values = keys.map(k => storageData[k]);
        let userId = values[0];
        return userId;
  }

  public setFirstName(){
    const token = this.getToken()
    this.saveToken(token);

    const decodedToken = jwtDecode<JwtPayload>(token);
        let userData = decodedToken[USER_KEY]
        let storageData = JSON.parse(userData);
        let keys = Object.keys(storageData);
        let values = keys.map(k => storageData[k]);
        let userId = values[2];
        return userId;
  }
}

