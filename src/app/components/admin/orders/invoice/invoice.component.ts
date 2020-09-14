import { OrderService } from './../../../../services/order_service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsOfOrders } from '../../../../models/productsOfOrders';
import { Orders } from '../../../../models/orders.model';
import { environment as env } from '../../../../../environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  url = env.DB_URL;
  totalPrice: number;
  order: Orders;
  productOrders: ProductsOfOrders[];
  constructor(private route: ActivatedRoute, private _order: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      if (param) {
        let id = param.get('id');
        this.getOrderById(id);
      }
    })
  }

  getOrderById(orderId: string) {
    this._order.getOrderById(orderId).subscribe(data => {
      this.order = data;
      this.productOrders = data.orders;
      this.totalPrice = this.productOrders.map((order) => order.priceAfterDiscount * order.amount).reduce((prev, current) => prev + current);
      console.log(this.order);
      console.log(this.productOrders);
      console.log(this.totalPrice);
    })
  }

}
