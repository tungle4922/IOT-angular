import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class NotiService {
  constructor(private message: NzMessageService) {}
  success(message?: string) {
    this.message.create('success', message || 'Thao tác thành công');
  }
  error(message?: string) {
    this.message.create('error', message || 'Có lỗi xảy ra');
  }
  warning(message?: string) {
    this.message.create('warning', message || 'Có lỗi xảy ra');
  }
}
