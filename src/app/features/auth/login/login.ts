import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import {
  FormsModule
} from '@angular/forms';
import {
  TranslateModule
} from '@ngx-translate/core';
import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
  TranslateModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  private toastService =
    inject(ToastService);
  email = '';

  password = '';

  errorMessage = '';

  login(): void {

    this.authService
      .login(
        this.email,
        this.password
      )
      .subscribe({

        next: (response) => {

          if (response.length > 0) {

            this.authService
              .saveUser(response[0]);

           this.router.navigate(['/cart']);

          }

          else {
this.toastService.show(
  'LOGIN_PAGE.INVALID_CREDENTIALS',
  'error'
);
          }

        }

      });

  }

}