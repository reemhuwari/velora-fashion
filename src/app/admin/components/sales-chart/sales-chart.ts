import {
  Component,
  AfterViewInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sales-chart',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './sales-chart.html',

  styleUrl:
    './sales-chart.scss'
})
export class SalesChart
implements AfterViewInit {

  ngAfterViewInit(): void {

    new Chart(

      'salesChart',

      {

        type: 'line',

        data: {

          labels: [

            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun'

          ],

          datasets: [

            {

              label:
                'Revenue',

              data: [

                1200,
                1900,
                3000,
                2500,
                4200,
                5200

              ],

              borderColor:
                '#7c3aed',

              backgroundColor:
                'rgba(124,58,237,0.2)',

              tension: 0.4,

              fill: true

            }

          ]

        },

        options: {

          responsive: true,

          plugins: {

            legend: {

              display: true

            }

          }

        }

      }

    );

  }

}