import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate} from'@angular/animations';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,

  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    CommonModule
  ],
  animations: [

  trigger(

    'routeAnimation',

    [

      transition(

        '* <=> *',

        [

          style({

            opacity: 0,

            transform:
              'translateY(20px)'
          }),

          animate(

            '400ms ease',

            style({

              opacity: 1,

              transform:
                'translateY(0)'
            })

          )

        ]

      )

    ]

  )

],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const hiddenRoutes = [
          '/login',
          '/register'
        ];

        this.showNavbar =
          !hiddenRoutes.includes(this.router.url);
      });
  }
}