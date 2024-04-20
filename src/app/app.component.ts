import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MqttService } from './core/apis/Mqtt.service';
import { ISubReq } from './core/models/Mqtt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
  _mqttService = inject(MqttService);

  ngOnInit() {
    this.subscribeTopic1();
    this.subscribeTopic2();
  }

  subscribeTopic1() {
    const body: ISubReq = {
      topic: 'device/control',
    };
    this._mqttService.subscribe(body).subscribe((data) => {});
  }

  subscribeTopic2() {
    const body: ISubReq = {
      topic: 'led/history',
    };
    this._mqttService.subscribe(body).subscribe((data) => {});
  }
}
