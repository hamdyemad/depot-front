import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators'

const DB_URL = env.DB_URL;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private getAllCarts$ = new Subject<any>();

  get getAllCartsSubject() {
    return this.getAllCarts$;
  }

  getAllCarts() {
    return this.http.get<any>(`${DB_URL}/cart`)
  }


  addToCart(
    productId: string,
    name: string,
    description: string,
    category: string,
    nameAr: string,
    descriptionAr: string,
    categoryAr: string,
    image: string,
    price: number,
    priceAfterDiscount: number,
    discount: number,
    amount: number) {
    return this.http.post(`${DB_URL}/cart`, {
      productId,
      name,
      description,
      category,
      nameAr,
      descriptionAr,
      categoryAr,
      image,
      price,
      priceAfterDiscount,
      discount,
      amount
    }).pipe(tap(() => {
      this.getAllCarts$.next();
    }))
  }

  removeCart(cartId: string) {
    return this.http.delete(`${DB_URL}/cart/${cartId}`).pipe(tap(() => {
      this.getAllCarts$.next();
    }))
  };

  removeAllCart() {
    return this.http.delete(`${DB_URL}/cart`).pipe(tap(() => {
      this.getAllCarts$.next();
    }))
  }

  updateCart(cartId: string, amount: number) {
    return this.http.patch(`${DB_URL}/cart/${cartId}`, { amount }).pipe(tap(() => {
      this.getAllCarts$.next();
    }))
  }

}
