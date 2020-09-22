import { TranslateDetectionService } from './../../../services/translate_service/translate-detection.service';
import { TranslateService } from '@ngx-translate/core';
import { Orders } from './../../../models/orders.model';
import { AuthService } from './../../../services/auth_service/auth.service';
import { OrderService } from './../../../services/order_service/order.service';
import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  @ViewChildren('queryTrack') queryTrack: QueryList<any>;
  @ViewChild('myOrders', { static: true }) myOrders: ElementRef;
  url = env.DB_URL;
  orders: Orders[];
  confirmed: Orders[];
  tracks;
  status: string[];
  $(ele) {
    return document.querySelector(ele);
  }
  constructor(
    private _order: OrderService,
    private _auth: AuthService,
    public translate: TranslateService,
    private _translate: TranslateDetectionService) { }

  do(number: number, track: HTMLDivElement) {
    console.log(number);
    for (let i = 0; i < number; i++) {
      console.log(track.children[i])
      track.children[i].classList.add('active');
    }
  }

  ngOnInit(): void {
    this._translate.changeStyle(this.myOrders);
    this.getOrders();
  }

  getOrders() {
    this._order.getOrders().subscribe((res: Array<any>) => {
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
      default:
        this.do(1, this.tracks);
    }
  }
}
