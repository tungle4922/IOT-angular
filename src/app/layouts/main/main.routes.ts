import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../features/profile/profile.routes').then(
            (m) => m.PROFILE_ROUTES
          ),
      },
      {
        path: 'action-history',
        loadChildren: () =>
          import('../../features/action-history/action-history.routes').then(
            (m) => m.ACTION_HISTORY_ROUTES
          ),
      },
      {
        path: 'data-sensor',
        loadChildren: () =>
          import('../../features/data-sensor/data-sensor.routes').then(
            (m) => m.DATA_SENSOR_ROUTES
          ),
      },
    ],
  },
];
