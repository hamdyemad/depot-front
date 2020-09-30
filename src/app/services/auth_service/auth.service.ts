import { tap } from 'rxjs/operators';
import { CartService } from './../cart_service/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

const DB_URL = env.DB_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _cart: CartService) { }

  register(userName: string, email: string, password: string) {
    return this.http.post<any>(`${DB_URL}/register`, {
      userName,
      email,
      password
    })
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${DB_URL}/login`, { email, password });
  }


  getUserInfo() {
    return this.http.get<any>(`${DB_URL}/user`);
  }

  setToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  isAdmin(): boolean {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      return true
    } else {
      return false
    }
  }

  isSuperAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role == 'super-admin') {
      return true
    } else {
      return false
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async logOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }


}
