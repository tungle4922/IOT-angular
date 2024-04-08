import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-action-history',
  standalone: true,
  imports: [CommonModule, RouterModule, NzPaginationModule],
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
}
