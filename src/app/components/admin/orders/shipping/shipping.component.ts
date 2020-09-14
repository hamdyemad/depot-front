import { Orders } from './../../../../models/orders.model';
import { OrderService } from './../../../../services/order_service/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsOfOrders } from '../../../../models/productsOfOrders';
import { Products } from '../../../../models/products.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  invoices: Orders[]
  productOrders: [];
  constructor(private route: ActivatedRoute, private _order: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((url: Params) => {
      if (url) {
        let params = url.params;
        let paramArray = Object.values(params);
        this.getInvoices(paramArray)
      }
    })
  }

  getInvoices(body) {
    this._order.getInvoices(body).subscribe((res: Orders[]) => {
      this.invoices = res;
      console.log(res);
    })
  }

  getTotalPrice(i: number) {
    return this.invoices[i].orders.map((order: any) => order.priceAfterDiscount * order.amount).reduce((prev, current) => prev + current);
  }

}
