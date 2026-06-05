import {
  Injectable,
  signal,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http =
    inject(HttpClient);

  private api =
    'http://localhost:3000/orders';

  orders =
    signal<any[]>([]);

  createOrder(order: any) {

    return this.http.post(
      this.api,
      order
    );

  }

  getOrders() {

    return this.http.get<any[]>(
      this.api
    );

  }

  loadOrders(): void {

    this.getOrders()
      .subscribe(res => {

        this.orders.set(res);

      });

  }

}