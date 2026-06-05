import { Component, inject } from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  WishlistService
} from '../../services/wishlist.service';

import { ProductCard }
from '../../shared/components/product-card/product-card';
import {
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-wishlist',
  standalone: true,

  imports: [
    CommonModule,
    ProductCard,
  TranslateModule
  ],

  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {

  wishlistService =
    inject(WishlistService);

}