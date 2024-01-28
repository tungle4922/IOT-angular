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
    ],
  },
];
