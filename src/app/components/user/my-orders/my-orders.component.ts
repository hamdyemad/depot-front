import { Orders } from './../../../models/orders.model';
import { AuthService } from './../../../services/auth_service/auth.service';
import { OrderService } from './../../../services/order_service/order.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  @ViewChildren('queryTrack') queryTrack: QueryList<any>;
  url = env.DB_URL;
  orders: Orders[];
  confirmed: Orders[];
  tracks;
  status: string[];
  $(ele) {
    return document.querySelector(ele);
  }
  constructor(private _order: OrderService, private _auth: AuthService) { }

  do(number: number, track: HTMLDivElement) {
    for (let i = 0; i < number; i++) {
      track.children[i].classList.add('active');
    }
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._order.getOrders().subscribe((res: Array<any>) => {
      console.log(res);
      this.orders = res.filter(val => val.status !== 'canceled' && val.status !== 'complete');
      this.confirmed = res.filter(val => val.status == 'complete');
      this.status = res.map((st) => st.status).filter(status => status !== 'canceled');

      this.queryTrack.changes.forEach((trackArr) => {
        trackArr.toArray().forEach((x, i) => {
          this.tracks = x.nativeElement;
          // Switch Case
          this.switch(i);
        })
      })
    })
  }


  switch(i: number) {
    if (this.status[i].startsWith('shipped') || this.status[i] == 'reversed') {
      this.do(3, this.tracks);
    }
    switch (this.status[i]) {
      case 'processing':
        this.do(2, this.tracks)
        break
      case 'complete':
        this.do(4, this.tracks)
        break
    }
  }
}
