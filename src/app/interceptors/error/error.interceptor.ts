import { AuthService } from './../../services/auth_service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router, private _auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      let errorTxt = 'please login first you are not authorized !';
      localStorage.removeItem('role');
      this.toastr.error(errorTxt, err.error);
      this._auth.logOut();
      throw new Error(errorTxt);
    }))
  }
}
