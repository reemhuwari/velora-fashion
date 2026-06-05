import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { CartService }from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService} from '../../../services/wishlist.service';
import {ThemeService} from '../../../services/theme.service';
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
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterLink,
    CommonModule,
     TranslateModule  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  cartService = inject(CartService);
  authService =inject(AuthService);
  wishlistService = inject(WishlistService);
  themeService =inject(ThemeService);
  translate =inject(TranslateService);
  platformId =
  inject(PLATFORM_ID);
 constructor() {

  this.translate.setDefaultLang('en');

  if (isPlatformBrowser(this.platformId)) {

    const lang =
      localStorage.getItem('lang') ?? 'en';

    this.changeLanguage(lang);

  }

}
changeLanguage(
  lang: string
): void {

  this.translate.use(lang);

  if (
    isPlatformBrowser(
      this.platformId
    )
  ) {

    localStorage.setItem(
      'lang',
      lang
    );

    document.documentElement.lang =
      lang;

    document.documentElement.dir =

      lang === 'ar'
        ? 'rtl'
        : 'ltr';

  }

}
logout(): void {this.authService.logout();}

}