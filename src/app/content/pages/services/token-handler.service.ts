import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenHandlerService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }
  intercept(req, next): Observable<HttpEvent<any>> {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
  }

