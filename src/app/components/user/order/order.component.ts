import { TranslateDetectionService } from './../../../services/translate_service/translate-detection.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../../services/order_service/order.service';
import { CartService } from './../../../services/cart_service/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Carts } from '../../../models/carts.model';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('order', { static: true }) order: ElementRef;
  carts: Carts[];
  x = '1'
  totalPrice: number;
  orderForm: FormGroup;
  url = env.DB_URL;
  isLinear = true;
  orderInformation;
  constructor(
    private fb: FormBuilder, private _cart: CartService,
    private _order: OrderService,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService,
    private _translate: TranslateDetectionService) { }

  ngOnInit(): void {
    this._translate.changeStyle(this.order)
    // Fire Get All Carts
    this.getAllCarts();
    // this._cart.cartSubscription.subscribe(() => {
    //   this.getAllCarts();
    // })

    // Fire Make Form
    this.makeForm();
  }

  makeForm() {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      city: ['', Validators.required],
      comment: ['']
    });
  }


  getAllCarts() {
    this._cart.getAllCarts().subscribe((res: Carts[]) => {
      this.carts = res;
      console.log(this.carts);
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

  // Get Input of form to validate

  clientName() {
    return this.orderForm.controls.clientName
  }
  address() {
    return this.orderForm.controls.address
  }
  mobile() {
    return this.orderForm.controls.mobile
  }
  city() {
    return this.orderForm.controls.city
  }


  onOrder(paymentStep) {
    let formValue = this.orderForm.value;
    console.log(this.carts);
    console.log(formValue);
    if (this.orderForm.valid) {
      paymentStep.select();
      this.orderInformation = formValue;
    }
  }

  confirmOrderWithNoCard() {
    this._order.addOrder(this.carts, this.orderInformation).subscribe((res) => {
      console.log(res);
      this._cart.removeAllCart().subscribe((res) => {
        console.log(res);
        if (this.translate.currentLang == 'ar') {
          this.toastr.success('لقد تم تنفيذ طلبك', this.orderInformation.clientName)
        } else {
          this.toastr.success('your order has been confirmed', this.orderInformation.clientName)
        }
        this.router.navigate(['/']);
      })
    });
  }



}
