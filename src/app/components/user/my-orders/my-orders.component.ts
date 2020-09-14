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

  @ViewChildren('track') track: QueryList<any>;
  url = env.DB_URL;
  orders: Orders;
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
    this._order.getOrders().subscribe((res: any) => {
      this.orders = res;
      console.log(res)
      this.status = res.map((st) => st.status);
      this.track.changes.forEach((trackArr) => {
        trackArr.toArray().forEach((x, i) => {
          this.tracks = x.nativeElement;
          // Switch Case
          this.switch(i);
        })
      })
    })
  }
  switch(i: number) {
    switch (this.status[i]) {
      case 'pending' || 'processed':
        this.do(1, this.tracks);
        break
      case 'processing':
        this.do(2, this.tracks)
        break
      case 'shipped' || 'reversed' || 'shipped with fetcher':
        this.do(3, this.tracks)
        break
      case 'complete':
        this.do(4, this.tracks)
        break
    }
  }
}

                // for (let i = 0; i < this.status.length; i++) {
                //   console.log(this.status[i]);
                //   console.log(this.tracks)
                // }
// switch (status) {
//   case 'pending':
//     this.do(1, track);
//     break
//   case 'processing':
//     this.do(2, track)
//     break
//   case 'shipped':
//     this.do(3, track)
//     break
//   case 'delivered':
//     this.do(4, track)
//     break
// }
