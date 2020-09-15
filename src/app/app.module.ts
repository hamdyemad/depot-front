import { InternetInterceptor } from './interceptors/internet-checking/internet.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { AuthInterceptor } from './interceptors/authorization/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminModule } from './components/admin/admin.module';
import { UserModule } from './components/user/user.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChangeThemesComponent } from './components/change-themes/change-themes.component';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ChangeThemesComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
