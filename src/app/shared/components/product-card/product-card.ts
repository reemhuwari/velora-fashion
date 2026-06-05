import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';
import { inject } from '@angular/core';
import {
  WishlistService
} from '../../../services/wishlist.service';
import { CartService }
from '../../../services/cart.service';
import {
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-product-card',
  standalone: true,

  imports: [
  CommonModule,
  RouterLink,
  TranslateModule
],

  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {

  @Input() product!: Product;
private cartService =
  inject(CartService);

addToCart(
  event: Event
): void {

  event.stopPropagation();

  this.cartService.addToCart(this.product);

  this.showSuccessMessage = true;

  setTimeout(() => {

    this.showSuccessMessage = false;

  }, 2000);

}
showSuccessMessage = false;
wishlistService =
  inject(WishlistService);

toggleWishlist(
  event: Event
): void {

  event.stopPropagation();

  this.wishlistService
    .toggleWishlist(this.product);

}
}