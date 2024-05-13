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
    {
      title: 'Tên thiết bị',
      compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
        a.device.localeCompare(b.device),
      priority: false,
    },
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
  public data: IGetAllHistoryRes[] = [];
  public isLoaded: boolean = true;
  public totalCount!: number;
  public form = new FormGroup({
    page: new FormControl(1),
    pageSize: new FormControl(10),
    device: new FormControl(),
    action: new FormControl(),
    createdDate: new FormControl(),
  });

  constructor(
    private actionHistoryService: ActionHistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllHistory();
    setInterval(() => {
      this.getAllHistory();
    }, 1000);
  }

  getAllHistory() {
    this.isLoaded = false;
    this.actionHistoryService.getAllHistory(this.form.getRawValue()).subscribe(
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
    this.form.patchValue({ page: 1, pageSize: 10 });
    this.searh();
  }
}
