import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { ProductCard } from '../../shared/components/product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import {
  PLATFORM_ID
} from '@angular/core';

import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    TranslateModule,
  RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private productService = inject(ProductService);

  translate = inject(TranslateService);
  platformId = inject(PLATFORM_ID);

  products: Product[] = [];
  isLoading = true;

  constructor() {

    this.translate.setDefaultLang('en');

    if (isPlatformBrowser(this.platformId)) {

      const lang = localStorage.getItem('lang');
      
      this.translate.use(lang ?? 'en');
      
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {

    this.productService.getProducts().subscribe({

      next: (response) => {
        this.products = response;
        this.isLoading = false;
      },

      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }

    });

  }
}