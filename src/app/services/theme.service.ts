import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode =
    signal(false);

  constructor() {

    if (typeof window !== 'undefined') {

      const savedTheme =
        localStorage.getItem('theme');

      if (savedTheme === 'dark') {

        this.enableDarkMode();

      }

    }

  }

  toggleTheme(): void {

    this.darkMode()
      ? this.enableLightMode()
      : this.enableDarkMode();

  }

  enableDarkMode(): void {

    document.body.classList.add(
      'dark-theme'
    );

    localStorage.setItem(
      'theme',
      'dark'
    );

    this.darkMode.set(true);

  }

  enableLightMode(): void {

    document.body.classList.remove(
      'dark-theme'
    );

    localStorage.setItem(
      'theme',
      'light'
    );

    this.darkMode.set(false);

  }

}