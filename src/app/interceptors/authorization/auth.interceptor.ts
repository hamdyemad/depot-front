import { AuthService } from './../../services/auth_service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._auth.isLoggedIn()) {
      let req = request.clone({
        setHeaders: {
          Authorization: this._auth.getToken()
        }
      })
      return next.handle(req);
    } else {
      return next.handle(request);
    }
  }
}
