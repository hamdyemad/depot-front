import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Carts } from './../../../models/carts.model';
import { CartService } from './../../../services/cart_service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalPrice: number;
  carts: Carts[];
  constructor(private _cart: CartService, private toastr: ToastrService) { }

  $(ele) {
    return document.querySelector(ele);
  }
  ngOnInit(): void {
    this.getAllCarts$();
    this.getAllCarts();
  }


  getAllCarts$() {
    this._cart.getAllCartsSubject.subscribe(() => {
      this.getAllCarts();
    })
  }

  getAllCarts() {
    this._cart.getAllCarts().subscribe((res: Carts[]) => {
      this.carts = res;
      if (this.carts.length !== 0) {
        let totalPrice = this.carts.map((cart) => {
          return cart.amount * cart.priceAfterDiscount
        }).reduce((prev, current) => {
          return prev + current
        })
        this.totalPrice = totalPrice;
      }

    })
  }

  removeCart(cartId: string) {
    this._cart.removeCart(cartId).subscribe((res) => {
      console.log(res);
    })
  }

  decreaseAmount(i: number, name: string) {
    if (this.carts[i].amount <= 1) {
      this.carts[i].amount = 1
    } else {
      this.carts[i].amount--;
      this.onUpdate(i, name);
    }

  }

  increaseAmount(i: number, name: string) {
    if (this.carts[i].amount >= 10) {
      this.carts[i].amount = 10
    } else {
      this.carts[i].amount++;
      this.onUpdate(i, name)
    }
  }

  onUpdate(i: number, name: string) {
    this._cart.updateCart(this.carts[i]._id, this.carts[i].amount).subscribe((res) => {
      this.toastr.info('has been updated', name);
    })
  }

}