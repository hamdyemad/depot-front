import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsOfOrders } from './../../../../models/productsOfOrders';
import { Orders } from './../../../../models/orders.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../../services/order_service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  historyArray: [];
  historyForm: FormGroup;
  totalPrice: number;
  order: Orders;
  productOrders: ProductsOfOrders[];
  constructor(private route: ActivatedRoute, private _order: OrderService, private fb: FormBuilder) { }

  ngOnInit(): void {


    // Fire Make History Form
    this.makeHistoryForm();
    this.route.paramMap.subscribe(param => {
      let orderId = param.get('id');
      this._order.getOrder$.subscribe(() => {
        this.getOrderById(orderId)
      })
      this.getOrderById(orderId)


    });
  }

  makeHistoryForm() {
    this.historyForm = this.fb.group({
      status: [],
      notifiedCustomer: [],
      comment: []
    })
  }

  updateForm() {
    this.historyForm.patchValue({
      status: this.order.status,
      comment: this.order.comment,
      notifiedCustomer: this.order.notifiedCustomer
    })
  }

  onAddHistory() {
    let formValue = this.historyForm.value;
    formValue.dateModified = new Date();
    this._order.addOrderHistory(this.order._id, formValue).subscribe(res => {
      console.log(res);
    })
  }


  getOrderById(orderId: string) {
    this._order.getOrderById(orderId).subscribe(data => {
      this.order = data;
      this.productOrders = data.orders;
      this.historyArray = data.orderHistory;
      console.log(this.historyArray)
      this.totalPrice = this.productOrders.map((order) => order.priceAfterDiscount * order.amount).reduce((prev, current) => prev + current);

      // Update Form
      this.updateForm();
    })
  }

}
