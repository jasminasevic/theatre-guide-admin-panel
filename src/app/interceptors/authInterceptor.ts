import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

    constructor(){}

    public getToken(): string {
        return localStorage.getItem('jwt');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.getToken()}`
            }
          });
          return next.handle(request);
        }
    }
