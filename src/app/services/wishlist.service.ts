import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Product }
from '../models/product.model';

import {
  WishlistItem
} from '../models/wishlist-item.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItems =
    signal<WishlistItem[]>([]);

  totalItems = computed(() => {

    return this.wishlistItems().length;

  });

  constructor() {

    if (typeof window !== 'undefined') {

      const savedWishlist =
        localStorage.getItem(
          'wishlist'
        );

      if (savedWishlist) {

        this.wishlistItems.set(
          JSON.parse(savedWishlist)
        );

      }

    }

  }

  toggleWishlist(
    product: Product
  ): void {

    const items =
      [...this.wishlistItems()];

    const exists =
      items.find(

        item =>
          item.product.id ===
          product.id

      );

    if (exists) {

      const filtered =
        items.filter(

          item =>
            item.product.id !==
            product.id

        );

      this.wishlistItems.set(
        filtered
      );

    }

    else {

      items.push({ product });

      this.wishlistItems.set(
        items
      );

    }

    this.saveWishlist();

  }

  isInWishlist(
    productId: number
  ): boolean {

    return this.wishlistItems()
      .some(

        item =>
          item.product.id ===
          productId

      );

  }
addToWishlist(
  product: Product
): void {

  const exists =

    this.wishlistItems()
      .find(

        item =>
          item.product.id ===
          product.id

      );

  if (exists) {
    return;
  }

  this.wishlistItems.update(

    items => [

      ...items,

      {
        product
      }

    ]

  );

  this.saveWishlist();

}
  saveWishlist(): void {

    if (typeof window !== 'undefined') {

      localStorage.setItem(

        'wishlist',

        JSON.stringify(
          this.wishlistItems()
        )

      );

    }

  }

}