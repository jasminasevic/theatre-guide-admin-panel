import { HttpHeaders } from '@angular/common/http';

export const API_URL = "http://localhost:50484/api";



export const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type':'application/json',
    // 'Accept':'*/*'
    // 'Authorization' : 'Bearer '+ tokenGetter()
  })
};
