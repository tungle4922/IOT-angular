import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SortTableComponent } from '../../shared/components/sort-table/sort-table.component';
import { IColumnSort } from '../../core/models/SortTable';
import {
  IGetAllHistoryReq,
  IGetAllHistoryRes,
} from '../../core/models/ActionHistory';
import { ActionHistoryService } from '../../core/apis/ActionHistory.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-action-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzPaginationModule,
    SortTableComponent,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule,
  ],
  templateUrl: './action-history.component.html',
  styleUrls: ['./action-history.component.scss'],
})
export class ActionHistoryComponent {
  public listOfColumn: IColumnSort[] = [
    {
      title: 'id',
      compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) => a.id - b.id,
      priority: false,
    },
    // {
    //   title: 'Tên thiết bị',
    //   compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
    //     a.device.localeCompare(b.device),
    //   priority: false,
    // },
    {
      title: 'Hành động',
      compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
        a.action.localeCompare(b.action),
      priority: false,
    },
    {
      title: 'Ngày tạo',
      compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
        a.createdDate.localeCompare(b.createdDate),
      priority: false,
    },
    // {
    //   title: 'Ngày cập nhật',
    //   compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
    //     a.lastModifiedDate.localeCompare(b.lastModifiedDate),
    //   priority: false,
    // },
  ];
  public listType = [
    { label: 'Tất cả', value: 'search' },
    { label: 'Id', value: 'id' },
    { label: 'Hành động', value: 'action' },
    { label: 'Ngày tạo', value: 'createdDate' },
  ];
  listFields = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Id: A -> Z', value: 'id-lth' },
    { label: 'Id: Z -> A', value: 'id-htl' },
    { label: 'Hành động: A -> Z', value: 'action-lth' },
    { label: 'Hành động: Z -> A', value: 'action-htl' },
    { label: 'Ngày tạo: Thấp -> Cao', value: 'createdDate-lth' },
    { label: 'Ngày tạo: Cao -> Thấp', value: 'createdDate-htl' },
  ];
  public data: IGetAllHistoryRes[] = [];
  public isLoaded: boolean = true;
  public totalCount!: number;
  public form = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(10),
    type: new FormControl('search'),
    // device: new FormControl(),
    action: new FormControl(),
    createdDate: new FormControl(),
    search: new FormControl(),
    id: new FormControl(),
  });
  public fieldName: string | null = 'default';

  constructor(
    private actionHistoryService: ActionHistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllHistory();
    // setInterval(() => {
    //   this.getAllHistory();
    // }, 1000);
  }

  getAllHistory() {
    this.isLoaded = false;
    const type = this.form.get('type')?.value;
    console.log(type);
    const body = {
      page: this.form.get('page')?.value,
      pageSize: this.form.get('pageSize')?.value,
      [type!]: this.form.get(type!)?.value,
    };
    this.actionHistoryService.getAllHistory(body).subscribe(
      (data) => {
        this.data = data.data;
        this.totalCount = data.totalCount;
        this.isLoaded = true;
        this.cdr.detectChanges();
      },
      (err) => {
        this.isLoaded = true;
      }
    );
  }

  changePage($event: any) {
    this.form.patchValue({ page: $event });
    this.getAllHistory();
  }

  changePageSize($event: any) {
    this.form.patchValue({ pageSize: $event });
    this.getAllHistory();
  }

  searh() {
    this.getAllHistory();
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
          this.getAllHistory();
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
          this.actionHistoryService.sortLowToHigh(body).subscribe((data) => {
            this.data = data.data;
            this.totalCount = data.totalCount;
            this.isLoaded = true;
            this.cdr.detectChanges();
          });
        } else {
          this.actionHistoryService.sortHighToLow(body).subscribe((data) => {
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
