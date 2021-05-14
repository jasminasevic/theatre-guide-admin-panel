import { HttpHeaders } from '@angular/common/http';

export const API_URL = "http://localhost:50484/api";



export const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':'application/json',
    // 'Accept':'*/*'
    // 'Authorization' : 'Bearer '+ tokenGetter()
  })
};

export const TOKEN_KEY = 'jwt';

export const USER_KEY = 'PerformerData';

export const USER_ID_KEY = 'Id';

export const USER = 'Identity';

export const FIRST_NAME = 'FirstName';

export const ROLE_KEY = 'Role';
