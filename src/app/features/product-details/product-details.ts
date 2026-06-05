import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { FormsModule }
from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product.model';
import {
  PLATFORM_ID
} from '@angular/core';
import { CartService } from '../../services/cart.service';

import {
  isPlatformBrowser
} from '@angular/common';
import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-product-details',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
TranslateModule,

  ],

  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails
implements OnInit {
translate =
  inject(TranslateService);
private cartService = inject(CartService);
platformId =
  inject(PLATFORM_ID);
  private route =
    inject(ActivatedRoute);
  private router = inject(Router);
  private productService =
    inject(ProductService);
product =
  signal<Product | null>(null);
 showSuccessMessage = false;
  reviewName = '';

reviewComment = '';

reviewRating = 5;
  quantity = 1;

  selectedSize = 'M';

  selectedColor = '#000000';

  sizes = ['S', 'M', 'L', 'XL'];

  colors = [
    '#000000',
    '#7c3aed',
    '#ec4899',
    '#2563eb'
  ];
  toastService: any;
  
 

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
  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.getProduct(id);

  }

  getProduct(id: number): void {

    this.productService
      .getProductById(id)
      .subscribe({

        next: (response) => {

          this.product.set(response) ;

        }

      });

  }
addToCart(): void {

  const currentProduct = this.product();

  if (!currentProduct) return;

  this.cartService.addToCart(currentProduct);

  this.showSuccessMessage = true;

  setTimeout(() => {

    this.showSuccessMessage = false;

  }, 3000);

}
  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {

    if (this.quantity > 1) {
      this.quantity--;
    }

  }
  addReview(): void {

  if (!this.product()) {
    return;
  }

  const newReview = {

    id: Date.now(),

    username:
      this.reviewName,

    comment:
      this.reviewComment,

    rating:
      this.reviewRating

  };

  this.product.update(

    current => {

      if (!current) {
        return null;
      }

      return {

        ...current,

        reviews: [

          ...(current.reviews || []),

          newReview

        ]

      };

    }

  );

  this.reviewName = '';

  this.reviewComment = '';

  this.reviewRating = 5;

  this.toastService.show(
  this.translate.instant(
    'PRODUCT_DETAILS.REVIEW_ADDED'
  ),
  'success'
);



}}