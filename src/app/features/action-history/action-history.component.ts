import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SortTableComponent } from '../../shared/components/sort-table/sort-table.component';
import { IColumnSort } from '../../core/models/SortTable';
import { IGetAllHistoryRes } from '../../core/models/ActionHistory';
@Component({
  selector: 'app-action-history',
  standalone: true,
  imports: [CommonModule, RouterModule, NzPaginationModule, SortTableComponent],
  templateUrl: './action-history.component.html',
  styleUrls: ['./action-history.component.scss'],
})
export class ActionHistoryComponent {
  public listAction = [
    {
      id: 1,
      action: 'Thao tác bật quạt',
      createdDate: '16/09/2024',
    },
    {
      id: 2,
      action: 'Thao tác bật quạt',
      createdDate: '16/09/2024',
    },
    {
      id: 3,
      action: 'Thao tác bật đèn',
      createdDate: '16/09/2024',
    },
    {
      id: 4,
      action: 'Thao tác bật quạt',
      createdDate: '16/09/2024',
    },
    {
      id: 5,
      action: 'Thao tác bật đèn',
      createdDate: '16/09/2024',
    },
  ];
  listOfColumn: IColumnSort[] = [
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
    {
      title: 'Ngày cập nhật',
      compare: (a: IGetAllHistoryRes, b: IGetAllHistoryRes) =>
        a.lastModifiedDate.localeCompare(b.lastModifiedDate),
      priority: false,
    },
  ];

  listOfData: IGetAllHistoryRes[] = [
    {
      device: 'esp1',
      action: 'on',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
    {
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },{
      device: 'isp1',
      action: 'tat',
      createdDate: '',
      lastModifiedDate: '',
    },
  ];
}
