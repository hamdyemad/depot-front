import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('lang') == null) {
      return next.handle(request);
    } else if (localStorage.getItem('lang') == 'ar') {
      console.log(localStorage.getItem('lang'))
      let req = request.clone({
        setHeaders: {
          'Accept-Language': 'ar'
        }
      });
      return next.handle(req);
    }
    else if (localStorage.getItem('lang') == 'en') {
      let req = request.clone({
        setHeaders: {
          'Accept-Language': 'en'
        }
      })
      return next.handle(req);
    }
  }
}
