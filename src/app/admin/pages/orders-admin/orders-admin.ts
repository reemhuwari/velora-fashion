import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  OrdersService
} from '../../../services/orders.service';

@Component({
  selector: 'app-orders-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-admin.html',
  styleUrl: './orders-admin.scss'
})
export class OrdersAdmin
implements OnInit {

  private ordersService =
    inject(OrdersService);

  orders =
    signal<any[]>([]);

  ngOnInit(): void {

    this.ordersService
      .getOrders()
      .subscribe(res => {

        this.orders.set(res);

      });

  }

}