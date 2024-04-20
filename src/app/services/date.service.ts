import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  _datePipe = inject(DatePipe);

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this._datePipe.transform(date, 'dd/MM/yy HH:mm:ss')!;
  }
}
