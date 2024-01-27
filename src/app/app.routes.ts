import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '', loadChildren: () => import('./layouts/main/main.routes').then(m => m.MAIN_ROUTES) }
];
