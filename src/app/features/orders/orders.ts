import {
  Component,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  OrdersService
} from '../../services/orders.service';

import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,

  imports: [
    CommonModule,
    TranslateModule
  ],

  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders {

  ordersService =
    inject(OrdersService);

  translate =
    inject(TranslateService);

  platformId =
    inject(PLATFORM_ID);

  constructor() {

    this.translate.setDefaultLang(
      'en'
    );

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      const lang =
        localStorage.getItem('lang')
        ?? 'en';

      this.translate.use(lang);

    }

    this.ordersService.loadOrders();

  }

}