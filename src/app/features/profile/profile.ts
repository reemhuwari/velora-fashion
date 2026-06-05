import {
  Component,
  inject
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AuthService
} from '../../services/auth.service';
import {RouterLink} from '@angular/router';
import { ToastService } from '../../services/toast.service';
import {
  PLATFORM_ID,
  
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  TranslateService,
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
      RouterLink,
  TranslateModule
  ],

  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  authService =
    inject(AuthService);
toastService =
    inject(ToastService);
translate =
  inject(TranslateService);

platformId =
  inject(PLATFORM_ID);
  user =
    this.authService.currentUser();

  name =
    this.user?.name || '';

  email =
    this.user?.email || '';

  phone = '';

  city = '';
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
  saveProfile(): void {

    const updatedUser = {

  ...this.user,

  name: this.name,

  email: this.email,

  password:
    this.user?.password || ''

};

    localStorage.setItem(
      'user',
      JSON.stringify(updatedUser)
    );

    this.authService
      .currentUser
      .set(updatedUser);
this.toastService.show(
  'PROFILE.SUCCESS_UPDATE',
  'success'
);

  }

}