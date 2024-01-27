import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NzDropDownModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public chart: any;

  ngOnInit() {
    this.createLineChart(['1000', '2000', '3000'], [400, 500, 600]);
  }

  createLineChart(labelArray: any, quantityArray: any) {
    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labelArray,
        datasets: [
          {
            label: 'Thông số',
            data: quantityArray,
            borderColor: '#0EAF8F',
            fill: false,
            pointBackgroundColor: '#0EAF8F',
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
