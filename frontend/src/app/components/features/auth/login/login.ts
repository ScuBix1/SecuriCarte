import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Actions } from '../actions/actions';
import { AuthUiService } from '../auth-loading';

export interface LoginFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    Actions,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Output() switchToRegister = new EventEmitter<void>();
  hide: boolean = true;
  loginModel = signal<{ email: string; password: string }>({ email: '', password: '' });
  errorMessage = signal<string | null>(null);

  isFormValid = computed(() => {
    const model = this.loginModel();
    return model.email.length > 0 && model.password.length > 0;
  });

  constructor(private authService: AuthService, private authUi: AuthUiService) {}

  submit() {
    if (!this.isFormValid()) return;

    this.authUi.isLoading.set(true);

    this.authService
      .login(this.loginModel().email, this.loginModel().password)
      .pipe(finalize(() => this.authUi.isLoading.set(false)))
      .subscribe({
        next: () => {
          window.location.href = '/maps';
        },
        error: (err: unknown) => {
          this.errorMessage.set('Erreur de connexion. Vérifiez vos identifiants.');
          console.error(err);
        },
      });
  }
}
