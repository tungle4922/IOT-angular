import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SortTableComponent } from '../../shared/components/sort-table/sort-table.component';
import { IColumnSort } from '../../core/models/SortTable';
import { DataSensorService } from '../../core/apis/DataSensor.service';
import { IGetAllDataSensorReq, IGetAllDataSensorRes } from '../../core/models/DataSensor';

@Component({
  selector: 'app-data-sensor',
  standalone: true,
  imports: [CommonModule, RouterModule, NzPaginationModule, SortTableComponent],
  templateUrl: './data-sensor.component.html',
  styleUrls: ['./data-sensor.component.scss'],
})
export class DataSensorComponent {
  listOfColumn: IColumnSort[] = [
    {
      title: 'Id',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.id - b.id,
      priority: false,
    },
    {
      title: 'Nhiệt độ',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.temperature - b.temperature,
      priority: false,
    },
    {
      title: 'Độ ẩm',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.humidity - b.humidity,
      priority: false,
    },
    {
      title: 'Ánh sáng',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.light - b.light,
      priority: false,
    },
    {
      title: 'Ngày tạo',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.createdDate.localeCompare(b.createdDate),
      priority: false,
    },
    {
      title: 'Ngày cập nhật',
      compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
        a.lastModifiedDate.localeCompare(b.lastModifiedDate),
      priority: false,
    },
  ];

  public data: IGetAllDataSensorRes[] = [];
  public isLoaded: boolean = true;
  public totalCount!: number;

  constructor(
    private dataSensorService: DataSensorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllDataSensor();
  }

  getAllDataSensor() {
    this.isLoaded = false;
    const body: IGetAllDataSensorReq = {
      page: 1,
      pageSize: 10,
    };
    this.dataSensorService.getAllDataSensor(body).subscribe((data) => {
      this.data = data.data;
      this.totalCount = data.totalCount;
      this.isLoaded = true;
      this.cdr.detectChanges();
    });
  }
}
