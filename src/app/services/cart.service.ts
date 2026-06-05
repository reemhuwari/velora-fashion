import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Product } from '../models/product.model';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems =
    signal<CartItem[]>([]);

  totalPrice = computed(() => {

    return this.cartItems()
      .reduce(

        (total, item) =>

          total +
          (
            item.product.price *
            item.quantity
          ),

        0
      );

  });

  totalItems = computed(() => {

    return this.cartItems()
      .reduce(

        (total, item) =>

          total + item.quantity,

        0
      );

  });

  constructor() {

  if (typeof window !== 'undefined') {

    const savedCart =
      localStorage.getItem('cart');

    if (savedCart) {

      this.cartItems.set(
        JSON.parse(savedCart)
      );

    }

  }

}

  addToCart(
    product: Product
  ): void {

    const items =
      [...this.cartItems()];

    const existingItem =
      items.find(

        item =>
          item.product.id ===
          product.id

      );

    if (existingItem) {

      existingItem.quantity++;

    }

    else {

      items.push({

        product,
        quantity: 1

      });

    }

    this.cartItems.set(items);

    this.saveCart();

  }

  increaseQuantity(
    productId: number
  ): void {

    const items =
      [...this.cartItems()];

    const item =
      items.find(

        item =>
          item.product.id ===
          productId

      );

    if (item) {

      item.quantity++;

      this.cartItems.set(items);

      this.saveCart();

    }

  }

  decreaseQuantity(
    productId: number
  ): void {

    const items =
      [...this.cartItems()];

    const item =
      items.find(

        item =>
          item.product.id ===
          productId

      );

    if (
      item &&
      item.quantity > 1
    ) {

      item.quantity--;

      this.cartItems.set(items);

      this.saveCart();

    }

  }

  removeItem(
    productId: number
  ): void {

    const filtered =
      this.cartItems()
        .filter(

          item =>
            item.product.id !==
            productId

        );

    this.cartItems.set(filtered);

    this.saveCart();

  }

  saveCart(): void {

  if (typeof window !== 'undefined') {

    localStorage.setItem(

      'cart',

      JSON.stringify(
        this.cartItems()
      )

    );

  }

}

}