import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { SalesChart }
from '../../components/sales-chart/sales-chart';

@Component({
  selector: 'app-dashboard-home',

  standalone: true,

  imports: [
    CommonModule,
    SalesChart
  ],

  templateUrl:
    './dashboard-home.html',

  styleUrl:
    './dashboard-home.scss'
})
export class DashboardHome {}