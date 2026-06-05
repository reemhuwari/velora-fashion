
import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { ProductCard }
from '../../shared/components/product-card/product-card';

import { SkeletonCard } from '../../shared/components/skeleton-card/skeleton-card';

import { Product }
from '../../models/product.model';

import { ProductService }
from '../../services/product.service';
import {
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-shop',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
   ProductCard,
  SkeletonCard,
  TranslateModule
  ],

  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop implements OnInit {

  private productService =
    inject(ProductService);
translate =
  inject(TranslateService);

platformId =
  inject(PLATFORM_ID);
  products = signal<Product[]>([]);

  filteredProducts = signal<Product[]>([]);
  searchSuggestions = signal<Product[]>([]);
  searchTerm = '';

  selectedCategory = 'ALL';

  sortOption = '';

  isLoading = true;

 categories = [
  'ALL',
  'STREETWEAR',
  'WINTER',
  'SHOES',
  'LUXURY'
];
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

    this.getProducts();

  }

  getProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response) => {

          setTimeout(() => {

            this.products.set(response);

            this.filteredProducts.set(
              response
            );

            this.isLoading = false;

          }, 1500);

        }

      });

  }

  filterProducts(): void {

    let filtered = [
      ...this.products()
    ];

   if (
  this.selectedCategory !== 'ALL'
) {
  filtered = filtered.filter(
    product =>
      product.categoryKey ===
      `CATEGORIES.${this.selectedCategory}`
  );
    }

  if (this.searchTerm) {

  filtered = filtered.filter(
    product =>
      this.translate
        .instant(product.titleKey)
        .toLowerCase()
        .includes(
          this.searchTerm.toLowerCase()
        )
  );

}

    this.filteredProducts.set(
      filtered
    );

    this.sortProducts();

  }
  onSearch(): void {

  this.filterProducts();

  if (!this.searchTerm.trim()) {

    this.searchSuggestions.set([]);

    return;

  }

  const suggestions = this.products()
  .filter(product =>
    this.translate
      .instant(product.titleKey)
      .toLowerCase()
      .includes(
        this.searchTerm.toLowerCase()
      )
  )
  .slice(0, 5);

     

  this.searchSuggestions.set(
    suggestions
  );

}
selectSuggestion(
  product: Product
): void {

  this.searchTerm =
    this.translate.instant(
      product.titleKey
    );

  this.searchSuggestions.set([]);

  this.filterProducts();

}
hideSuggestions(): void {

  setTimeout(() => {

    this.searchSuggestions.set([]);

  }, 200);

}
  selectCategory(
    category: string
  ): void {

    this.selectedCategory =
      category;

    this.filterProducts();

  }

  sortProducts(): void {

    const sorted = [
      ...this.filteredProducts()
    ];

    if (
      this.sortOption === 'low'
    ) {

      sorted.sort(

        (a, b) =>
          a.price - b.price

      );

    }

    else if (
      this.sortOption === 'high'
    ) {

      sorted.sort(

        (a, b) =>
          b.price - a.price

      );

    }

    else if (
      this.sortOption === 'rating'
    ) {

      sorted.sort(

        (a, b) =>
          b.rating - a.rating

      );

    }

    this.filteredProducts.set(
      sorted
    );

  }

}

