import { AuthService } from './../../services/auth_service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(this._auth.isAdmin())
    if (this._auth.isAdmin() || this._auth.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
