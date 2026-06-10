import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { AuthService }
from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import {
  TranslateModule
} from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
  TranslateModule,
  RouterModule
  ],

  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private authService =
    inject(AuthService);
private toastService =
    inject(ToastService);

  private router =
    inject(Router);

  name = '';

  email = '';

  password = '';

  errorMessage = '';

  register(): void {

    if (
      !this.name ||
      !this.email ||
      !this.password
    ) {

   this.toastService.show(
  'REGISTER_PAGE.FILL_ALL_FIELDS',
  'error'
); return;
}

    

    const user = {

      name: this.name,

      email: this.email,

      password: this.password

    };

    this.authService
      .register(user)
      .subscribe({

        next: (response) => {

          this.authService
            .saveUser(response);

          this.router.navigate(['/']);

        }

      });

  }

}