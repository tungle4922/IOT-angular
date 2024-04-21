import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IColumnSort } from '../../../core/models/SortTable';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-sort-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzSpinModule, NzPaginationModule],
  templateUrl: './sort-table.component.html',
  styleUrls: ['./sort-table.component.scss'],
})
export class SortTableComponent {
  @Input() colTitle!: IColumnSort[];
  @Input() data!: any;
  @Input() loaded!: boolean | null;
  @Input() total!: number;
  @Input() pageIndex!: number;
  @Input() pageSize!: number;
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @ContentChild('rows') rows!: TemplateRef<any>;

  onPageSizeChange($event: number) {
    this.pageSizeChange.emit($event);
  }
}
