import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from './../../../services/order_service/order.service';
import { Orders } from './../../../models/orders.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProductsOfOrders } from '../../../models/productsOfOrders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  p = 1;
  arr = []
  isLoading: boolean = true;
  maxMobile = matchMedia('max-width:(767px)');
  orders$: Subscription;
  orderForm: FormGroup;
  orders: Orders[]
  productOrders: ProductsOfOrders[];
  constructor(
    private _orders: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  $(ele) {
    return document.querySelector(ele);
  }
  ngOnInit(): void {

    this.route.queryParamMap.subscribe((params) => {
      if (params.keys.length !== 0) {
        this._orders.getOrder$.subscribe(() => this.getOrdersByFilter(params))
        this.getOrdersByFilter(params);
      } else {
        this._orders.getOrder$.subscribe(() => this.getAllOrders())
        this.getAllOrders();
      }
    })
    // Fire Get ALl Orders
    this.makeForm();
  }

  // Make The Form For Filter
  makeForm() {
    this.orderForm = this.fb.group({
      id: [''],
      name: [''],
      status: [''],
      city: [''],
      dateAdded: ['']
    })
  }

  // Get All Orders By Filters
  getOrdersByFilter(params) {
    this.orders$ = this._orders.getAllOrdersByFilter(params).subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.orders = res.body;
        this.isLoading = false;
      }
    })
  }

  // Go To Up On Paginate
  goUp() {
    let orders: HTMLDivElement = this.$('.orders');
    scrollTo({ top: orders.offsetTop });
  }

  // Get All Orders
  getAllOrders() {
    this.orders$ = this._orders.getAllOrders().subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        this.orders = res.body;
        this.isLoading = false;
      }
    })
  }

  // Geet Total Price
  totalPrice(i: number, data: Orders) {
    this.productOrders = data[i].orders;
    return this.productOrders.map((order) => order.priceAfterDiscount * order.amount).reduce((prev, current) => prev + current);
  }

  // Filter FN
  filter() {
    let formValue = this.orderForm.value;
    Object.keys(formValue).forEach(key => {

      if (formValue[key] == '') {
        delete formValue[key]
      }
      else {
        if (formValue.dateAdded !== '') {
          formValue.dateAdded = new Date(formValue.dateAdded).toDateString()
        }
        return key
      }
    })


    this.router.navigate(['/admin/orders'], { queryParams: formValue });

  }

  // Toggle Drop Down of delete and edit button
  toggleDropDown(dropDown: HTMLDivElement) {
    dropDown.classList.toggle('activeDropDown');
  }

  // Delete Order By Id
  deleteOrder(orderId: string) {
    this._orders.deleteOrderById(orderId).subscribe(res => {
      console.log(res);
    })
  }


  toggleForm(form: HTMLFormElement) {
    form.classList.toggle('activeForm')
  }

  stopProp(e: Event) {
    e.stopPropagation();
  }

  showValues(ele: HTMLInputElement) {
    if (ele.checked) {
      this.arr.push(ele.value)
    } else {
      this.arr = this.arr.filter(m => m != ele.value);
    }
    console.log(this.arr);
  }

  do(mainCheck: HTMLInputElement) {
    let allCheckboxs: any = document.getElementsByClassName('check');
    for (let box of allCheckboxs) {
      if (mainCheck.checked) {
        this.arr.push(box.value)
        box.checked = true;
      } else {
        this.arr = this.arr.filter(m => m != box.value);
        box.checked = false;
      }
    }
    console.log(this.arr);
  }

  ngOnDestroy() {
    this.orders$.unsubscribe();
  }

}
