import { CommonModule, DatePipe } from '@angular/common';
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
import { MqttService } from '../../core/apis/Mqtt.service';
import { IPubReq } from '../../core/models/Mqtt';
import { NotiService } from '../../services/noti.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NgChartsModule,
    NzButtonModule,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public svgIcon: string =
    'https://demo.bootstrapdash.com/purple-admin-free/assets/images/dashboard/circle.svg';
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
    private cdr: ChangeDetectorRef,
    private mqttService: MqttService,
    private notiService: NotiService,
    private dateService: DateService
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
      this.newestData = data.data[0];
      this.dateArr = [];
      this.tempArr = [];
      this.humpArr = [];
      this.lightArr = [];
      data.data?.slice(0, 20).forEach((item: IGetAllDataSensorRes) => {
        this.dateArr.push(this.dateService.formatDate(item.createdDate));
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
    let body: IPubReq = {
      topic: 'led/control',
      message: '',
    };
    if (this.isLightOn === false) {
      body.message = 'onBoth';
    } else {
      body.message = 'offBoth';
    }
    this.mqttService.publish(body).subscribe(
      (data) => {
        this.notiService.success();
      },
      (err) => {
        this.notiService.error();
      }
    );
    this.isLightOn = !this.isLightOn;
  }
}
