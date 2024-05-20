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
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    NzSelectModule,
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
    // {
    //   title: 'Ngày cập nhật',
    //   compare: (a: IGetAllDataSensorRes, b: IGetAllDataSensorRes) =>
    //     a.lastModifiedDate.localeCompare(b.lastModifiedDate),
    //   priority: false,
    // },
  ];

  listType = [
    { label: 'Tất cả', value: 'search' },
    { label: 'Id', value: 'id' },
    { label: 'Nhiệt độ', value: 'temperature' },
    { label: 'Độ ẩm', value: 'humidity' },
    { label: 'Ánh sáng', value: 'light' },
    { label: 'Ngày tạo', value: 'createdDate' },
  ];

  listFields = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Id: A -> Z', value: 'id-lth' },
    { label: 'Id: Z -> A', value: 'id-htl' },
    { label: 'Nhiệt độ: Thấp -> Cao', value: 'temperature-lth' },
    { label: 'Nhiệt độ: Cao -> Thấp', value: 'temperature-htl' },
    { label: 'Độ ẩm: Thấp -> Cao', value: 'humidity-lth-htl' },
    { label: 'Độ ẩm: Cao -> Thấp', value: 'humidity-htl' },
    { label: 'Ánh sáng: Thấp -> Cao', value: 'light-lth' },
    { label: 'Ánh sáng: Cao -> Thấp', value: 'light-htl' },
    { label: 'Ngày tạo: Thấp -> Cao', value: 'createdDate-lth' },
    { label: 'Ngày tạo: Cao -> Thấp', value: 'createdDate-htl' },
  ];

  public data: IGetAllDataSensorRes[] = [];
  public isLoaded: boolean = true;
  public totalCount!: number;
  public form = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(10),
    type: new FormControl('search'),
    search: new FormControl(undefined),
    temperature: new FormControl(undefined),
    humidity: new FormControl(undefined),
    light: new FormControl(undefined),
    createdDate: new FormControl(undefined),
    lastModifiedDate: new FormControl(undefined),
    id: new FormControl(undefined),
  });
  public isShow: boolean = false;
  public fieldName: string | null = 'default';

  constructor(
    private dataSensorService: DataSensorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllDataSensor();
    // setInterval(() => {
    //   this.getAllDataSensor();
    // }, 1000);
  }

  getAllDataSensor() {
    this.isLoaded = false;
    const type = this.form.get('type')?.value;
    const body = {
      page: this.form.get('page')?.value,
      pageSize: this.form.get('pageSize')?.value,
      [type!]: this.form.get(type!)?.value,
    };
    this.dataSensorService.getAllDataSensor(body).subscribe((data) => {
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
    this.form.patchValue({ page: 1, pageSize: 10, type: 'search' });
    this.searh();
  }

  sort() {
    setTimeout(() => {
      if (this.fieldName) {
        if (this.fieldName === 'default') {
          this.getAllDataSensor();
          return;
        }
        const arr = this.fieldName.split('-');
        const name = arr[0];
        const type = arr[1];
        console.log(arr);
        const body = {
          page: this.form.get('page')?.value,
          pageSize: this.form.get('pageSize')?.value,
          fieldName: name,
        };

        if (type === 'lth') {
          this.dataSensorService.sortLowToHigh(body).subscribe((data) => {
            this.data = data.data;
            this.totalCount = data.totalCount;
            this.isLoaded = true;
            this.cdr.detectChanges();
          });
        } else {
          this.dataSensorService.sortHighToLow(body).subscribe((data) => {
            this.data = data.data;
            this.totalCount = data.totalCount;
            this.isLoaded = true;
            this.cdr.detectChanges();
          });
        }
      }
    }, 700);
  }
}
