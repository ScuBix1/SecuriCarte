import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { ResetPassword } from './features/auth/reset-password/reset-password';

export const routes: Routes = [
  {
    path: 'auth',
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
];
