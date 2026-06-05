import {
  Component,
  inject
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  CartService
} from '../../services/cart.service';

import {
  OrdersService
} from '../../services/orders.service';

import {
  ToastService
} from '../../services/toast.service';

import {
  PLATFORM_ID
} from '@angular/core';

import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],

  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {

  private router = inject(Router);

  cartService = inject(CartService);

  private toastService =
    inject(ToastService);

  private ordersService =
    inject(OrdersService);

  translate =
    inject(TranslateService);

  platformId =
    inject(PLATFORM_ID);

  fullName = '';

  phone = '';

  city = '';

  address = '';

  paymentMethod = 'card';

  errorMessage = '';

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
        localStorage.getItem(
          'lang'
        ) ?? 'en';

      this.translate.use(
        lang
      );

    }

  }

 placeOrder(): void {

  const currentUser =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  if (
    !this.fullName ||
    !this.phone ||
    !this.city ||
    !this.address
  ) {

    this.errorMessage =
      this.translate.instant(
        'CHECKOUT.ERROR_FILL_FIELDS'
      );

    return;

  }

  const order = {

    customerId:
      currentUser.id,

    customer:
      currentUser.name,

    email:
      currentUser.email,

    phone:
      this.phone,

    city:
      this.city,

    address:
      this.address,

    items:
      this.cartService.cartItems(),

    total:
      this.cartService.totalPrice(),

    date:
      new Date().toLocaleDateString(),

    status:
      'Pending'

  };

  this.ordersService
    .createOrder(order)
    .subscribe({

     next: () => {

  this.ordersService.loadOrders();

  this.toastService.show(
    this.translate.instant(
      'CHECKOUT.SUCCESS_ORDER'
    ),
    'success'
  );

  localStorage.removeItem('cart');

  this.cartService.cartItems.set([]);

  this.router.navigate([
    '/orders'
  ]);

}

    });

}
}