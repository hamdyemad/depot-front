import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order_service/order.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  completed: any[];
  canceled: any[];
  constructor(private _order: OrderService) { }

  public donughtChartOptions = {
    responsive: true
  }
  public doughnutChartData: any = [
    {
      data: [4, 2],
      backgroundColor: [
        '#28a745',
        '#ee5253',
      ]
    },
  ];
  public doughnutCartType = 'pie';
  public doughnutChartLabels = ['Completed', 'Canceeld'];

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this._order.getAllOrders().subscribe((res: HttpResponse<any>) => {
      if (res.type == HttpEventType.Response) {
        let body: any[] = res.body
        this.completed = body.filter(value => value.status == 'complete').map(val => val.status);
        this.canceled = body.filter(value => value.status == 'canceled').map(val => val.status);
        this.doughnutChartData[0].data = [this.completed.length, this.canceled.length];
      }
    })
  }


}
