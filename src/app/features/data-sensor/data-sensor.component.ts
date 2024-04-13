import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SortTableComponent } from '../../shared/components/sort-table/sort-table.component';
import { IColumnSort } from '../../core/models/SortTable';
import { DataSensorService } from '../../core/apis/DataSensor.service';
import {
  IGetAllDataSensorReq,
  IGetAllDataSensorRes,
} from '../../core/models/DataSensor';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-data-sensor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzPaginationModule,
    SortTableComponent,
    NzInputModule,
    NzDatePickerModule,
    FormsModule,
    NzButtonModule,
    ReactiveFormsModule,
  ],
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
  public form = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(10),
    type: new FormControl(undefined),
    search: new FormControl(undefined),
    temperature: new FormControl(undefined),
    humidity: new FormControl(undefined),
    light: new FormControl(undefined),
    createdDate: new FormControl(undefined),
    lastModifiedDate: new FormControl(undefined),
  });
  test!: string;

  constructor(
    private dataSensorService: DataSensorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllDataSensor();
  }

  getAllDataSensor() {
    this.isLoaded = false;
    this.dataSensorService
      .getAllDataSensor(this.form.getRawValue())
      .subscribe((data) => {
        this.data = data.data;
        this.totalCount = data.totalCount;
        this.isLoaded = true;
        this.cdr.detectChanges();
      });
  }

  changePage($event: any) {
    this.form.patchValue({ page: $event });
    this.getAllDataSensor();
  }

  changePageSize($event: any) {
    this.form.patchValue({ pageSize: $event });
    this.getAllDataSensor();
  }

  searh() {
    this.getAllDataSensor();
  }

  cancel() {
    this.form.reset();
    this.form.patchValue({ page: 1, pageSize: 10 });
    this.searh();
  }
}
