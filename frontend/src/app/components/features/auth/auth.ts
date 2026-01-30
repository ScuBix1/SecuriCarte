import { CommonModule } from '@angular/common';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthUiService } from './auth-loading';
import { Login } from './login/login';
import { Register } from './register/register';

@Component({
  selector: 'app-auth',
  imports: [Login, Register, CommonModule, MatProgressSpinnerModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  showLogin = signal(true);
  isLoading: WritableSignal<boolean>;

  constructor(authUi: AuthUiService) {
    this.isLoading = authUi.isLoading;
    effect(() => {
      if (this.isLoading()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  toggleView() {
    this.showLogin.update((view) => !view);
  }
}
