import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data-sensor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './data-sensor.component.html',
  styleUrls: ['./data-sensor.component.scss'],
})
export class DataSensorComponent {
  public listData = [
    {
      id: 1,
      temp: 20,
      humidity: 50,
      light: 100,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
    {
      id: 2,
      temp: 24,
      humidity: 54,
      light: 110,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
    {
      id: 3,
      temp: 25,
      humidity: 51,
      light: 101,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
    {
      id: 4,
      temp: 20,
      humidity: 50,
      light: 100,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
    {
      id: 4,
      temp: 24,
      humidity: 50,
      light: 100,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
    {
      id: 5,
      temp: 20,
      humidity: 51,
      light: 100,
      fanStatus: 'On',
      lightStatus: 'Off',
      createdDate: '16/09/2024'
    },
  ];
}
