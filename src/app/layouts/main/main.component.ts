import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NzDropDownModule, RouterOutlet, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {}
