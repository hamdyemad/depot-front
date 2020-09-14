import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
const DB_URL = env.DB_URL;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder$ = new Subject<any>();

  get getOrderSubject() {
    return this.getOrder$;
  }

  addOrder(orders: Array<Object>, clientInfo: Object) {
    return this.http.post(`${DB_URL}/order`, {
      orders,
      clientInfo
    })
  }

  addOrderHistory(orderId, history: Object) {
    return this.http.post(`${DB_URL}/order/history/${orderId}`, history).pipe(tap(() => this.getOrder$.next()))
  }
  addOrdersHistory(body: Object) {
    return this.http.post(`${DB_URL}/order/history`, body);
  }

  getOrders() {
    return this.http.get(`${DB_URL}/order/status`);
  }


  getAllOrders() {
    return this.http.get<any>(`${DB_URL}/order`, { observe: 'events' })
  }

  getAllOrdersByFilter(queryParams) {
    let params = queryParams.params;
    let x: string = '';
    let query: string = '';
    Object.keys(params).forEach((param) => {
      x += `${param}=${params[param]}&`
      query = x.slice(0, x.length - 1)
    })
    return this.http.get<any>(`${DB_URL}/order?${query}`, { observe: 'events' })
  }

  getOrderById(orderId: string) {
    return this.http.get<any>(`${DB_URL}/order/${orderId}`)
  }

  deleteOrderById(orderId: string) {
    return this.http.delete(`${DB_URL}/order/${orderId}`).pipe(tap(() => this.getOrder$.next()));
  }

  updateStatus(body) {
    return this.http.patch<any>(`${DB_URL}/order`, body);
  }

  getInvoices(body: Array<any>) {
    return this.http.post<any>(`${DB_URL}/order/shipping`, body);
  }

  getOrdersBySeq(seq) {
    return this.http.post<any>(`${DB_URL}/order/export`, seq);
  }

}
