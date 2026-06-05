import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule, isPlatformBrowser }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { Product }
from '../../../models/product.model';

import { ProductService }
from '../../../services/product.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  PLATFORM_ID
} from '@angular/core';

@Component({
  selector: 'app-products-admin',

  standalone: true,

 imports: [
  CommonModule,
  FormsModule,
  TranslateModule
],

  templateUrl:
    './products-admin.html',

  styleUrl:
    './products-admin.scss'
})
export class ProductsAdmin
implements OnInit {

  private productService =
    inject(ProductService);
translate = inject(TranslateService);
  platformId = inject(PLATFORM_ID);

  products =
    signal<Product[]>([]);

  title = '';

  price = 0;

  image = '';

  category = '';

  rating = 4.5;

  description = '';
constructor() {

    this.translate.setDefaultLang('en');

    if (isPlatformBrowser(this.platformId)) {

      const lang = localStorage.getItem('lang');
      
      this.translate.use(lang ?? 'en');
      
    }
  }
  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response) => {

          this.products.set(
            response
          );

        }

      });

  }

  addProduct(): void {

    const newProduct: Product = {

      id: Date.now(),

      titleKey: this.title,

      price: this.price,

      image: this.image,

      categoryKey: this.category,

      rating: this.rating,

      description:
        this.description

    };

    this.products.update(

      products => [

        newProduct,

        ...products

      ]

    );

    this.resetForm();

  }

  deleteProduct(
    id: number
  ): void {

    this.products.update(

      products =>

        products.filter(

          product =>
            product.id !== id

        )

    );

  }

  resetForm(): void {

    this.title = '';

    this.price = 0;

    this.image = '';

    this.category = '';

    this.rating = 4.5;

    this.description = '';

  }

}