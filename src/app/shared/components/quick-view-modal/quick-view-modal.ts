import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Product }
from '../../../models/product.model';

import { CartService }
from '../../../services/cart.service';

import { WishlistService }
from '../../../services/wishlist.service';

import { ToastService }
from '../../../services/toast.service';
import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';

import {
  PLATFORM_ID,
  
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';
@Component({
  selector: 'app-quick-view-modal',
  standalone: true,

  imports: [
    CommonModule,
  TranslateModule
  ],

  templateUrl:
    './quick-view-modal.html',

  styleUrl:
    './quick-view-modal.scss'
})
export class QuickViewModal {

  @Input()
  product!: Product;

  @Output()
  close =
    new EventEmitter<void>();
translate = inject(TranslateService);

platformId = inject(PLATFORM_ID);
  private cartService =
    inject(CartService);

  private wishlistService =
    inject(WishlistService);

  private toastService =
    inject(ToastService);
constructor() {

  this.translate.setDefaultLang('en');

  if (isPlatformBrowser(this.platformId)) {

    const lang =
      localStorage.getItem('lang') ?? 'en';

    this.translate.use(lang);

  }

}
  addToCart(): void {

    this.cartService
      .addToCart(this.product);

    this.toastService.show(
  'QUICK_VIEW.ADDED_TO_CART',
  'success'
);

  }

  addToWishlist(): void {

    this.wishlistService.addToWishlist(this.product);

   this.toastService.show(
  'QUICK_VIEW.ADDED_TO_WISHLIST',
  'success'
);

  }

}