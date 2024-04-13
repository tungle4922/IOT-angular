import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DataSensorService } from '../../core/apis/DataSensor.service';
import {
  IGetAllDataSensorReq,
  IGetAllDataSensorRes,
} from '../../core/models/DataSensor';

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
  public newestData!: IGetAllDataSensorRes;
  public dateArr: string[] = [];
  public tempArr: number[] = [];
  public humpArr: number[] = [];
  public lightArr: number[] = [];

  constructor(
    private dataSensorService: DataSensorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllDataSensor();
    this.createLineChart();
    setInterval(() => {
      this.getAllDataSensor();
    }, 3000);
  }

  getAllDataSensor() {
    const body: IGetAllDataSensorReq = {
      page: 1,
      pageSize: 99999,
    };
    this.dataSensorService.getAllDataSensor(body).subscribe((data) => {
      const reserveData: IGetAllDataSensorRes[] = data.data.reverse();
      this.newestData = reserveData[0];
      this.dateArr = [];
      this.tempArr = [];
      this.humpArr = [];
      this.lightArr = [];
      reserveData.forEach((item) => {
        this.dateArr.push(item.createdDate);
        this.tempArr.push(item.temperature);
        this.humpArr.push(item.humidity);
        this.lightArr.push(item.light);
      });
      this.chart.data.labels = this.dateArr;
      this.chart.data.datasets[0].data = this.tempArr;
      this.chart.data.datasets[1].data = this.humpArr;
      this.chart.data.datasets[2].data = this.lightArr;
      this.chart.update();
      this.cdr.detectChanges();
    });
  }

  createLineChart() {
    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.dateArr,
        datasets: [
          {
            label: 'Nhiệt độ (°C)',
            data: this.tempArr,
            fill: false,
          },
          {
            label: 'Độ ẩm (%)',
            data: this.humpArr,
            fill: false,
          },
          {
            label: 'Ánh sáng (lux)',
            data: this.lightArr,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    this.chart.update();
  }

  toggleFan() {
    this.isFanOn = !this.isFanOn;
  }

  toggleLight() {
    this.isLightOn = !this.isLightOn;
  }
}
