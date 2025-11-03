import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Auth,
  },
];
