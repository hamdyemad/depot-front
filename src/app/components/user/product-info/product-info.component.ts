import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth_service/auth.service';
import { CartService } from './../../../services/cart_service/cart.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { ProductsService } from './../../../services/products_service/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../../models/products.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  amount: number = 1;
  reviews = 3;
  reviewsArr = [];
  nonReview = [];
  product: Products;
  mobile = matchMedia('(max-width: 767px)').matches;
  constructor(
    private route: ActivatedRoute,
    private _products: ProductsService,
    private _cart: CartService,
    private _auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // review fn
    this.reviewFn();
    this.route.paramMap.subscribe(param => {
      if (param.keys.length !== 0) {
        let id = param.get('id');
        // Get Product
        this.getProductById(id);
      }
    })
  }

  // Get Product by id
  getProductById(id: string) {
    this._products.getProductById(id).subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.product = res.body;
      }
    })
  }

  // Decrease Amount
  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    } else {
      this.amount = 1
    }

  }


  // Increase Amount
  increaseAmount() {
    if (this.amount < 10) {
      this.amount++;
    } else {
      this.amount = 10;
    }

  }

  // Go Review
  reviewFn() {
    for (let i = 0; i < this.reviews; i++) {
      this.reviewsArr.push(i);
    }
    for (let y = 0; y < (5 - this.reviewsArr.length); y++) {
      this.nonReview.push(y);
    }
  }

  addToCart() {
    if (this._auth.isLoggedIn()) {
      let priceAfterDiscount = this.product.price - (this.product.price * this.product.discount / 100);
      this._cart.addToCart(
        this.product._id,
        this.product.name,
        this.product.description,
        this.product.category,
        this.product.image,
        this.product.price,
        priceAfterDiscount,
        this.product.discount,
        this.amount).subscribe((res: any) => {
          console.log(res);
          if (res.ok) {
            this.toastr.info('has been updated', this.product.name);
          } else {
            this.toastr.success('has added to cart', this.product.name);
          }
        })
    } else {
      this.toastr.error('please login first to add cart');
    }
  }

}
