import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  RouterLink
} from '@angular/router';
import { CartService }
from '../../services/cart.service';
import {
  isPlatformBrowser
} from '@angular/common';
import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';
import {
  PLATFORM_ID
} from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,

  imports: [
    CommonModule,
     RouterLink,
     TranslateModule
  ],

  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartService =
    inject(CartService);
  translate =inject(TranslateService);
   platformId =
   inject(PLATFORM_ID);
}