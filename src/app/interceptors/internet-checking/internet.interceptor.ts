import { DialogComponent } from './../../components/dialog/dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (navigator.onLine) {
      return next.handle(request);
    } else {
      let errMessage = 'please check your internet connection';
      this.dialog.open(DialogComponent, { data: errMessage });
      return next.handle(request);
    }
  }
}
