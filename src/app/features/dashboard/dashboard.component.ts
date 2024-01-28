import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NzDropDownModule, NgChartsModule, NzButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public chart: any;
  public isFanOn: boolean = false;
  public isLightOn: boolean = false;
  public temperature: number = 20;

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

  toggleFan() {
    this.isFanOn = !this.isFanOn;
  }

  toggleLight() {
    this.isLightOn = !this.isLightOn;
  }
}
