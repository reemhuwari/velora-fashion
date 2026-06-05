import {
  Injectable,
  signal
} from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

import { User }
from '../models/user.model';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private router = inject(Router);
  currentUser =
    signal<User | null>(null);

  private api =
    'http://localhost:3000/users';

  constructor(
  private http: HttpClient
) {

  if (typeof window !== 'undefined') {

    const savedUser =
      localStorage.getItem('user');

    if (savedUser) {

      this.currentUser.set(
        JSON.parse(savedUser)
      );

    }

  }

}
  register(
    user: User
  ): Observable<User> {

    return this.http.post<User>(
      this.api,
      user
    );

  }

  login(
    email: string,
    password: string
  ): Observable<User[]> {

    return this.http.get<User[]>(

      `${this.api}?email=${email}&password=${password}`

    );

  }

  saveUser(
  user: User
): void {

  if (typeof window !== 'undefined') {

    localStorage.setItem(
      'token',
      'fake-jwt-token'
    );

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

  }

  this.currentUser.set(user);

}

  logout(): void {

  if (typeof window !== 'undefined') {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }

  this.currentUser.set(null);
   this.router.navigate(['/login']);

}

  isLoggedIn(): boolean {

  if (typeof window === 'undefined') {
    return false;
  }

  return !!localStorage.getItem(
    'token'
  );

}

}