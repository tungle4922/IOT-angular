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
        labels: [10, 20, 30, 40, 50, 60],
        datasets: [
          {
            label: 'Nhiệt độ',
            data: [40, 35, 38, 32, 35, 40],
            fill: false,
          },
          {
            label: 'Độ ẩm',
            data: [40, 42, 45, 46, 51, 53],
            fill: false,
          },
          {
            label: 'Ánh sáng',
            data: [69, 50, 60, 40, 50, 70],
            fill: false,
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
