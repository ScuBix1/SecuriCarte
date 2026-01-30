import { Routes } from '@angular/router';
import { Auth } from './components/features/auth/auth';
import { ForgotPassword } from './components/features/auth/forgot-password/forgot-password';
import { ResetPassword } from './components/features/auth/reset-password/reset-password';
import { Maps } from './components/features/maps/maps';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
  },
  {
    path: 'auth/reset-password',
    component: ResetPassword,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'maps',
    component: Maps,
    canActivate: [authGuard],
  },
];
