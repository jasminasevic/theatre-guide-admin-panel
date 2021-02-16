import { HttpHeaders } from '@angular/common/http';

export const API_URL = "http://localhost:50484/api";

function tokenGetter() {
  return localStorage.getItem("jwt");
}


export const httpOptions = {
  headers: new HttpHeaders({
   // 'Content-Type':'application/json',
  // 'Accept':'*/*'
     'Authorization' : 'Bearer '+ tokenGetter()
  })
};
